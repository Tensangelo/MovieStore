import { create } from 'zustand';
import { useState, useEffect } from 'react';
// Utils
import { Movie } from '@/utils/movieTypes';

interface WatchlistState {
    watchlist: Movie[];
    addToWatchlist: (movie: Movie) => void;
    removeFromWatchlist: (id: number) => void;
    setWatchlist: (watch: Movie[]) => void;
}

export const useWatchlist = create<WatchlistState>((set) => ({
    watchlist: [],
    addToWatchlist: (movie: Movie) => set((state) => {
        const newWatchlist = [...state.watchlist, movie];
        localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
        return { watchlist: newWatchlist };
    }),
    removeFromWatchlist: (id: number) => set((state) => {
        const newWatchlist = state.watchlist.filter((movie) => movie.id !== id);
        localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
        return { watchlist: newWatchlist };
    }),
    setWatchlist: (watchlist: Movie[]) => set({ watchlist }),
}));

export const useHydratedWatchlist = () => {
    const {watchlist, setWatchlist} = useWatchlist();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedWatchlist = localStorage.getItem('watchlist');
            if (savedWatchlist) {
                setWatchlist(JSON.parse(savedWatchlist));
            }
            setHydrated(true);
        }
    }, [setWatchlist]);

    if (!hydrated) {
        return { watchlist: [] };
    }

    return { watchlist };
};