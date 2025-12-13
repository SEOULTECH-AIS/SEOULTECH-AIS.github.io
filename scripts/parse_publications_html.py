import json
import re
import os

# --- Configuration ---
# Get the directory where this script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)

# Relative paths from the script directory or project root
# Original HTML location: AIS_Homepage/Lab_homepage.../page/publications_conference.html
SOURCE_FILE = os.path.join(PROJECT_ROOT, "Lab_homepage_resource-main", "Lab_homepage_resource-main", "page", "publications_conference.html")

# Output TypeScript file: AIS_Homepage/data/publications.ts
OUTPUT_FILE = os.path.join(PROJECT_ROOT, "data", "publications.ts")
# ---------------------

def parse_html_publications(source_path, output_path):
    print(f"Reading from: {source_path}")
    
    if not os.path.exists(source_path):
        print(f"Error: Source file not found at {source_path}")
        return

    with open(source_path, "r", encoding="utf-8") as f:
        html = f.read()

    html = ' '.join(html.split())
    sections = html.split('class="pub-year-section"')
    data = []

    for sec in sections[1:]: 
        year_match = re.search(r'<h2 class="pub-year-header">(.*?)</h2>', sec)
        if not year_match:
            continue
        year = year_match.group(1).strip()
        
        papers = []
        pub_blocks = sec.split('class="pub-publication"')
        
        for block in pub_blocks[1:]:
            id_match = re.search(r'^\s*id="(.*?)"', block)
            if not id_match:
                continue
            pid = id_match.group(1)
            
            title_match = re.search(r'<span class="pub-title">(.*?)</span>', block)
            authors_match = re.search(r'<span class="pub-authors">(.*?)</span>', block)
            details_match = re.search(r'<span class="pub-details">(.*?)</span>', block)
            
            title = title_match.group(1).strip() if title_match else ""
            authors = authors_match.group(1).strip() if authors_match else ""
            details = details_match.group(1).strip() if details_match else ""
            
            # --- Cleanup ---
            # Remove Markdown bold formatting '**'
            title = title.replace("**", "")
            # Clean HTML entities
            title = title.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
            authors = authors.replace("&amp;", "&")
            details = details.replace("&amp;", "&")

            citation_link = None
            link_div_match = re.search(r'<div class="pub-links">(.*?)</div>', block)
            if link_div_match:
                link_content = link_div_match.group(1)
                href_match = re.search(r'href="(.*?)"', link_content)
                if href_match:
                    citation_link = href_match.group(1)
            
            papers.append({
                "id": pid,
                "title": title,
                "authors": authors,
                "venue": details,
                "link": citation_link
            })
        
        data.append({
            "year": year,
            "papers": papers
        })

    ts_content = "export interface Paper {\n  id: string;\n  title: string;\n  authors: string;\n  venue: string;\n  link?: string | null;\n}\n\n"
    ts_content += "export interface PublicationYearGroup {\n  year: string;\n  papers: Paper[];\n}\n\n"
    ts_content += "export const publicationsData: PublicationYearGroup[] = " + json.dumps(data, ensure_ascii=False, indent=2) + ";"

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(ts_content)

    print(f"Successfully generated: {output_path}")

if __name__ == "__main__":
    parse_html_publications(SOURCE_FILE, OUTPUT_FILE)
