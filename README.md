# SaaS Contracts Dashboard

A full-stack SaaS platform for managing contracts with AI-powered insights and natural language querying capabilities.

## Features

- **User Authentication**: Secure JWT-based authentication system
- **Document Management**: Upload, view, and manage contracts (PDF, TXT, DOCX)
- **AI-Powered Insights**: Extract clauses and identify risks using AI analysis
- **Natural Language Query**: Ask questions about your contracts in plain English
- **Vector Search**: Advanced search capabilities using pgvector
- **Multi-Tenant**: Complete user isolation and data security
- **Responsive UI**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication
- **Context API**: State management

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Python**: Programming language
- **SQLAlchemy**: SQL toolkit and ORM
- **PostgreSQL**: Relational database
- **pgvector**: Vector similarity search for PostgreSQL
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **python-dotenv**: Environment variables management

### Database
- **PostgreSQL**: Primary database
- **pgvector**: Vector extensions for similarity search
- **Schema**: Users, Documents, and Chunks tables with proper relationships

## Database Schema

![ER Diagram](database/er_diagram.png)

### Tables
- **Users**: Stores user account and authentication information
- **Documents**: Stores metadata about uploaded contracts
- **Chunks**: Stores processed document chunks with embeddings for vector search

### Relationships
- One User → Many Documents
- One Document → Many Chunks
- One User → Many Chunks

For detailed schema definition, see [schema.dbml](database/schema.dbml).

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- PostgreSQL
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amit1035/saas-contracts-dashboard.git
   cd saas-contracts-dashboard
