// src/features/album/services/addAlbum.ts
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { apiBase, apiJson } from 'shared/api';
import type { Album } from 'entities/Album';
import type { Track } from 'entities/Track';
import type { Genre } from 'entities/Group';
import { useAlbumStore } from 'entities/Album';
import { useTrackStore } from 'entities/Track';

export interface AddAlbumData {
    title: string;
    groupName: string;
    cover: File;
    description?: string;
    tracks: {
        file: File;
        title: string;
        duration: number;
    }[];
    genre: Genre;
}

interface UploadAlbumResponse {
    coverUrl: string;
    tracksUrls: string[];
}

interface CreatedTrackResponse {
    id: string;
}

const extractTitle = (url: string): string =>
    decodeURIComponent(url)
        .split('/')
        .pop()
        ?.replace(/\.[^/.]+$/, '') ?? 'Untitled';

export async function addAlbum(data: AddAlbumData): Promise<UploadAlbumResponse> {
    if (!data.groupName) {
        toast.error('Группа не выбрана');
        throw new Error('groupName is required');
    }

    return await toast.promise(
        (async (): Promise<UploadAlbumResponse> => {
            // 1. Загружаем файлы на сервер
            const formData = new FormData();
            formData.append('groupName', data.groupName);
            formData.append('title', data.title);
            if (data.description) formData.append('description', data.description);
            formData.append('cover', data.cover);
            data.tracks.forEach(({ file }) => formData.append('tracks', file, file.name));

            const [uploadRes, groupRes] = await Promise.all([
                apiBase.post<UploadAlbumResponse>('/uploadAlbum', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }),
                apiJson.get<{ id: string }[]>(`/groups?name=${encodeURIComponent(data.groupName)}`),
            ]);

            const upload = uploadRes.data;
            const groupId = groupRes.data[0]?.id;
            if (!groupId) throw new Error('Группа не найдена');

            // 2. Создаём локальный объект альбома
            const albumId = uuidv4();
            const newAlbum: Album = {
                id: albumId,
                name: data.title,
                groupId,
                cover: upload.coverUrl,
                description: data.description ?? '',
                createdAt: new Date().toISOString(),
                trackIds: [],
            };
            await apiJson.post<Album>('/albums', newAlbum);

            // 3. Параллельно создаём треки, сохраняем локально их объекты
            const createdTracks = await Promise.all(
                upload.tracksUrls.map(async (url, i) => {
                    const track: Track = {
                        id: uuidv4(), // временный id, потом заменим
                        title: data.tracks[i].title || extractTitle(url),
                        duration: data.tracks[i].duration,
                        cover: upload.coverUrl,
                        groupName: data.groupName,
                        albumId,
                        groupId,
                        genre: data.genre,
                        audioUrl: url,
                        createdAt: new Date().toISOString(),
                    };
                    const { data: created } = await apiJson.post<CreatedTrackResponse>(
                        '/tracks',
                        track,
                    );
                    return { ...track, id: created.id };
                }),
            );

            const trackIds = createdTracks.map((t) => t.id);
            // 4. Обновляем альбом на сервере и в стейте
            await apiJson.patch(`/albums/${albumId}`, { trackIds });

            // 5. Мгновенно пушим в Zustand-сторы
            useAlbumStore.getState().addAlbum({ ...newAlbum, trackIds });
            createdTracks.forEach((t) => useTrackStore.getState().addTrack(t));

            return upload;
        })(),
        {
            loading: 'Создание альбома...',
            success: 'Альбом и треки успешно загружены',
            error: (err: unknown) =>
                err instanceof Error ? err.message : 'Ошибка при создании альбома',
        },
    );
}
