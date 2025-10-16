import React, { useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGroupStore } from 'entities/Group';
import { fetchTrack } from '../model/api/fetchTrack/fetchTrack';
import { useTrackStore } from '../model/slice/useTrackStore';
import { Button, ButtonSize, ButtonTheme, Skeleton, Text } from 'shared/ui';
import { TrackItem } from './TrackItem';

interface ListTrackProps {
    albumId: string | null;
    albumName: string;
}

export const ListTrack: React.FC<ListTrackProps> = ({ albumId, albumName }) => {
    const { t } = useTranslation('listTrack');
    const navigate = useNavigate();
    const currentGroup = useGroupStore((s) => s.currentGroup);
    const { tracks, singlesTrack, loading, setTracks, setLoading } = useTrackStore();

    useEffect(() => {
        if (!currentGroup) return;

        setTracks([]);
        setLoading(true);

        fetchTrack(currentGroup.id, currentGroup.name, albumId ?? '', albumName).finally(() =>
            setLoading(false),
        );
    }, [currentGroup, albumId, albumName, setTracks, setLoading]);

    // Выбираем массив для отображения
    const filtered = useMemo(() => {
        if (albumId === null) {
            // Отображаем синглы, если albumId нет
            return singlesTrack;
        } else {
            // Иначе фильтруем треки по albumId
            return tracks.filter((tr) => tr.albumId === albumId);
        }
    }, [tracks, singlesTrack, albumId]);

    const onAdd = useCallback(() => navigate('/my_group/add_track'), [navigate]);

    if (!currentGroup) return <Text text={t('noGroup')} className="text-center text-gray-500" />;

    return (
        <div className="flex flex-col flex-grow h-full min-h-0">
            <div className="flex-grow overflow-y-auto pr-2 space-y-4 min-h-0">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <Skeleton className="w-20 h-20 rounded-lg" />
                            <div className="flex-grow space-y-2">
                                <Skeleton className="h-4 w-1/2 rounded" />
                                <Skeleton className="h-4 w-1/3 rounded" />
                            </div>
                        </div>
                    ))
                ) : filtered.length > 0 ? (
                    filtered.map((track) => (
                        <TrackItem key={track.id} track={track} groupName={currentGroup.name} />
                    ))
                ) : (
                    <Text text={t('noTracks')} className="text-center text-gray-500" />
                )}
            </div>

            <div className="sticky bottom-0 w-full bg-inherit pt-2 pb-4 flex justify-center">
                <Button theme={ButtonTheme.OUTLINE} size={ButtonSize.L} onClick={onAdd}>
                    {t('addTrack')}
                </Button>
            </div>
        </div>
    );
};
