/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoleCreate } from '../models/RoleCreate';
import type { RoleResponse } from '../models/RoleResponse';
import type { RoleUpdate } from '../models/RoleUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RolesService {
    /**
     * Create Role
     * Create a new role.
     * @param xAdminPassword
     * @param requestBody
     * @returns RoleResponse Successful Response
     * @throws ApiError
     */
    public static createRoleRolesPost(
        xAdminPassword: string,
        requestBody: RoleCreate,
    ): CancelablePromise<RoleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/roles/',
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
     * List Roles
     * Retrieve a list of all roles.
     * @param limit
     * @param offset
     * @returns RoleResponse Successful Response
     * @throws ApiError
     */
    public static listRolesRolesGet(
        limit: number = 100,
        offset?: number,
    ): CancelablePromise<Array<RoleResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/roles/',
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
     * Get Role
     * Retrieve a single role by ID.
     * @param roleId
     * @returns RoleResponse Successful Response
     * @throws ApiError
     */
    public static getRoleRolesRoleIdGet(
        roleId: number,
    ): CancelablePromise<RoleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/roles/{role_id}',
            path: {
                'role_id': roleId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Role
     * Update an existing role by ID.
     * @param roleId
     * @param xAdminPassword
     * @param requestBody
     * @returns RoleResponse Successful Response
     * @throws ApiError
     */
    public static updateRoleRolesRoleIdPut(
        roleId: number,
        xAdminPassword: string,
        requestBody: RoleUpdate,
    ): CancelablePromise<RoleResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/roles/{role_id}',
            path: {
                'role_id': roleId,
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
     * Delete Role
     * Delete a role by ID.
     * @param roleId
     * @param xAdminPassword
     * @returns void
     * @throws ApiError
     */
    public static deleteRoleRolesRoleIdDelete(
        roleId: number,
        xAdminPassword: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/roles/{role_id}',
            path: {
                'role_id': roleId,
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
