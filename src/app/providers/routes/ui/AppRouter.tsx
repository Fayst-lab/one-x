// src/providers/routes/AppRouter.tsx
import { memo, Suspense, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLoader from 'shared/ui/PageLoader/PageLoader';
import { routeConfig, type AppRoutesProps } from 'shared/config/routeConfig/routeConfig';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">{route.element}</div>
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
