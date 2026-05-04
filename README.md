# SarkariSaathi 🏛️

**SarkariSaathi** is an AI-powered smart assistant designed to help citizens understand Indian government welfare schemes. Using Retrieval-Augmented Generation (RAG), it allows users to ask questions in plain English and receive accurate answers pulled directly from official government PDF documents (like PM Kisan), eliminating the need to read through dense bureaucratic language.

## 🚀 What is this project about?

The core problem this project solves is the accessibility of government scheme details. Official details live inside dense PDF documents full of legal language, tables, and eligibility criteria. SarkariSaathi enables anyone to type a question and get an accurate answer directly from the official PDF — not from the internet or hallucinated by AI.

Instead of giving an LLM the whole book, SarkariSaathi uses **RAG** to find the right page first, then asks the AI to read just that page and answer the question.

## 🛠️ Tech Stack

We've selected a modern, efficient tech stack for this project:

### Frontend
- **Streamlit**: Turns Python scripts into web apps seamlessly. Perfect for building and prototyping AI tools quickly without writing HTML/CSS/JS.

### Backend & API
- **Python 3.11**: The core programming language.
- **FastAPI**: Builds web APIs that are fast, modern, and generate automatic documentation.
- **Uvicorn**: An ASGI web server implementation for Python to serve the FastAPI app.

### Document Processing & RAG
- **PyPDF2**: Reads PDF files and extracts text offline without external dependencies.
- **ChromaDB**: An AI-native open-source vector database used to store and query document chunks efficiently.
- **Python-dotenv**: Manages secrets from a `.env` file to keep API keys secure.

### AI & LLM
- **Google Generative AI (Gemini)**: Acts as the AI brain that generates the final answers accurately and efficiently based on the retrieved document chunks.

## 📁 Project Structure

```text
sarkari-saathi/
├── src/                      # Core backend logic modules
│   ├── pdf_loader.py         # Extracts text from PDFs
│   ├── chunker.py            # Splits text into manageable chunks
│   ├── retriever.py          # Finds relevant chunks for a given question
│   └── qa_engine.py          # Sends the context + question to the LLM (Gemini)
├── api.py                    # FastAPI application
├── app.py                    # Streamlit frontend UI
├── data/
│   └── pm_kisan.pdf          # Official government document used for reference
├── .env                      # Contains the Gemini API key (Not included in version control)
├── .gitignore                # Files Git should ignore
└── requirements.txt          # Python dependencies
```

## 💻 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Sarkari-Sathi
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. **Install the required dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up Environment Variables:**
   Create a `.env` file in the root directory of the project and add your Google Gemini API Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. **Start the Application:**
   Run the Streamlit Frontend:
   ```bash
   streamlit run app.py
   ```
   *Optional - Run the FastAPI backend server:*
   ```bash
   uvicorn api:app --reload
   ```
