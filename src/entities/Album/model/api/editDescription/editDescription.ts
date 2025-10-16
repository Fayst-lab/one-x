import toast from 'react-hot-toast';
import { useAlbumStore } from '../../slice/useAlbumStore';
import { apiJson } from 'shared/api';

export async function editDescription(albumId: string, description: string): Promise<void> {
    try {
        const res = await apiJson.patch(`/albums/${albumId}`, { description });

        const { setCurrentAlbum } = useAlbumStore.getState();

        setCurrentAlbum(res.data);

        toast.success('Описание успешно обновлено');
    } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Ошибка при обновлении описания');
    }
}
