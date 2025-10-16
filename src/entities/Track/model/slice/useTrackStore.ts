import { create } from 'zustand';
import type { Track } from '../types/track';

export interface TrackState {
    tracks: Track[];
    singlesTrack: Track[]; // новый массив для синглов
    loading: boolean;
    visibleCount: number;

    setLoading: (loading: boolean) => void;
    setTracks: (tracks: Track[]) => void;
    addTrack: (track: Track) => void;
    updateTrack: (track: Track) => void;
    removeTrack: (id: string) => void;

    // методы для singlesTrack
    setSinglesTrack: (tracks: Track[]) => void;
    addSingleTrack: (track: Track) => void;

    reset: () => void;
    showMore: () => void;
    resetVisibleCount: () => void;
}

const INITIAL_VISIBLE_COUNT = 10;

export const useTrackStore = create<TrackState>((set) => {
    const initialState = {
        tracks: [] as Track[],
        singlesTrack: [] as Track[], // инициализация синглов
        loading: false,
        visibleCount: INITIAL_VISIBLE_COUNT,
    };

    return {
        ...initialState,

        setLoading: (loading) => set({ loading }),
        setTracks: (tracks) => set({ tracks }),
        addTrack: (track) => set((state) => ({ tracks: [...state.tracks, track] })),
        updateTrack: (updatedTrack) =>
            set((state) => ({
                tracks: state.tracks.map((t) => (t.id === updatedTrack.id ? updatedTrack : t)),
            })),
        removeTrack: (id) =>
            set((state) => ({
                tracks: state.tracks.filter((t) => t.id !== id),
            })),

        // новые методы для singlesTrack
        setSinglesTrack: (tracks) => set({ singlesTrack: tracks }),
        addSingleTrack: (track) =>
            set((state) => ({ singlesTrack: [...state.singlesTrack, track] })),

        reset: () => set(initialState),
        showMore: () =>
            set((state) => ({
                visibleCount: state.visibleCount + INITIAL_VISIBLE_COUNT,
            })),
        resetVisibleCount: () => set({ visibleCount: INITIAL_VISIBLE_COUNT }),
    };
});
