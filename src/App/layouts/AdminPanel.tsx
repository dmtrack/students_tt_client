import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { UsersList } from '../components/Userslist';
import { useAppDispatch, useAppSelector } from '../hook/redux';

import { fetchUsers } from '../store/actions/userActions';

export function AdminPanel() {
    const dispatch = useAppDispatch();
    const { users, usersLoading, error } = useAppSelector(
        (state) => state.users
    );

    const { isAuth } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchUsers());
        }
    }, []);

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth]);

    return (
        <>
            {usersLoading && <p className="text-center text-lg">Loading...</p>}
            {error && (
                <p className="pt-10 text-center text-lg text-red-500">
                    {error}
                </p>
            )}
            {isAuth ? (
                <div className="container mx-auto  pt-5">
                    <UsersList usersProps={users} />
                </div>
            ) : (
                navigate('/login')
            )}
        </>
    );
}
