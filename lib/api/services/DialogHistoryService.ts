/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DialogHistoryCreate } from '../models/DialogHistoryCreate';
import type { DialogHistoryResponse } from '../models/DialogHistoryResponse';
import type { DialogHistoryUpdate } from '../models/DialogHistoryUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DialogHistoryService {
    /**
     * Create Dialog History
     * Create a new dialog history entry.
     * @param requestBody
     * @returns DialogHistoryResponse Successful Response
     * @throws ApiError
     */
    public static createDialogHistoryDialogHistoryPost(
        requestBody: DialogHistoryCreate,
    ): CancelablePromise<DialogHistoryResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dialog_history/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * List Dialog History
     * Retrieve a list of all dialog history entries.
     * @param limit
     * @param offset
     * @returns DialogHistoryResponse Successful Response
     * @throws ApiError
     */
    public static listDialogHistoryDialogHistoryGet(
        limit: number = 100,
        offset?: number,
    ): CancelablePromise<Array<DialogHistoryResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dialog_history/',
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
     * Get Dialog History
     * Retrieve a single dialog history entry by ID.
     * @param dialogHistoryId
     * @returns DialogHistoryResponse Successful Response
     * @throws ApiError
     */
    public static getDialogHistoryDialogHistoryDialogHistoryIdGet(
        dialogHistoryId: number,
    ): CancelablePromise<DialogHistoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dialog_history/{dialog_history_id}',
            path: {
                'dialog_history_id': dialogHistoryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Dialog History
     * Update an existing dialog history entry by ID.
     * @param dialogHistoryId
     * @param xAdminPassword
     * @param requestBody
     * @returns DialogHistoryResponse Successful Response
     * @throws ApiError
     */
    public static updateDialogHistoryDialogHistoryDialogHistoryIdPut(
        dialogHistoryId: number,
        xAdminPassword: string,
        requestBody: DialogHistoryUpdate,
    ): CancelablePromise<DialogHistoryResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/dialog_history/{dialog_history_id}',
            path: {
                'dialog_history_id': dialogHistoryId,
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
     * Delete Dialog History
     * Delete a dialog history entry by ID.
     * @param dialogHistoryId
     * @param xAdminPassword
     * @returns void
     * @throws ApiError
     */
    public static deleteDialogHistoryDialogHistoryDialogHistoryIdDelete(
        dialogHistoryId: number,
        xAdminPassword: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/dialog_history/{dialog_history_id}',
            path: {
                'dialog_history_id': dialogHistoryId,
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
