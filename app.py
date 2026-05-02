import streamlit as st
import os
import sys

# Tell Python to look inside the 'src' folder for our custom scripts
sys.path.append(os.path.join(os.path.dirname(__file__), "src"))

from pdf_loader import extract_text_from_pdf
from chunker import split_into_chunks
from retriever import retrieve_relevant_chunks
from qa_engine import answer_question

# 1. Set up the page UI
st.title("SarkariSaathi 🏛️")
st.subheader("AI-Powered Government Scheme Q&A")
st.write("Ask any question about PM Kisan and get an answer pulled directly from the official PDF!")

# 2. Load the document behind the scenes
# The @st.cache_data decorator tells Streamlit to remember the chunks
# so it doesn't have to re-read the PDF every time the user clicks a button!
@st.cache_data
def load_and_prepare_data():
    pdf_path = os.path.join("data", "pm_kisan.pdf")
    text = extract_text_from_pdf(pdf_path)
    chunks = split_into_chunks(text, chunk_size=100, overlap=20)
    return chunks

# Run the function to get our chunks
chunks = load_and_prepare_data()

# 3. Create a text box for the user
user_question = st.text_input("Type your question below (e.g., 'Who is eligible?'):")

# 4. If the user typed a question and hit Enter...
if user_question:
    # Show a spinning loading wheel while the AI thinks
    with st.spinner("Searching the document and thinking..."):
        
        # Step A: Find the best chunks
        relevant_chunks = retrieve_relevant_chunks(user_question, chunks, top_k=3)
        
        # Step B: Get the answer from Gemini
        answer = answer_question(user_question, relevant_chunks)
        
        # Step C: Show the answer in a green box
        st.success("Here is the answer:")
        st.write(answer)
        
        # Step D: Show the sources inside a dropdown menu (for transparency)
        with st.expander("Click here to see the exact document sources"):
            for i, chunk in enumerate(relevant_chunks, 1):
                st.markdown(f"**Source #{i}:**")
                st.write(chunk)
                st.divider() # Adds a clean grey line between sources
