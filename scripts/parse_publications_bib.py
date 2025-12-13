import json
import re
import os

# --- Configuration ---
# Get the directory where this script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)

# Default paths (relative to project root)
# You can change 'papers.bib' to your actual bib file name or path
SOURCE_BIB_FILE = os.path.join(PROJECT_ROOT, "papers.bib")
OUTPUT_FILE = os.path.join(PROJECT_ROOT, "data", "publications.ts")
# ---------------------

def parse_bib_file(source_path, output_path):
    print(f"Reading BibTeX from: {source_path}")
    
    if not os.path.exists(source_path):
        print(f"Error: Source file not found: {source_path}")
        print("Please check the 'SOURCE_BIB_FILE' path in the script.")
        return

    with open(source_path, "r", encoding="utf-8") as f:
        content = f.read()

    entries = []
    
    # Matches: @article{ID, ... } or @inproceedings{ID, ... }
    entry_pattern = re.compile(r'@(\w+)\s*\{\s*([^,]+),', re.MULTILINE)
    
    for match in entry_pattern.finditer(content):
        entry_type = match.group(1)
        entry_id = match.group(2).strip()
        start_pos = match.end()
        
        balance = 1
        current_pos = start_pos
        field_block = ""
        
        while balance > 0 and current_pos < len(content):
            char = content[current_pos]
            if char == '{':
                balance += 1
            elif char == '}':
                balance -= 1
            
            if balance > 0:
                field_block += char
            current_pos += 1
            
        title = ""
        author = ""
        year = ""
        journal = ""
        booktitle = ""
        volume = ""
        pages = ""
        doi = ""
        
        kv_pattern = re.compile(r'(\w+)\s*=\s*[{\"](.*?)[\"}]', re.DOTALL | re.MULTILINE)
        
        for kv in kv_pattern.finditer(field_block):
            key = kv.group(1).lower()
            val = kv.group(2).replace('\n', ' ').replace('{', '').replace('}', '').strip()
            
            if key == 'title': title = val
            elif key == 'author': author = val
            elif key == 'year': year = val
            elif key == 'journal': journal = val
            elif key == 'booktitle': booktitle = val
            elif key == 'volume': volume = val
            elif key == 'pages': pages = val
            elif key == 'doi': doi = val
        
        # Cleanup Titles if needed
        title = title.replace("**", "")

        venue = journal if journal else booktitle
        if volume: venue += f", Vol. {volume}"
        if pages: venue += f", pp. {pages}"
        if year and year not in venue: venue += f", {year}"

        link = f"https://doi.org/{doi}" if doi else None

        entries.append({
            "year": year if year else "Unknown",
            "paper": {
                "id": entry_id,
                "title": title,
                "authors": author,
                "venue": venue,
                "link": link
            }
        })

    years = sorted(list(set(e["year"] for e in entries)), reverse=True)
    grouped_data = []
    
    for y in years:
        papers_in_year = [e["paper"] for e in entries if e["year"] == y]
        grouped_data.append({
            "year": y,
            "papers": papers_in_year
        })

    ts_content = "export interface Paper {\n  id: string;\n  title: string;\n  authors: string;\n  venue: string;\n  link?: string | null;\n}\n\n"
    ts_content += "export interface PublicationYearGroup {\n  year: string;\n  papers: Paper[];\n}\n\n"
    ts_content += "export const publicationsData: PublicationYearGroup[] = " + json.dumps(grouped_data, ensure_ascii=False, indent=2) + ";"

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    
    print(f"Successfully generated {output_path} from {len(entries)} BibTeX entries.")

if __name__ == "__main__":
    parse_bib_file(SOURCE_BIB_FILE, OUTPUT_FILE)
