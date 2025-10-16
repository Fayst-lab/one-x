import { apiBase, apiJson } from 'shared/api/api';
import type { Track } from '../../types/track';
import { useTrackStore } from '../../slice/useTrackStore';

interface AlbumTrack {
    trackName: string;
    coverUrl: string | null;
    audioUrl: string;
    albumName: string;
}

export async function fetchAllTraks(groupId: string, groupName: string): Promise<Track[]> {
    try {
        const [{ data: mainTracks }, { data: mediaTracks }] = await Promise.all([
            apiJson.get<Track[]>('/tracks', { params: { groupId } }),
            apiBase.get<AlbumTrack[]>(`/allTracks/${encodeURIComponent(groupName)}`),
        ]);

        if (!Array.isArray(mainTracks) || !Array.isArray(mediaTracks)) {
            throw new Error('Некорректные данные');
        }

        const merged = mainTracks.map((t) => {
            const media = mediaTracks.find((m) => m.trackName === t.id || m.trackName === t.title);
            return {
                ...t,
                cover: media?.coverUrl ?? '',
                audioUrl: media?.audioUrl ?? '',
                albumName: media?.albumName ?? '',
                groupName,
            };
        });

        merged.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        useTrackStore.getState().setTracks(merged);
        return merged;
    } catch (error) {
        console.error('Ошибка при загрузке треков и медиа:', error);
        useTrackStore.getState().setTracks([]);
        return [];
    }
}
