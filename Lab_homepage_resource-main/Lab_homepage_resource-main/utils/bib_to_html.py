import os
import sys
import subprocess
from datetime import datetime

# --- pybtex 라이브러리 의존성 확인 및 자동 설치 ---
try:
    from pybtex.database import parse_file as parse_bib_file
    from pybtex.database import BibliographyData, Entry
except ImportError:
    print("The 'pybtex' library is not found. Attempting to install it...")
    try:
        subprocess.check_call([
            sys.executable, "-m", "pip", "install", "pybtex"])
        from pybtex.database import parse_file as parse_bib_file
        from pybtex.database import BibliographyData, Entry
    except Exception as e:
        print(f"Error: Failed to install 'pybtex'. {e}")
        print("Please install it manually by running: pip install pybtex")
        sys.exit(1)


# HTML 출력을 위한 탭 문자열 정의
TAB_1 = "\t"
TAB_2 = "\t\t"
TAB_3 = "\t\t\t"
TAB_4 = "\t\t\t\t"
TAB_5 = "\t\t\t\t\t"
TAB_6 = "\t\t\t\t\t\t"


def get_dynamic_group_key(year_str, now_year):
    """현재 연도를 기준으로 동적 그룹 키(연도, 5년, 10년)를 생성합니다."""
    if not year_str.isdigit():
        return "Undated"

    pub_year = int(year_str)
    if pub_year >= now_year - 5:
        return str(pub_year)

    # 규칙 2: 그 외 모든 논문은 5년 단위로 그룹화
    _blocked = ((now_year - 10) // 10) * 10

    if pub_year >= _blocked:
        block_start = (pub_year // 5) * 5
        block_end = block_start + 4
        return f"{block_start}-{block_end}"

    # 규칙 3: 10년 넘어간 논문은 다 묶임.
    return f"-{_blocked}"


def Get_pub_id(entry: Entry):
    """논문 항목의 고유 ID를 생성합니다."""
    return "pub_" + entry.key


def Format_auth(entry: Entry):
    """pybtex 항목의 저자 목록 형식을 지정합니다."""
    _auth_list = []
    if 'author' in entry.persons:
        _auth_list = [
            str(person).replace(",", "") for person in entry.persons['author']
        ]
    return ", ".join(_auth_list) or "No authors"


def Format_title(entry: Entry):
    """논문 제목의 형식을 지정하고 불필요한 중괄호를 제거합니다."""
    _title = entry.fields.get("title", "No title")

    if _title != "No title":
        return _title.replace("{", "").replace("}", "")
    return "No title"


def Format_entry_html(entry: Entry):
    """단일 BibTeX 항목을 HTML 형식으로 변환합니다."""
    _t = Format_title(entry)
    _auth = Format_auth(entry)
    _pub = str(
        entry.fields.get("journal") or entry.fields.get("booktitle") or "N/A")
    _pub = _pub.replace("{", "").replace("}", "")
    _y = str(entry.fields.get("year", "N/A"))
    _v = str(entry.fields.get("volume", ""))
    _num = str(entry.fields.get("number", ""))
    _pages = str(entry.fields.get("pages", ""))
    _doi = str(entry.fields.get("doi", ""))
    _url = str(entry.fields.get("url", ""))

    _details = [_pub, _y]
    if _v:
        _details.append(f"Vol. {_v}")
    if _num:
        _details.append(f"No. {_num}")
    if _pages:
        _details.append(f"pp. {_pages}")
    _details = ", ".join(filter(None, _details))

    _links = ""
    if _doi:
        _links += f'<a href="https://doi.org/{_doi}" target="_blank">[DOI]</a>'
    if _url:
        _links += f' <a href="{_url}" target="_blank">[Link]</a>'

    return (
        f'{TAB_5}<div class="pub-publication" id="{Get_pub_id(entry)}">\n'
        f'{TAB_6}<span class="pub-title">{_t}</span>\n'
        f'{TAB_6}<span class="pub-authors">{_auth}</span>\n'
        f'{TAB_6}<span class="pub-details">{_details}</span>\n'
        f'{TAB_6}<div class="pub-links">{_links}</div>\n'
        f"{TAB_5}</div>"
    )


def Generate_html_for_dir(
    bib_dir,
    file_name: str,
    output_html_path
):
    """지정된 디렉토리의 .bib 파일을 파싱하여 동적 그룹화된 HTML 파일을 생성합니다."""
    if not os.path.isdir(bib_dir):
        print(f"Info: Directory not found, skipping: {bib_dir}")
        with open(output_html_path, "w", encoding="utf-8") as f:
            f.write('<div class="pub-container"></div>\n')
        return

    _all_data = BibliographyData()
    _all_data.add_entries(
        parse_bib_file(
            os.path.join(bib_dir, f"{file_name}.bib"),
            bib_format='bibtex'
        ).entries.items()
    )

    # 동적 그룹화 로직 적용
    _now_year = datetime.now().year
    _data_by_group = {}
    for _e in _all_data.entries.values():
        _y_str = _e.fields.get("year", "Undated")
        _group_key = get_dynamic_group_key(_y_str, _now_year)

        if _group_key not in _data_by_group:
            _data_by_group[_group_key] = []
        _data_by_group[_group_key].append(_e)

    # 그룹 키를 내림차순으로 정렬합니다. (예: '2025', '2024', '2020-2024', '2010s', ...)
    _sorted_groups = sorted(_data_by_group.keys(), reverse=True)

    _cnt = '<div class="pub-container">\n'
    for _k_ct, _group_key in enumerate(_sorted_groups):
        _cnt += f'{TAB_1}<div class="pub-year-section">\n'
        # 그룹 키가 연도(숫자)인 경우만 기본으로 펼침
        _is_recent_year = _group_key.isdigit() and (_k_ct < 3)
        _cnt += f'{TAB_2}{"<details open>" if _is_recent_year else "<details>"}\n'
        _cnt += f"{TAB_3}<summary>\n"
        _cnt += f'{TAB_4}<h2 class="pub-year-header">{_group_key}</h2>\n'
        _cnt += f"{TAB_3}</summary>\n"
        _cnt += f"{TAB_3}<ul>\n"

        # 그룹 내에서 논문을 연도별 내림차순, 제목별 오름차순으로 정렬
        _sorted_e = sorted(
            _data_by_group[_group_key], 
            key=lambda x: (x.fields.get("year", "0"), x.fields.get("title", "")),
            reverse=True
        )

        for _e in _sorted_e:
            _cnt += f"{TAB_4}<li>\n{Format_entry_html(_e)}\n{TAB_4}</li>\n"
        _cnt += f"{TAB_3}</ul>\n"
        _cnt += f"{TAB_2}</details>\n"
        _cnt += f"{TAB_1}</div>\n"
    _cnt += '</div>\n'

    with open(output_html_path, "w", encoding="utf-8") as f:
        f.write(_cnt)
    print(f"Successfully generated {output_html_path}")


def main():
    """경로를 설정하고, 유형별로 HTML 생성을 시작합니다."""
    _base_dir = os.path.dirname(__file__)

    _tasks = [
        {
            "name": "Journal",
            "source_dir": os.path.join(
                _base_dir, "..", "doc"),
            "output_file": os.path.join(
                _base_dir, "..", "page", "publications_journal.html")
        },
        {
            "name": "Conference",
            "source_dir": os.path.join(
                _base_dir, "..", "doc"),
            "output_file": os.path.join(
                _base_dir, "..", "page", "publications_conference.html")
        }
    ]

    for _task in _tasks:
        print(f"--- Generating {_task['name']} publications ---")
        Generate_html_for_dir(
            _task["source_dir"], _task["name"], _task["output_file"])

if __name__ == "__main__":
    main()
