import toast from 'react-hot-toast';
import { useUserStore } from 'entities/User/model/slice/useUserStore';
import type { User } from 'entities/User/model/types/user';
import { apiJson } from 'shared/api';

export const likeAlbum = async (albumId: string): Promise<void> => {
    const { authData, toggleLikeAlbum } = useUserStore.getState();
    if (!authData) {
        toast.error('Войдите, чтобы лайкать');
        return;
    }
    // 1. Обновляем локально стор (лайки + рекомендации)
    toggleLikeAlbum(albumId);

    // 2. Получаем актуальные данные после обновления
    const { authData: updatedUser } = useUserStore.getState();
    if (!updatedUser) return;

    const likedAlbums = updatedUser.likedAlbums ?? [];
    try {
        await apiJson.patch<Partial<User>>(`/users/${updatedUser.id}`, {
            likedAlbums,
            recommendation: updatedUser.recommendation,
        });

        toast.success(
            likedAlbums.includes(albumId) ? '❤️ Добавлено в избранное' : '💔 Убрано из избранного',
        );
    } catch {
        toast.error('Не удалось обновить лайк');
    }
};
