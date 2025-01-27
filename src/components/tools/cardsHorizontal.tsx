import Image from "next/image";
// Components
import CircularProgressBar from "../movies/circularBarProgress";
import { IoIosRemoveCircle } from "react-icons/io";
// Hooks
import { useBookmark } from "@/hooks/useBookmark";

interface CardsHorizontalProps {
    idMovie: number;
    image: string;
    title: string;
    subtitle?: string;
    infoAlt: string;
    // opcionales y no relevantes
    details?: string;
    releaseDate?: string;
    score?: number;
    widthContainer?: string;
    widthLimitText?: string;

    buttonsWatchlist?: boolean;
}

export const CardsHorizontal = (infoProps: CardsHorizontalProps) => {
    const {
        idMovie,
        image,
        title,
        subtitle,
        infoAlt,
        details,
        releaseDate,
        score,
        widthContainer = '350px',
        widthLimitText = '170px',

        buttonsWatchlist = false,
    } = infoProps;

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

    const { handleBookmarkClick } = useBookmark({
        id: idMovie,
        title: title,
        release_date: releaseDate,
        poster_path: image,
        vote_average: score,
    });

    return (
        <div className="flex justify-start items-center m-auto my-8 border rounded-lg shadow-md relative"
            style={{ width: widthContainer }}
        >
            <picture className="w-[138px] h-[175px]">
                <Image
                    src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${image}`}
                    width={138}
                    height={175}
                    alt={infoAlt}
                    className="h-full rounded-tl-lg rounded-bl-lg"
                />
            </picture>
            <article className="ml-4 mr-8 py-5" style={{ maxWidth: widthLimitText }}>
                {score ? (
                    <div className="flex items-center mb-2">
                        <CircularProgressBar
                            selectedValue={formatScore(score)}
                            maxValue={100}
                            radius={20}
                            valueFontSize={10}
                            activeStrokeColor='#6800ff'
                            withGradient
                        />
                        <div className="ml-2">
                            <p className="text-lg font-bold text-[#220f3d]">
                                {title}
                            </p>
                            {releaseDate && <span className="text-sm font-normal text-gray-500">({formatDate(releaseDate)})</span>}
                        </div>
                    </div>
                ) : (
                    <p className="text-lg font-bold text-[#220f3d]">
                        {title}
                    </p>
                )}
                {subtitle && <span className="text-base text-gray-500">{subtitle}</span>}
                {details &&
                    <p className="mt-2 text-base">
                        {details}
                    </p>
                }
            </article>
            {buttonsWatchlist && (
                <div className="w-fit absolute top-[-9px] right-[-15px]">
                    <button
                        onClick={handleBookmarkClick}
                        className="max-w-max flex items-center transition-all duration-200 rounded-md px-4 py-2 bg-[#3d1b6d] text-white hover:bg-[#6800ff] hover:scale-105 cursor-pointer"
                        aria-label="Remove of watchlist"
                    >
                        <IoIosRemoveCircle className="mr-2" />
                        Remove
                    </button>
                </div>
            )}
        </div>
    )
}