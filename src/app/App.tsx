import { useEffect, Suspense, lazy, useState } from 'react';
import { AppRouter } from './providers/routes';
import { Sidebar } from 'widgets/Sidebar';
import { useThemeStore } from 'shared/config/theme/themeStore';
import { Player } from 'features/Player';
import { getUserFromToken, useUserStore } from 'entities/User';
import { fetchGroup, useGroupStore } from 'entities/Group';

const AuthModal = lazy(() => import('widgets/AuthModal'));

function App() {
    const user = useUserStore((s) => s.authData);
    const theme = useThemeStore((s) => s.theme);
    const setCurrentGroup = useGroupStore((s) => s.setCurrentGroup);
    const [loadingGroup, setLoadingGroup] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        (async () => {
            const user = await getUserFromToken();
            if (user) useUserStore.getState().setAuthData(user);
        })();
    }, [user?.id]);
    useEffect(() => {
        if (!user) return;
        (async () => {
            setLoadingGroup(true);
            const groups = await fetchGroup(user.id);
            if (groups) setCurrentGroup(groups);
            setLoadingGroup(false);
        })();
    }, [user?.id, setCurrentGroup]);

    if (!user)
        return (
            <Suspense fallback={null}>
                <AuthModal
                    isOpen={true}
                    onClose={() => {}}
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                />
            </Suspense>
        );

    if (loadingGroup) return <div>Загрузка данных группы...</div>;

    return (
        <div
            style={{
                backgroundColor: theme['--bg-color'],
                minHeight: '100vh',
                width: '100vw',
                overflowX: 'hidden',
            }}
        >
            <Sidebar />
            <main className="content-page pl-24 pr-6 pt-6">
                <AppRouter />
            </main>
            <Player />
        </div>
    );
}

export default App;
