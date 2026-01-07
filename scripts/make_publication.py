import json
import re
from pathlib import Path

def has_korean(text):
    """Check if the text contains any Korean characters."""
    if not text:
        return False
    korean_pattern = re.compile(r'[\uac00-\ud7a3]')
    return bool(korean_pattern.search(text))

def format_author(authors):
    """Convert author list to string representation."""
    if isinstance(authors, str):
        return authors
    if not isinstance(authors, list):
        return ""
    formatted = []
    for p in authors:
        if "literal" in p:
            formatted.append(p["literal"])
        elif "family" in p or "given" in p:
            family = p.get("family", "")
            given = p.get("given", "")
            if has_korean(family) or has_korean(given):
                name = f"{family}{given}".strip()
                formatted.append(name)
            else:
                parts = []
                if family: parts.append(family)
                if given: parts.append(given)
                formatted.append(", ".join(parts))
    return ", ".join(formatted)

def load_and_process(file_path, pub_type):
    """Loads and processes a single publication file."""
    path = Path(file_path)
    if not path.exists():
        print(f"Warning: File not found: {file_path}")
        return []

    with path.open("r", encoding="UTF-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            return []

    processed = []
    for item in data:
        title = item.get("title", "")
        container_title = item.get("container-title", "")
        event_title = item.get("event-title", "")
        
        # Determine category
        is_domestic = has_korean(title) or has_korean(container_title) or has_korean(event_title)
        scope = "domestic" if is_domestic else "international"
        item["category"] = f"{scope}-{pub_type}"
        
        # Extract Year
        year = 0
        if "issued" in item and "date-parts" in item["issued"]:
            try:
                year = int(item["issued"]["date-parts"][0][0])
            except (IndexError, ValueError, TypeError):
                pass
        item["year"] = year

        # Set Venue
        item["venue"] = container_title if container_title else event_title

        # Format Author
        if isinstance(item.get("author"), list):
            item["author"] = format_author(item["author"])
        
        # Normalize DOI
        if "DOI" in item:
            item["doi"] = item["DOI"]
        
        processed.append(item)
    return processed

if __name__ == "__main__":
    # 1. Load and process both datasets
    journals = load_and_process("scripts/source/journals.json", "journal")
    conferences = load_and_process("scripts/source/conferences.json", "conference")
    
    # 2. Merge
    all_publications = journals + conferences
    
    # 3. Sort by year (descending)
    all_publications.sort(key=lambda x: x.get("year", 0), reverse=True)
    
    # 4. Save to merged JSON file
    output_path = Path("src/data/publications.json")
    with output_path.open("w", encoding="UTF-8") as f:
        json.dump(all_publications, f, indent=4, ensure_ascii=False)
    
    print(f"Successfully merged {len(all_publications)} items into {output_path}")