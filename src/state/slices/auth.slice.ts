import { IUserAuthResponse } from './../../models/response/authResponse';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccess } from '../../models/IUser';
import { IError } from '../../models/response/authResponse';
import localStorageService from '../../services/localStorageService';

interface IAuthState {
    userId: number;
    isAuth: boolean;
    access: IAccess;
    name: string;
    avatarUrl: string;
    error: string;
}

const initialState: IAuthState = {
    userId: 0,
    isAuth: Boolean(localStorageService.getUserId() ?? ''),
    name: '',
    access: { id: 0, access: '', userId: 0 },
    avatarUrl: '',
    error: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUserAuthResponse>) {
            state.userId = action.payload.user.id;
            state.access = action.payload.user.access;
            state.avatarUrl = action.payload.user.avatarUrl;
            state.isAuth = true;
            localStorageService.setUser(
                action.payload.user.id,
                action.payload.user.access.access
            );
        },
        fetchError(state, action) {
            state.error = action.payload.message;
        },
        userLoggedOut(state) {
            state.isAuth = false;
            state.userId = 0;
        },
    },
});

export default authSlice.reducer;
