/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionCreate } from '../models/SessionCreate';
import type { SessionResponse } from '../models/SessionResponse';
import type { SessionUpdate } from '../models/SessionUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SessionsService {
    /**
     * Create Session
     * Create a new session.
     * @param requestBody
     * @returns SessionResponse Successful Response
     * @throws ApiError
     */
    public static createSessionSessionsPost(
        requestBody: SessionCreate,
    ): CancelablePromise<SessionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sessions/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * List Sessions
     * Retrieve a list of all sessions.
     * @param limit
     * @param offset
     * @returns SessionResponse Successful Response
     * @throws ApiError
     */
    public static listSessionsSessionsGet(
        limit: number = 100,
        offset?: number,
    ): CancelablePromise<Array<SessionResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sessions/',
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
     * Get Session
     * Retrieve a single session by ID.
     * @param sessionId
     * @returns SessionResponse Successful Response
     * @throws ApiError
     */
    public static getSessionSessionsSessionIdGet(
        sessionId: number,
    ): CancelablePromise<SessionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sessions/{session_id}',
            path: {
                'session_id': sessionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Session
     * Update an existing session by ID.
     * @param sessionId
     * @param xAdminPassword
     * @param requestBody
     * @returns SessionResponse Successful Response
     * @throws ApiError
     */
    public static updateSessionSessionsSessionIdPut(
        sessionId: number,
        xAdminPassword: string,
        requestBody: SessionUpdate,
    ): CancelablePromise<SessionResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/sessions/{session_id}',
            path: {
                'session_id': sessionId,
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
     * Delete Session
     * Delete a session by ID.
     * @param sessionId
     * @param xAdminPassword
     * @returns void
     * @throws ApiError
     */
    public static deleteSessionSessionsSessionIdDelete(
        sessionId: number,
        xAdminPassword: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/sessions/{session_id}',
            path: {
                'session_id': sessionId,
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
