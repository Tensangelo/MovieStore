import { useWatchlist, useHydratedWatchlist } from "@/store/useWatchlist";
import { Movie } from '@/utils/movieTypes';

export const useBookmark  = (movie: Movie) => {
    const { watchlist } = useHydratedWatchlist();
    const { addToWatchlist, removeFromWatchlist } = useWatchlist();

    const isInWatchlist = watchlist.some((item) => item.id === movie.id);

    const handleBookmarkClick = () => {
        if (isInWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie)
        }
    }

    return {
        isInWatchlist,
        handleBookmarkClick,
    }
}