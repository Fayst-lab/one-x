import type { FC } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Button, Input, Like, PlayButton, Text, ButtonTheme } from 'shared/ui';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import clsx from 'clsx';
import type { Album } from 'entities/Album';
import type { Group } from 'entities/Group';

interface EntityHeaderProps {
    entity: Album | Group;
    desc?: string;
    isEditing?: boolean;
    isLiked: boolean;
    saving?: boolean;
    onToggleLike?: () => void;
    onStartEdit?: () => void;
    onChangeDesc?: (value: string) => void;
    onSaveDesc?: () => void;
    t: (key: string, options?: Record<string, string>) => string;
    className?: string;
    onOpenDeleteModal: () => void;
}

export const EntityHeader: FC<EntityHeaderProps> = ({
    entity,
    desc,
    isEditing,
    isLiked,
    saving,
    onToggleLike,
    onStartEdit,
    onChangeDesc,
    onSaveDesc,
    t,
    onOpenDeleteModal,
    className,
}) => {
    const isAlbum = (e: Album | Group): e is Album => 'groupId' in e;

    return (
        <div className={clsx('flex items-start gap-6 px-4 py-3 h-64', className)}>
            <Button
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                onClick={onOpenDeleteModal}
                aria-label={t('deleteAlbum')}
            >
                <FiTrash size={22} />
            </Button>

            <img
                src={entity.cover}
                alt={entity.name}
                className="w-64 h-64 object-cover rounded-md shadow-lg"
            />

            <div className="flex flex-col justify-center self-center h-full max-w-[450px]">
                <Text className="text-4xl font-bold">{entity.name}</Text>

                {entity.createdAt && (
                    <Text className="mt-4 text-gray-400 text-sm">
                        {t('created', { date: formatDate(entity.createdAt) })}
                    </Text>
                )}
                {entity.updatedAt && (
                    <Text className="text-gray-400 text-sm">
                        {t('updated', { date: formatDate(entity.updatedAt) })}
                    </Text>
                )}

                <div className="mt-4 flex items-start gap-2 w-full">
                    {!isEditing ? (
                        <div className="flex items-start gap-2 flex-1">
                            <Text className="text-gray-300 whitespace-pre-wrap break-words">
                                {desc || t('noDescription')}
                            </Text>
                            <Button
                                onClick={onStartEdit}
                                aria-label={t('editDescription')}
                                className="text-gray-400 hover:text-white p-1 transition-colors"
                            >
                                <FiEdit size={20} />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-start gap-2 w-full">
                            <Input
                                className="flex-1 rounded-md p-2 text-black resize-y"
                                value={desc}
                                onChange={(e) => onChangeDesc?.(e.target.value)}
                                disabled={saving}
                            />
                            <Button onClick={onSaveDesc} disabled={saving}>
                                {saving ? t('saving') : t('save')}
                            </Button>
                        </div>
                    )}
                </div>

                <div className="mt-4 flex items-center gap-2">
                    {isAlbum(entity) && (
                        <PlayButton
                            theme={ButtonTheme.OUTLINE}
                            albumForPlay={entity}
                            trackForPlay={null}
                        />
                    )}
                    {!isAlbum(entity) && (
                        <PlayButton theme={ButtonTheme.OUTLINE} trackForPlay={null} groupForPlay />
                    )}
                    <Like liked={isLiked} onToggle={onToggleLike} />
                </div>
            </div>
        </div>
    );
};
