import type { User } from 'entities/User';
import { useUserStore } from 'entities/User/model/slice/useUserStore';
import toast from 'react-hot-toast';
import bcrypt from 'bcryptjs';
import { apiJson } from 'shared/api';

interface LoginProps {
    email: string;
    password: string;
}

export const loginUser = async ({ email, password }: LoginProps): Promise<User | null> =>
    toast
        .promise(
            (async () => {
                const { data } = await apiJson.get<User[]>('/users', { params: { email } });
                const user = data[0];
                if (!user) throw new Error('Пользователь с таким email не найден');
                if (!bcrypt.compareSync(password, user.password))
                    throw new Error('Неверный пароль');

                localStorage.setItem('access_token', btoa(`${user.id}:${user.email}`));
                useUserStore.getState().setAuthData(user);
                return user;
            })(),
            {
                loading: 'Вход в систему...',
                success: 'Вы успешно вошли',
                error: (err) => (err instanceof Error ? err.message : 'Ошибка при входе'),
            },
        )
        .catch(() => null);
