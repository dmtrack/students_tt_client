import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from './App/components/Navigation';
import LogOut from './App/components/LogOut';
import { AdminPanel } from './App/layouts/AdminPanel';
import Login from './App/layouts/Login';
import { useAppDispatch, useAppSelector } from './App/hook/redux';
import { reconnect } from './App/store/actions/auth.actions';
import localStorageService from './App/services/localStorageService';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const userId = Number(localStorageService.getUserId());
    const isAuth = !!userId;

    useEffect(() => {
        dispatch(reconnect(userId));
    }, [isAuth]);

    return (
        <>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/login/:type?" element={<Login />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/logout" element={<LogOut />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
