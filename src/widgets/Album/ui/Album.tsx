// src/pages/Album/ui/Album.tsx
import React from 'react';
import { Button, ConfirmDeleteModal, EntityHeader } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { ListTrack } from 'entities/Track';
import { useAlbum } from '../model/useAlbum';

const AlbumComponent: React.FC = () => {
    const { t } = useTranslation('album');
    const {
        currentAlbum,
        desc,
        setDesc,
        saving,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        isEditing,
        setIsEditing,
        onSave,
        onDelete,
        fileInputRef,
        toggleLikeAlbum,
        openFileDialog,
        onFileChange,
        likedAlbums,
    } = useAlbum();

    if (!currentAlbum) {
        return <div className="p-4 text-center text-gray-500">{t('notSelected')}</div>;
    }

    const isLiked = likedAlbums.includes(currentAlbum.id);

    return (
        <div className="relative flex flex-col gap-1 py-6 px-20 text-white min-h-[400px]">
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={onDelete}
            />

            <EntityHeader
                entity={currentAlbum}
                desc={desc}
                isEditing={isEditing}
                isLiked={isLiked}
                saving={saving}
                onToggleLike={toggleLikeAlbum}
                onStartEdit={() => setIsEditing(true)}
                onChangeDesc={setDesc}
                onSaveDesc={onSave}
                t={t}
                className="pb-2"
                onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
            />

            <div className="flex justify-between px-4 mt-4">
                <div />
                <div className="flex flex-col justify-end">
                    <Button type="button" onClick={openFileDialog}>
                        {t('uploadTrack')}
                    </Button>
                    <input
                        type="file"
                        accept="audio/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={onFileChange}
                    />
                </div>
            </div>

            <div className="flex justify-center overflow-auto flex-grow mt-10 h-full">
                <ListTrack albumId={currentAlbum.id} albumName={currentAlbum.name} />
            </div>
        </div>
    );
};

export const Album = React.memo(AlbumComponent);
