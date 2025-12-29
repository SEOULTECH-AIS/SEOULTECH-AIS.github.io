export interface CityThemeColors {
    fog: string;
    background: string;
    buildingStart: string; // Normal Color
    buildingHover: string; // Hover Color
    ground: string;
}

export const CITY_THEMES: { light: CityThemeColors; dark: CityThemeColors } = {
    light: {
        fog: '#f8fafc',       // slate-50 (Original)
        background: '#f8fafc',
        buildingStart: '#94a3b8', // slate-400 (Original)
        buildingHover: '#e2e8f0', // slate-200 (Original Hover)
        ground: '#f8fafc'
    },
    dark: {
        fog: '#0f172a',       // slate-900
        background: '#0f172a',
        buildingStart: '#334155', // slate-700
        buildingHover: '#64748b', // slate-500 (Brighter on hover)
        ground: '#0f172a'
    }
};
