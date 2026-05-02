import os
import sys
import chromadb
from chromadb.utils import embedding_functions
from dotenv import load_dotenv

# Load the secret Google key from our .env file so ChromaDB can use it
load_dotenv()

sys.path.append(os.path.dirname(__file__))
from pdf_loader import extract_text_from_pdf
from chunker import split_into_chunks

def retrieve_relevant_chunks(question, chunks, top_k=3):
    """
    Uses ChromaDB and Google Gemini Embeddings to find the most relevant chunks 
    based on meaning, not just exact words.
    """
    # 1. Create a local, temporary Vector Database
    chroma_client = chromadb.Client()
    
    # 2. Tell the database to use Google Gemini for generating the number vectors (Embeddings)
    google_ef = embedding_functions.GoogleGenerativeAiEmbeddingFunction(
        api_key=os.getenv("GOOGLE_API_KEY")
    )
    
    # 3. Create a "collection" (a table) for our document
    try:
        chroma_client.delete_collection(name="sarkari_scheme")
    except:
        pass # Ignore if it doesn't exist yet
        
    collection = chroma_client.create_collection(
        name="sarkari_scheme", 
        embedding_function=google_ef
    )
    
    # 4. Prepare data for the database (ChromaDB needs a unique ID for every chunk)
    ids = [f"chunk_{i}" for i in range(len(chunks))]
    
    # 5. Add chunks to the database! 
    # (This automatically contacts Google to get the math vectors)
    collection.add(
        documents=chunks,
        ids=ids
    )
    
    # 6. Ask the database to find the closest matches based on meaning!
    results = collection.query(
        query_texts=[question],
        n_results=top_k
    )
    
    # Extract the actual text from the database results
    top_chunks = results["documents"][0]
    
    return top_chunks

# Test code
if __name__ == "__main__":
    pdf_path = os.path.join("data", "pm_kisan.pdf")
    text = extract_text_from_pdf(pdf_path)
    chunks = split_into_chunks(text, chunk_size=100, overlap=20)
    
    question = "Can a government employee's family apply?"
    print(f"User asked: '{question}'\n")
    print("Finding the top 3 chunks using Vector Embeddings (ChromaDB + Google Gemini)...\n")
    
    relevant_chunks = retrieve_relevant_chunks(question, chunks, top_k=3)
    
    for index, chunk in enumerate(relevant_chunks, start=1):
        print(f"--- MATCH #{index} ---")
        print(chunk)
        print()
