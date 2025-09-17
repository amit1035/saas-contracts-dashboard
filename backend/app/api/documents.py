
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.utils.mock_llamacloud import get_mock_chunks

router = APIRouter()

@router.get("/", response_model=List[schemas.Document])
def read_documents(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve documents.
    """
    if crud.user.is_superuser(current_user):
        documents = crud.document.get_multi(db, skip=skip, limit=limit)
    else:
        documents = crud.document.get_multi_by_owner(
            db=db, owner_id=current_user.id, skip=skip, limit=limit
        )
    return documents

@router.post("/upload", response_model=schemas.Document)
def create_document(
    *,
    db: Session = Depends(deps.get_db),
    file: UploadFile = File(...),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Upload new document.
    """
    # Create document record
    document_in = schemas.DocumentCreate(
        filename=file.filename,
        user_id=current_user.id,
    )
    document = crud.document.create_with_owner(db=db, obj_in=document_in, owner_id=current_user.id)
    
    # Mock the LlamaCloud processing to get chunks
    mock_chunks = get_mock_chunks(document.id, current_user.id)
    
    # Save chunks to database
    for chunk_data in mock_chunks:
        chunk_in = schemas.ChunkCreate(
            doc_id=document.id,
            user_id=current_user.id,
            text_chunk=chunk_data["text"],
            embedding=str(chunk_data["embedding"]),
            chunk_metadata=chunk_data["metadata"]
        )
        crud.chunk.create_chunk(db=db, obj_in=chunk_in)
    
    return document

@router.get("/{id}", response_model=schemas.Document)
def read_document(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get document by ID.
    """
    document = crud.document.get(db=db, id=id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    if not crud.user.is_superuser(current_user) and (document.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return document