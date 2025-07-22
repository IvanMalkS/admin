/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FAQCreate } from '../models/FAQCreate';
import type { FAQResponse } from '../models/FAQResponse';
import type { FAQUpdate } from '../models/FAQUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FaQsService {
    /**
     * Create Faq
     * Create a new FAQ entry.
     * @param xAdminPassword
     * @param requestBody
     * @returns FAQResponse Successful Response
     * @throws ApiError
     */
    public static createFaqFaqsPost(
        xAdminPassword: string,
        requestBody: FAQCreate,
    ): CancelablePromise<FAQResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/faqs/',
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
     * List Faqs
     * Retrieve a list of all FAQ entries.
     * @param limit
     * @param offset
     * @returns FAQResponse Successful Response
     * @throws ApiError
     */
    public static listFaqsFaqsGet(
        limit: number = 100,
        offset?: number,
    ): CancelablePromise<Array<FAQResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/faqs/',
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
     * Get Faq
     * Retrieve a single FAQ entry by ID.
     * @param faqId
     * @returns FAQResponse Successful Response
     * @throws ApiError
     */
    public static getFaqFaqsFaqIdGet(
        faqId: number,
    ): CancelablePromise<FAQResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/faqs/{faq_id}',
            path: {
                'faq_id': faqId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Faq
     * Update an existing FAQ entry by ID.
     * @param faqId
     * @param xAdminPassword
     * @param requestBody
     * @returns FAQResponse Successful Response
     * @throws ApiError
     */
    public static updateFaqFaqsFaqIdPut(
        faqId: number,
        xAdminPassword: string,
        requestBody: FAQUpdate,
    ): CancelablePromise<FAQResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/faqs/{faq_id}',
            path: {
                'faq_id': faqId,
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
     * Delete Faq
     * Delete an FAQ entry by ID.
     * @param faqId
     * @param xAdminPassword
     * @returns void
     * @throws ApiError
     */
    public static deleteFaqFaqsFaqIdDelete(
        faqId: number,
        xAdminPassword: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/faqs/{faq_id}',
            path: {
                'faq_id': faqId,
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
