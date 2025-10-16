import type { User } from 'entities/User';
import { apiJson } from 'shared/api';

export const getUserFromToken = async (): Promise<User | null> => {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    try {
        const [, email] = atob(token).split(':');
        const { data } = await apiJson.get<User[]>('/users', { params: { email } });
        return data[0] ?? null;
    } catch (e) {
        console.error('Ошибка чтения токена', e);
        return null;
    }
};
