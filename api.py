import os
import sys
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Add 'src' directory to the path so we can import your untouched backend files
sys.path.append(os.path.join(os.path.dirname(__file__), "src"))
from pdf_loader import extract_text_from_pdf
from chunker import split_into_chunks
from retriever import retrieve_relevant_chunks
from qa_engine import answer_question

# Initialize the FastAPI server
app = FastAPI(title="SarkariSaathi API")

# Load the PDF and chunks ONCE when the server starts (acts like our old cache)
print("Loading PDF and preparing chunks for the server...")
pdf_path = os.path.join("data", "pm_kisan.pdf")
text = extract_text_from_pdf(pdf_path)
global_chunks = split_into_chunks(text, chunk_size=100, overlap=20)
print("Server Backend is Ready!")

# Define the expected JSON format from the frontend
class QuestionRequest(BaseModel):
    question: str

# Create the POST endpoint that the frontend JavaScript will call
@app.post("/ask")
async def ask_question(req: QuestionRequest):
    # 1. Retrieve the relevant chunks using the user's question
    relevant_chunks = retrieve_relevant_chunks(req.question, global_chunks, top_k=3)
    
    # 2. Get the answer from the QA Engine (Gemini)
    answer = answer_question(req.question, relevant_chunks)
    
    # 3. Return the final answer as JSON
    return {"answer": answer}

# Mount the static folder at the root ('/') so it serves our HTML website
# Note: We must define the API endpoints BEFORE mounting the static files
app.mount("/", StaticFiles(directory="static", html=True), name="static")
