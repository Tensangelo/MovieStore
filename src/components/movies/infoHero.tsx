import Image from "next/image";
// Icons
import { MdOutlineAccessTime } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { GiDirectorChair } from "react-icons/gi";
// Utils
import { InfoMovie, CastMovie } from "@/utils/movieTypes";

type InfoHeroProps = {
    movie: InfoMovie | null;
}

type InfoCastProps = {
    cast: CastMovie | null;
}

export const InfoHero = (props: InfoHeroProps & InfoCastProps) => {

    const { movie, cast } = props;
    // Funcion para tranformar el datos de runtime a horas y minutos (duracion) de la pelicua
    const formatDuration = (runtime: number) => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;

        return `${hours}h ${minutes}m`;
    };

    const durationMovie = movie ? formatDuration(movie.runtime) : '';
    const releaseYear = movie?.release_date?.slice(0, 4);

    const getDirectors = (crew: { id: number; name: string; job: string; }[]) => {
        const directors = crew.filter(member => member.job === "Director");

        if (directors.length > 0) {
            return directors.map(director => director.name).join(' & ');
        }

        return "Desconocido";
    }

    const directorNames = cast?.crew ? getDirectors(cast.crew) : 'Anonymous';

    return (
        <div className="flex justify-center items-center m-auto pt-4 pb-14 flex-wrap w-full h-full bg-gradient-to-b from-[#220f3d] to-[#3d1b6d]">
            <picture>
                <Image
                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie?.poster_path}`}
                    width={300}
                    height={340}
                    alt="Poster movie"
                    priority
                />
            </picture>
            <article className="max-w-[40rem] mx-10 mt-8">
                <h2 className="text-4xl font-bold text-white">
                    {movie?.title} &nbsp;
                </h2>
                <div className="flex items-center mt-2">
                    <div className="flex items-center ">
                        <MdOutlineAccessTime color="#6800ff" />
                        <span className="text-gray-300 ml-1">{durationMovie}</span>
                    </div>
                    &nbsp; <VscDebugBreakpointLog color="#6800ff" fontSize={15}/> &nbsp;
                    <span className="text-gray-300">({releaseYear})</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {movie?.genres?.map((genre) => {
                        return (
                            <span key={genre.id} className="border border-[#6800ff] text-white rounded-full px-4 py-2 transition-all duration-200 hover:bg-[#6800ff]">
                                {genre.name}
                            </span>
                        )
                    })}
                </div>

                <p className="mt-6 text-lg text-white">
                    {movie?.overview}
                </p>

                <article className="flex justify-start items-center mt-8">
                    <GiDirectorChair color="#ffffff" fontSize={32} />
                    <p className="font-bold text-base text-white mx-2">Director:</p>
                    <p className="text-base text-gray-200">{directorNames}</p>
                </article>
            </article>
        </div>
    )
}