
from typing import List, Dict, Any

def get_mock_chunks(document_id: int, user_id: int) -> List[Dict[str, Any]]:
    """
    Mock LlamaCloud response for document processing
    """
    return [
        {
            "chunk_id": f"c{document_id}_1",
            "text": "This is the first chunk of the document.",
            "embedding": [0.1, 0.2, 0.3, 0.4],
            "metadata": {"page": 1, "document_name": "document.pdf"}
        },
        {
            "chunk_id": f"c{document_id}_2",
            "text": "This is the second chunk of the document.",
            "embedding": [0.5, 0.6, 0.7, 0.8],
            "metadata": {"page": 2, "document_name": "document.pdf"}
        }
    ]