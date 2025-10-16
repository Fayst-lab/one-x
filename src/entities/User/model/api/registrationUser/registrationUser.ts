import type { User } from 'entities/User';
import { useUserStore } from 'entities/User/model/slice/useUserStore';
import toast from 'react-hot-toast';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { apiJson } from 'shared/api';

interface RegistrationProps {
    email: string;
    password: string;
}

export const registrationUser = async ({
    email,
    password,
}: RegistrationProps): Promise<User | null> =>
    toast
        .promise(
            (async () => {
                const { data: existing } = await apiJson.get<User[]>('/users', {
                    params: { email },
                });
                if (existing.length) throw new Error('Пользователь с таким email уже существует');

                const newUser: User = {
                    id: uuidv4(),
                    email,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                    avatar: '',
                    username: '',
                    createdAt: new Date().toISOString(),
                };

                const { data } = await apiJson.post<User>('/users', newUser);
                if (!data) throw new Error('Ошибка при создании пользователя');

                localStorage.setItem('access_token', btoa(`${data.id}:${data.email}`));
                useUserStore.getState().setAuthData(data);

                return data;
            })(),
            {
                loading: 'Регистрация...',
                success: 'Вы успешно зарегистрировались',
                error: (err) => (err instanceof Error ? err.message : 'Ошибка при регистрации'),
            },
        )
        .catch(() => null);
