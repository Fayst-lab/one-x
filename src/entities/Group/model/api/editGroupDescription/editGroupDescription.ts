import toast from 'react-hot-toast';
import { apiJson } from 'shared/api';
import { useGroupStore, type Group } from 'entities/Group';

export async function editGroupDescription(groupId: string, description: string): Promise<void> {
    try {
        const res = await apiJson.patch<Group>(`/groups/${groupId}`, { description });

        const { setCurrentGroup } = useGroupStore.getState();
        setCurrentGroup(res.data);

        toast.success('Описание успешно обновлено');
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : 'Произошла ошибка при обновлении описания';
        toast.error(message);
    }
}
