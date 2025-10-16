import { apiBase, apiJson } from 'shared/api/api';
import type { Track } from '../../types/track';
import { useTrackStore } from '../../slice/useTrackStore';

interface MediaTrack {
    trackName: string;
    coverUrl: string | null;
    audioUrl: string | null;
}

interface AlbumTracksResponse {
    albumName: string;
    coverUrl: string | null;
    tracks: {
        trackName: string;
        audioUrl: string;
    }[];
}

export async function fetchTrack(
    groupId: string,
    groupName: string,
    albumId: string | null,
    albumName: string | null,
): Promise<Track[]> {
    try {
        const [mainResp, mediaResp] = await Promise.all([
            apiJson.get<Track[]>('/tracks', {
                params: { groupId, albumId: albumId && albumName ? albumId : undefined },
            }),
            albumId && albumName
                ? apiBase.get<AlbumTracksResponse>(
                      `/album-tracks/${encodeURIComponent(groupName)}/${encodeURIComponent(albumName)}`,
                  )
                : apiBase.get<MediaTrack[]>(`/tracks/${encodeURIComponent(groupName)}`),
        ]);

        const main = mainResp.data;
        if (!Array.isArray(main)) {
            useTrackStore.getState().setTracks([]);
            useTrackStore.getState().setSinglesTrack([]);
            return [];
        }

        let media: MediaTrack[] = [];

        if (albumId && albumName) {
            const albumData = mediaResp.data as AlbumTracksResponse;
            const coverUrl = albumData.coverUrl ?? '';
            media = albumData.tracks.map((t) => ({
                trackName: t.trackName,
                audioUrl: t.audioUrl,
                coverUrl,
            }));
        } else {
            media = mediaResp.data as MediaTrack[];
        }

        // Формируем два массива: альбомные и синглы
        const albumTracks: Track[] = [];
        const singles: Track[] = [];

        main.forEach((t) => {
            const m = media.find((m) => m.trackName === t.id || m.trackName === t.title);
            const coverUrl = m?.coverUrl ?? ''; // всегда получаем coverUrl, даже если трек без альбома
            const trackWithMedia: Track = {
                ...t,
                cover: coverUrl,
                audioUrl: m?.audioUrl ?? '',
                groupName,
            };

            if (t.albumId && t.albumId !== '') {
                // Трек с альбомом
                if (!albumId || albumId === t.albumId) {
                    albumTracks.push(trackWithMedia);
                }
            } else {
                // Синглы (без albumId)
                singles.push(trackWithMedia);
            }
        });

        // Записываем в стор
        useTrackStore.getState().setTracks(albumTracks);
        useTrackStore.getState().setSinglesTrack(singles);

        // Возвращаем объединённый массив (если нужно)
        return albumTracks.length > 0 ? albumTracks : singles;
    } catch (error: unknown) {
        console.error('Ошибка при загрузке треков с медиа', error);
        useTrackStore.getState().setTracks([]);
        useTrackStore.getState().setSinglesTrack([]);
        return [];
    }
}
