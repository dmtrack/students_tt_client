import { AuthorizationError } from './../models/errors/AuthorizationError';
import { IAuthData, ILoginData } from '../models/response/authResponse';
import { axiosGet, axiosPost, axiosUpdate } from '../api/axios/apiClient';
import { DataBaseError } from '../models/errors/DataBaseError';
import { IGetUserResponse } from '../models/IUser';
import { IUserAuthResponse } from '../models/response/authResponse';

export default class AuthService {
    static async register(data: IAuthData) {
        return axiosPost<AuthorizationError | DataBaseError, IUserAuthResponse>(
            '/user/registration',
            data
        );
    }

    static async login(data: ILoginData) {
        return axiosPost<AuthorizationError | DataBaseError, IUserAuthResponse>(
            '/user/login',
            data
        );
    }

    static async reconnect(id: number) {
        return axiosPost<AuthorizationError | DataBaseError, IUserAuthResponse>(
            '/user/reconnect',
            { id }
        );
    }
}
