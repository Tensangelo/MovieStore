'use client'
import { useEffect, useState } from 'react';
// Icons
import { FaStar } from "react-icons/fa";
// Components
import { CardsHorizontal } from "@/components/tools/cardsHorizontal";
import { Loading } from '@/components/tools/loadingSpinner';
// Store
import { useHydratedWatchlist } from '@/store/useWatchlist';
// Api
import { fetchMovieData } from '@/app/api/movies/getMovie';
// Utils
import { InfoMovie } from "@/utils/movieTypes";

const Watchlist = () => {
    const { watchlist, hydrated } = useHydratedWatchlist();

    const [dataMovie, setDataMovie] = useState<InfoMovie[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getMovieData = async () => {
            if (Array.isArray(watchlist)) {
                if (watchlist.length > 0) {
                    try {
                        const movieDetails = await Promise.all(
                            watchlist.map(async (movie) => {
                                return await fetchMovieData({ id: movie.id });
                            })
                        );
                        setDataMovie(movieDetails);
                    } catch (err) {
                        setError(`Error fetching movie info: ${err}`);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    setLoading(false);
                    setError(null);  // No es necesario mostrar error si el array está vacío
                }
            } else {
                setLoading(false);
                setError('Your watchlist is not a valid array');
            }
        };

        if (hydrated) {
            getMovieData();
        }

    }, [watchlist, hydrated]);

    if (!hydrated) {
        return <Loading heightLoading='65.5vh' />
    }

    if (error) {
        return <div>Ocurrio un errorcito: {error}</div>;
    }

    return (
        <section className="w-full my-10">
            <article className="max-w-[75rem] w-full m-auto">
                <h2 className="text-2xl font-bold inline-flex items-center text-[#220f3d]">
                    <FaStar color="#6800ff" className="mr-2" />
                    My watchlist
                </h2>
                <div className="w-[100%] border border-[#6800ff]" />
            </article>
            {watchlist.length === 0 ? (
                <div className="bg-[#33175b] flex justify-center mt-8 items-center flex-col flex-wrap w-full max-w-[1300px] h-[447px] m-auto bourder rounded-xl px-4 sm:px-8">
                    <h1 className="text-6xl sm:text-5xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#6800ff] to-[#ff00ff] text-transparent bg-clip-text">
                        There are no movies in your watchlist.
                    </h1>
                </div>
            ) : (
                <>
                    {loading ? (
                        <Loading />
                    ) : (
                        <section className="max-w-[85%] w-[70rem] m-auto rounded-md mt-10 py-5 lg:border lg:shadow-[#6800ff] lg:shadow-md">
                            {dataMovie?.map((movie) => {
                                const {
                                    id,
                                    poster_path,
                                    title,
                                    release_date,
                                    overview,
                                    vote_average,
                                } = movie;

                                return (
                                    <CardsHorizontal
                                        key={id}
                                        idMovie={id}
                                        image={poster_path}
                                        title={title}
                                        infoAlt="picture of the movie"
                                        details={overview}
                                        releaseDate={release_date}
                                        score={vote_average}

                                        buttonsWatchlist={true}
                                    />
                                )
                            })}
                        </section>
                    )}
                </>
            )}
        </section>
    )
}

export default Watchlist;