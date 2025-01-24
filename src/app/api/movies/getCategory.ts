
const url = process.env.API_URL_MOVIES;
const key = process.env.TMDB_API_KEY;

type CategoryMovies = {
    category: 'popular' | 'now_playing' | 'top_rated' | 'upcoming';
    page: number;
}

export async function fetchMovieCategory(props: CategoryMovies) {
    try {
        const { category, page } = props;

        const apiUrl = `${url}/${category}?language=en-US&page=${page}`;
        const options = {
            methods: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${key}`
            }
        }

        const res = await fetch(apiUrl, options);

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.statusText}`)
        }

        return await res.json();

    } catch (error) {
        console.error(`Request failed: `, error)
    }
}