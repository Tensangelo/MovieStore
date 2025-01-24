'use client';

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
// components
import { CardsInfo } from "@/components/movies/InfoDetails";
import { InfoHero } from "@/components/movies/infoHero";
import { SliderHorizontal } from "@/components/tools/sliderHorizontal";
import { LoadingSpinnerBig } from '@/components/tools/loadingSpinner';
// Api
import { fetchMovieData } from '@/app/api/movies/getMovie';
import { fetchMovieCast } from '@/app/api/movies/getCast';
// Utils
import { InfoMovie, CastMovie } from "@/utils/movie";

const MovieInfo = () => {
    const { id } = useParams();
    const movieId = typeof id === 'string' ? parseInt(id, 10) : null;

    const [dataMovie, setDataMovie] = useState<InfoMovie | null>(null);
    const [dataCast, setDataCast] = useState<CastMovie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getMovieData = async () => {
            if (movieId !== null) {
                try {
                    const dataMovie = await fetchMovieData({ id: movieId });
                    const dataCast = await fetchMovieCast({ id: movieId });
                    setDataMovie(dataMovie);
                    setDataCast(dataCast)
                } catch (err) {
                    setError(`Error fetching info movie: ${err}`);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setError('Invalid movie Id')
            }
        };

        getMovieData();
    }, [movieId]);

    if (error) {
        return <div>Ocurrio un errorcito: {error}</div>
    }

    return (
        <section className='mb-9'>
            {loading ? <LoadingSpinnerBig /> : (
                <>
                    <InfoHero
                        movie={dataMovie}
                        cast={dataCast}
                    />
                    <div className="flex justify-around items-start flex-wrap mt-10">
                        <SliderHorizontal
                            title="Top Cast"
                            spaceBetween={180}
                            slidesPerView={4}
                            cast={dataCast}
                        />
                        <CardsInfo
                            movie={dataMovie}
                        />
                    </div>
                </>
            )}
        </section>
    )
}

export default MovieInfo;