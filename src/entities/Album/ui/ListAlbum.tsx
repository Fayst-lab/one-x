// src/entities/Album/ui/ListAlbum.tsx
import React, { memo } from 'react';
import { ButtonTheme, Text, Skeleton, Like, PlayButton } from 'shared/ui';
import { useListAlbum } from '../model/useListAlbum';
import { likeAlbum } from 'entities/User';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import { FiPlus } from 'react-icons/fi';

const ListAlbumComponent: React.FC = () => {
    const { t, currentGroup, albums, authData, loading, onAddAlbumClick, onAlbumClick } =
        useListAlbum();

    if (!currentGroup) {
        return <div className="text-center text-gray-500">{t('noGroup')}</div>;
    }

    if (loading) {
        return (
            <div className="grid grid-cols-4 gap-8 justify-start">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="flex flex-col items-start">
                        <Skeleton className="w-40 h-40 rounded-xl" />
                        <Skeleton className="h-5 w-32 mt-3 rounded" />
                    </div>
                ))}
            </div>
        );
    }

    if (albums.length === 0) {
        return <div className="text-center text-gray-500">{t('noAlbums')}</div>;
    }

    return (
        <div className="grid grid-cols-4 gap-8 justify-start pr-2">
            {albums.map((album) => {
                const isLiked = authData?.likedAlbums?.includes(album.id) ?? false;

                return (
                    <div
                        key={album.id}
                        onClick={() => onAlbumClick(album.id)}
                        className="group relative flex flex-col items-start cursor-pointer"
                    >
                        <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={album.cover || '/assets/default-cover.png'}
                                alt={album.name}
                                className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity rounded-xl" />

                            {/* Оверлей с кнопками */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-4">
                                {/* Play (ролевой контейнер вместо button) */}
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // PlayButton внутри сам выполняет воспроизведение
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.stopPropagation();
                                            // PlayButton внутри сам выполняет воспроизведение
                                        }
                                    }}
                                    className="absolute mt-21 mr-18 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                >
                                    <PlayButton
                                        theme={ButtonTheme.OUTLINE}
                                        albumForPlay={album}
                                        trackForPlay={null}
                                    />
                                </div>

                                {/* Like (ролевой контейнер вместо button) */}
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        likeAlbum(album.id);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.stopPropagation();
                                            likeAlbum(album.id);
                                        }
                                    }}
                                    className="absolute mt-23 ml-20 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                >
                                    <Like liked={isLiked} />
                                </div>
                            </div>
                        </div>

                        <Text
                            text={album.name}
                            size="default"
                            className="mt-3 text-left break-words max-w-[160px]"
                        />
                        {album.createdAt && (
                            <Text
                                text={formatDate(album.createdAt)}
                                className="text-gray-400 mt-1"
                            />
                        )}
                    </div>
                );
            })}

            {/* карточка «Добавить альбом» */}
            <div
                onClick={onAddAlbumClick}
                className="flex flex-col items-center justify-center w-40 h-40 rounded-xl border-2 border-red-500 text-red-500 cursor-pointer hover:bg-red-50 transition-colors"
            >
                <FiPlus size={32} />
                <Text text={t('addAlbum')} size="small" className="mt-2" />
            </div>
        </div>
    );
};

export const ListAlbum = memo(ListAlbumComponent);
