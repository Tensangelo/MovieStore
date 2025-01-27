'use client';

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
// components
import { CardsHorizontal } from '@/components/tools/cardsHorizontal';
import { InfoDetails } from "@/components/movies/InfoDetails";
import { InfoHero } from "@/components/movies/infoHero";
import { SliderHorizontal } from "@/components/tools/sliderHorizontal";
import { Loading } from '@/components/tools/loadingSpinner';
// Api
import { fetchMovieData } from '@/app/api/movies/getMovie';
import { fetchMovieCast } from '@/app/api/movies/getCast';
// Utils
import { InfoMovie, CastMovie } from "@/utils/movieTypes";


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
                    setDataCast(dataCast);
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
            {loading ? <Loading heightLoading='65.5vh' /> : (
                <>
                    <InfoHero
                        movie={dataMovie}
                        cast={dataCast}
                    />
                    <div className="flex justify-around items-start flex-wrap mt-10">
                        <SliderHorizontal title="Top Cast">
                            {dataCast?.cast.slice(0, 9).map((info) => {
                                const { id, profile_path, name, character } = info;

                                return (
                                    <SwiperSlide key={info.id}>
                                        <CardsHorizontal
                                            idMovie={id}
                                            image={profile_path}
                                            title={name}
                                            subtitle={character}
                                            infoAlt='Photo of the performer'
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </SliderHorizontal>
                        {dataMovie && <InfoDetails movie={dataMovie} />}
                    </div>
                </>
            )}
        </section>
    )
}

export default MovieInfo;