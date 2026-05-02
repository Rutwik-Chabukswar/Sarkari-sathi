import os
from pdf_loader import extract_text_from_pdf

def split_into_chunks(text, chunk_size=100, overlap=20):
    """
    Splits a large string of text into smaller chunks of a specified word count,
    with an overlap of words between consecutive chunks.
    """
    # Split the entire text into a list of words using spaces
    words = text.split()
    chunks = []
    
    # We calculate how many words to jump forward after making a chunk
    step = chunk_size - overlap
    
    # Loop through the list of words, taking jumps of size 'step'
    for i in range(0, len(words), step):
        # Grab a slice of words (e.g., from word 0 to word 100)
        chunk_words = words[i:i + chunk_size]
        
        # Join the words back together into a single string with spaces
        chunk_text = " ".join(chunk_words)
        chunks.append(chunk_text)
        
    return chunks

# Test code
if __name__ == "__main__":
    pdf_path = os.path.join("data", "pm_kisan.pdf")
    
    print("Reading PDF...")
    full_text = extract_text_from_pdf(pdf_path)
    
    print("Splitting into chunks...")
    chunks = split_into_chunks(full_text, chunk_size=100, overlap=20)
    
    print(f"Original text length: {len(full_text.split())} words")
    print(f"Total chunks created: {len(chunks)}")
    print("-" * 50)
    print("Here is Chunk #1:\n")
    print(chunks[0])
    print("-" * 50)
    print("Here is Chunk #2 (Notice the overlap with Chunk #1):\n")
    print(chunks[1])
