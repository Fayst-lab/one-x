import { useState, useRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import { editGroupDescription, useGroupStore } from 'entities/Group';
import { likeGroup, useUserStore } from 'entities/User';

export function useGroup() {
    const { t } = useTranslation('group');

    const currentGroup = useGroupStore((s) => s.currentGroup);
    const setCurrentGroup = useGroupStore((s) => s.setCurrentGroup);
    const [saving, setSaving] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpenState] = useState(false);
    const [isEditing, setIsEditingState] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const likedGroups = useUserStore((state) => state.authData?.likedGroups ?? []);

    const desc = currentGroup?.description ?? '';
    const setDesc = (value: string) => {
        if (!currentGroup) return;
        setCurrentGroup({ ...currentGroup, description: value });
    };
    const toggleLikeGroup = useCallback(() => {
        if (!currentGroup?.id) {
            toast.error(t('albumNotSelected'));
            return;
        }

        likeGroup(currentGroup.id);
    }, [currentGroup?.id, t]);

    const onSave = useCallback(async () => {
        if (saving || !currentGroup) return;
        setSaving(true);
        try {
            await editGroupDescription(currentGroup.id, desc);
            setIsEditingState(false);
        } catch {
            toast.error(t('saveError'));
        } finally {
            setSaving(false);
        }
    }, [saving, currentGroup, t]);

    const onDelete = useCallback(async () => {
        if (!currentGroup) {
            toast.error(t('groupNotSelected'));
            return;
        }

        try {
            // await deleteGroup(currentGroup.id);
            setCurrentGroup(null);
            toast.success(t('groupDeleted'));
        } catch {
            toast.error(t('deleteError'));
        } finally {
            setIsDeleteModalOpenState(false);
        }
    }, [currentGroup, setCurrentGroup, t]);

    const setIsDeleteModalOpen = useCallback((val: boolean) => {
        setIsDeleteModalOpenState(val);
    }, []);

    const setIsEditing = useCallback((val: boolean) => {
        setIsEditingState(val);
    }, []);

    return useMemo(
        () => ({
            currentGroup,
            saving,
            isDeleteModalOpen,
            setIsDeleteModalOpen,
            isEditing,
            setIsEditing,
            onSave,
            toggleLikeGroup,
            onDelete,
            fileInputRef,
            desc,
            setDesc,
            likedGroups,
        }),
        [
            currentGroup,
            saving,
            isDeleteModalOpen,
            setIsDeleteModalOpen,
            isEditing,
            setIsEditing,
            onSave,
            onDelete,
            fileInputRef,
            desc,
            setDesc,
            likedGroups,
        ],
    );
}
