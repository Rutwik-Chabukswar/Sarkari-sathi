import os
import sys
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

sys.path.append(os.path.dirname(__file__))
from pdf_loader import extract_text_from_pdf
from chunker import split_into_chunks
from retriever import retrieve_relevant_chunks

# Give our API key to the Google library
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def answer_question(question, context_chunks):
    """
    Takes the retrieved chunks and the user's question, builds a strict prompt,
    and asks Google Gemini for the answer.
    """
    # 1. Combine our 3 chunks into one block of text
    context_text = "\n\n".join(context_chunks)
    
    # 2. Build the System Prompt (The strict rules)
    system_instruction = (
        "You are a helpful assistant for Indian citizens. "
        "Your job is to answer questions based ONLY on the provided context document. "
        "If the answer is not in the context, you MUST say 'I don't know based on the document.' "
        "Do not use outside knowledge. Be clear and concise."
    )
    
    # 3. Build the final prompt we send to the AI
    user_prompt = f"Context:\n{context_text}\n\nQuestion:\n{question}"
    
    # 4. Set up the Gemini model
    # gemini-2.5-flash is Google's latest fast, low-cost model
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=system_instruction,
        # temperature=0.0 makes the AI strict and factual
        generation_config={"temperature": 0.0} 
    )
    
    # 5. Call the API to get the answer
    response = model.generate_content(user_prompt)
    
    return response.text

# Test code
if __name__ == "__main__":
    # We run the whole pipeline from Step 2 to Step 4 first
    pdf_path = os.path.join("data", "pm_kisan.pdf")
    text = extract_text_from_pdf(pdf_path)
    chunks = split_into_chunks(text, chunk_size=100, overlap=20)
    
    question = "Can a government employee's family apply?"
    print(f"Question: '{question}'")
    print("Step 4: Retrieving context...")
    relevant_chunks = retrieve_relevant_chunks(question, chunks, top_k=3)
    
    print("Step 5: Asking Gemini...")
    answer = answer_question(question, relevant_chunks)
    print("\n---------------- ANSWER ----------------")
    print(answer)
    print("----------------------------------------\n")
