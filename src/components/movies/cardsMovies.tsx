import Image from "next/image";
import Link from "next/link";
// Hooks
import { useBookmark } from "@/hooks/useBookmark";
// Icons
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import CircularProgressBar from "./circularBarProgress";
import { Movie } from "@/utils/movieTypes";

interface ContainerProps {
    children: React.ReactNode;
}

export const ContainerCards = (props: ContainerProps) => {
    const { children } = props;

    return (
        <section className="w-full grid grid-cols-1 relative sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
            {children}
        </section>
    )
}

export const CardsMovies = (props: Movie) => {
    const { id, title, release_date, poster_path, vote_average } = props;

    const { isInWatchlist, handleBookmarkClick } = useBookmark({
        id,
        title,
        release_date,
        poster_path,
        vote_average,
    });

    // Ajustes de fechas para ser mas legible
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).replace('de', 'de');
    };

    // Ajuste de score por puntuacion
    const formatScore = (score: number): number => {
        // Eliminar decimales)
        const truncatedScore = Math.floor(score * 10);

        // Asegurarse de que el resultado esté en el rango [0, 100]
        return Math.min(100, Math.max(0, truncatedScore));
    };

    return (
        <div className="border-solid border-2 rounded-2xl max-w-[180px] shadow-lg mb-8 relative">
            <Link href={`/movies/info/${id}`}>
                <Image
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`}
                    width={180}
                    height={273}
                    alt='picture of the movie'
                    className="rounded-t-xl"
                    priority
                />
            </Link>
            <div className="max-w-max relative">
                <div className="bg-black rounded-full max-w-max p-[3px] absolute top-[-25px] left-2">
                    {vote_average && (
                        <CircularProgressBar
                            selectedValue={formatScore(vote_average)}
                            maxValue={100}
                            radius={22}
                            valueFontSize={12}
                            activeStrokeColor='#6800ff'
                            withGradient
                        />
                    )}
                </div>
            </div>
            <article className="mt-8 pl-2 pb-3">
                <Link
                    className="font-bold text-[#220f3d] hover:text-[#6800ff] cursor-pointer"
                    href={`/movies/info/${id}`}
                >
                    {title}
                </Link>
                {release_date && <p className="font-light text-sm text-gray-500">{formatDate(release_date)}</p>}
            </article>
            <div className="flex justify-end w-[95%] absolute bottom-[-10px]">
                <button
                    onClick={handleBookmarkClick}
                    className="max-w-max transition-all duration-200 text-[#3d1b6d] hover:text-[#6800ff] hover:scale-105 cursor-pointer"
                    aria-label="Add whachlist"
                >
                    {isInWatchlist ? <FaBookmark size={30} /> : <FaRegBookmark size={30} />}
                </button>
            </div>
        </div>
    )
}