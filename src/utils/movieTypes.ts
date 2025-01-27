interface Genre {
    id: number;
    name: string;
}

interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}

interface Crew {
    id: number;
    name: string;
    job: string;
}

export interface Movie {
    id: number;
    title: string;
    release_date?: string;
    poster_path: string;
    vote_average?: number;
}

export interface InfoMovie {
    id: number;
    title: string;
    overview: string;
    status: string;
    vote_average: number;
    genres: Genre[];
    poster_path: string;
    runtime: number;
    release_date: string;
    original_language: string;
    budget: number;
    revenue: number;
}

export interface CastMovie {
    id: number;
    cast: Cast[];
    crew: Crew[];
}