import toast from 'react-hot-toast';
import { useUserStore } from 'entities/User/model/slice/useUserStore';
import type { User } from 'entities/User/model/types/user';
import { apiJson } from 'shared/api';

export const likeGroup = async (groupId: string): Promise<void> => {
    const { authData, toggleLikeGroup } = useUserStore.getState();

    if (!authData) {
        toast.error('Войдите, чтобы лайкать');
        return;
    }
    // 1. Обновляем локально стор (лайки + рекомендации)
    toggleLikeGroup(groupId);
    // 2. Получаем актуальные данные после обновления
    const { authData: updatedUser } = useUserStore.getState();
    if (!updatedUser) return;
    const likedGroups = updatedUser.likedGroups ?? [];
    try {
        await apiJson.patch<Partial<User>>(`/users/${updatedUser.id}`, {
            likedGroups,
            recommendation: updatedUser.recommendation,
        });
        toast.success(
            likedGroups.includes(groupId) ? '❤️ Добавлено в избранное' : '💔 Убрано из избранного',
        );
    } catch {
        toast.error('Не удалось обновить лайк');
    }
};
