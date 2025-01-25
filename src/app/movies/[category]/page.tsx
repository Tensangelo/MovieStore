/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
// Components
import { CardsMovies, ContainerCards } from "@/components/movies/cardsMovies";
import { SqueletonFilter } from "@/components/movies/skeletonFilter";
// Api
import { fetchMovieCategory } from "@/app/api/movies/getCategory";
import { LoadingSpinnerSmall } from "@/components/tools/loadingSpinner";
import { Movie } from "@/utils/movieTypes";

const MoviesCategory = () => {
    const { category }: { category: "popular" | "now_playing" | "top_rated" | "upcoming" } = useParams();

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const fetchMovies = async () => {
        setLoading(true); //Inicia carga
        try {
            const data = await fetchMovieCategory({ category: category, page });
            setMovies((prevMovies) => [...prevMovies, ...data.results]);
            setPage((prevPage) => prevPage + 1);
        } catch (err) {
            console.log(`Error al cargar las películas: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <section className="w-full px-8 py-10 max-w-[1400px] m-auto">
            <h2 className="text-2xl font-bold mb-5 text-[#220f3d]">Popular Movies</h2>
            <div className="flex justify-between">
                <SqueletonFilter />
                <div className="w-full">
                    <ContainerCards>
                        {movies.map((movie, i: number) => {
                            const keyMovie = `${movie.id}${i}`

                            return (
                                <CardsMovies
                                    key={keyMovie}
                                    id={movie.id}
                                    title={movie.title}
                                    release_date={movie.release_date}
                                    poster_path={movie.poster_path}
                                    vote_average={movie.vote_average}
                                />
                            )
                        })}
                    </ContainerCards>
                    {loading ? (
                        <div className="w-full flex justify-end">
                            <LoadingSpinnerSmall />
                        </div>
                    ) : (
                        <div className="w-full flex justify-end">
                            <button
                                onClick={fetchMovies}
                                className="mt-6 p-3 w-[98.5%] bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Loading' : 'Load More'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default MoviesCategory;