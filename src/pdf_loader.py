import PyPDF2
import os

def extract_text_from_pdf(file_path):
    """
    Reads a PDF file page by page and returns all the text as a single string.
    """
    text = ""
    
    # Open the file in 'rb' (read binary) mode, which is required for PDFs
    with open(file_path, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        
        # Loop through every page in the PDF
        for page in pdf_reader.pages:
            # Extract text from the current page and add it to our main text string
            # We add a newline ("\n") at the end of each page to keep things neat
            text += page.extract_text() + "\n"
            
    return text

# This block only runs if we execute this file directly (for testing)
if __name__ == "__main__":
    # Construct the path to our PDF file
    pdf_path = os.path.join("data", "pm_kisan.pdf")
    
    print("Extracting text from PDF...")
    extracted_text = extract_text_from_pdf(pdf_path)
    
    print(f"Total characters extracted: {len(extracted_text)}")
    print("-" * 50)
    print("First 500 characters:\n")
    print(extracted_text[:500])
    print("-" * 50)
