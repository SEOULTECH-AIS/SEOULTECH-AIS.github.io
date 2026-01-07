// 1. 학위 정보 (공통)
export interface DegreeInfo {
    degree: 'B.S.' | 'M.S.' | 'Ph.D.' | 'M.S./Ph.D.' | 'Researcher' | 'Unified';
    school: string;
    year: number | string; // 데이터 마이그레이션 과도기를 위해 둘 다 허용하되, 최종적으로 number 권장
    thesis?: string;
}

// 2. 기본 정보 (Base)
export interface BasePerson {
    id: number;         // 호출 번호
    nameKo: string;     // 국문명
    nameEn: string;     // 영문명
    role: string;       // ?
    email?: string;     // email 주소
    academicBackground?: DegreeInfo[];
    image?: string; // 이미지 경로 오버라이드용 (선택)
}

// 3. 교수 (Professor)
export interface Professor extends BasePerson {
    category: 'Professor';
    phone: string;
    career: { period: string; role: string; }[];
    awards: string[];
    researchInterests: string[];
}

// 4. 재학생 (Member)
export interface Member extends BasePerson {
    category: 'Member';
    currentCourse: 'Ph.D.' | 'M.S.' | 'M.S./Ph.D.' | 'Researcher';
    researchInterests: string[];
}

// 5. 졸업생 (Alumni)
export interface Alumni extends BasePerson {
    category: 'Alumni';
    alumniType: 'General' | 'Professional';
    currentWorkplace?: string;
}

export type Person = Professor | Member | Alumni;
