import React, { Suspense, useEffect } from 'react';
import './i18n';
import { Routes, Route } from 'react-router-dom';
import LogOut from './components/LogOut';
import { AdminPanel } from './scenes/adminPanel/AdminPanel';
import Login from './scenes/auth/Login';
import { useAppDispatch, useAppSelector } from './hook/redux';
import { reconnect } from './state/actions/auth.actions';
import localStorageService from './services/localStorageService';
import { useTranslation } from 'react-i18next';
import Home from './scenes/home/Home';
import Collection from './scenes/collection/collectionPage';
import UserPage from './scenes/userPage/userPage';
import { ScrollToTop } from './utils/scrollToTop';
import ItemPage from './scenes/itemDetailsPage/Itempage';
import NotfoundPage from './components/NotfoundPage';
import { Layout } from './components/Layout';

const App: React.FC = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    const dispatch = useAppDispatch();
    const userId = Number(localStorageService.getUserId());
    const { isAuth } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isAuth && userId) dispatch(reconnect(userId));
    }, [isAuth]);

    return (
        <Suspense fallback={null}>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route
                        path='collection/:collectionId'
                        element={<Collection />}
                    />
                    <Route path='item/:itemId/' element={<ItemPage />} />
                    <Route path='user/:userId' element={<UserPage />} />
                    <Route path='login/:type?' element={<Login />} />
                    <Route path='admin' element={<AdminPanel />} />
                    <Route path='logout' element={<LogOut />} />
                    <Route path='*' element={<NotfoundPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
