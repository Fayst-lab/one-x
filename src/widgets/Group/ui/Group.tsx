import { type FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListAlbum } from 'entities/Album';
import { ListTrack } from 'entities/Track';
import { ConfirmDeleteModal, EntityHeader, Text } from 'shared/ui';
import { useGroup } from '../model/useGroup';

export const Group: FC = memo(() => {
    const { t } = useTranslation('group');
    const {
        currentGroup,
        isEditing,
        saving,
        isDeleteModalOpen,
        setIsEditing,
        onSave,
        toggleLikeGroup,
        setIsDeleteModalOpen,
        desc,
        setDesc,
        likedGroups,
    } = useGroup();

    if (!currentGroup) return null;

    const isLiked = likedGroups.includes(currentGroup.id);
    const a = () => {};
    return (
        <div className="relative flex flex-col gap-1 py-6 px-20 text-white min-h-[400px]">
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={a}
            />
            <EntityHeader
                entity={currentGroup}
                isEditing={isEditing}
                saving={saving}
                desc={desc}
                onChangeDesc={setDesc}
                onSaveDesc={onSave}
                onStartEdit={() => setIsEditing(true)}
                onToggleLike={toggleLikeGroup}
                t={t}
                className="pb-2"
                isLiked={isLiked}
                onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
            />

            {/* Синглы */}
            <div className="mt-12">
                <Text className="text-2xl font-semibold mb-4 text-white text-center">
                    {t('singles')}
                </Text>
                <ListTrack albumId={null} albumName="" />
            </div>

            {/* Альбомы */}
            <div className="mt-12">
                <Text className="text-2xl font-semibold mb-4 text-white text-center">
                    {t('albums')}
                </Text>
                <ListAlbum />
            </div>
        </div>
    );
});

Group.displayName = 'Group';
