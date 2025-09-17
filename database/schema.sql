-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    hashed_password VARCHAR(200) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Create documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id),
    uploaded_on TIMESTAMP,
    expiry_date TIMESTAMP,
    status VARCHAR(20),
    risk_score VARCHAR(10)
);

-- Create chunks table
CREATE TABLE chunks (
    id SERIAL PRIMARY KEY,
    doc_id INTEGER REFERENCES documents(id),
    user_id INTEGER REFERENCES users(id),
    text_chunk TEXT,
    embedding TEXT,  -- We'll store as string and convert to vector when needed
    chunk_metadata JSONB  -- Renamed from metadata to chunk_metadata
);

-- Create pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;