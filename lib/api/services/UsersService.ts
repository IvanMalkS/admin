/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserCreate } from '../models/UserCreate';
import type { UserSchema } from '../models/UserSchema';
import type { UserUpdate } from '../models/UserUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Create User
     * Create a new user.
     * @param requestBody
     * @returns UserSchema Successful Response
     * @throws ApiError
     */
    public static createUserUsersPost(
        requestBody: UserCreate,
    ): CancelablePromise<UserSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * List Users
     * Retrieve a list of all users.
     * @param limit
     * @param offset
     * @returns UserSchema Successful Response
     * @throws ApiError
     */
    public static listUsersUsersGet(
        limit: number = 100,
        offset?: number,
    ): CancelablePromise<Array<UserSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get User
     * Retrieve a single user by ID.
     * @param userId
     * @returns UserSchema Successful Response
     * @throws ApiError
     */
    public static getUserUsersUserIdGet(
        userId: number,
    ): CancelablePromise<UserSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update User
     * Update an existing user by ID.
     * @param userId
     * @param xAdminPassword
     * @param requestBody
     * @returns UserSchema Successful Response
     * @throws ApiError
     */
    public static updateUserUsersUserIdPut(
        userId: number,
        xAdminPassword: string,
        requestBody: UserUpdate,
    ): CancelablePromise<UserSchema> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            headers: {
                'x-admin-password': xAdminPassword,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete User
     * Delete a user by ID.
     * @param userId
     * @param xAdminPassword
     * @returns void
     * @throws ApiError
     */
    public static deleteUserUsersUserIdDelete(
        userId: number,
        xAdminPassword: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            headers: {
                'x-admin-password': xAdminPassword,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
