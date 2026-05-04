import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), "src"))
from pdf_loader import extract_text_from_pdf
from chunker import split_into_chunks
from retriever import retrieve_relevant_chunks
from qa_engine import answer_question

print("Loading PDF...")
pdf_path = os.path.join("data", "pm_kisan.pdf")
text = extract_text_from_pdf(pdf_path)
print(f"Text length: {len(text)}")
chunks = split_into_chunks(text, chunk_size=100, overlap=20)
print(f"Chunks: {len(chunks)}")

question = "Who are eligible"
relevant_chunks = retrieve_relevant_chunks(question, chunks, top_k=3)
print("Top 3 retrieved chunks:")
for i, c in enumerate(relevant_chunks):
    print(f"\n--- Chunk {i+1} ---")
    print(c)

print("\n--- Answer ---")
answer = answer_question(question, relevant_chunks)
print(answer)
