const url = process.env.API_URL_MOVIES;
const key = process.env.TMDB_API_KEY;

type MovieDataProps = {
    id: number;
}

export async function fetchMovieCast({ id }: MovieDataProps) {
    try {
        const apiUrl = `${url}/${id}/credits?language=en-US`;
        const options = {
            methods: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${key}`
            }
        }

        const res = await fetch(apiUrl, options);

        if (!res.ok) {
            throw new Error(`Failed to obtain cast movie: ${res.statusText}`)
        }

        return await res.json();
    } catch (error) {
        console.error(`Request failed: `, error)
    }
}