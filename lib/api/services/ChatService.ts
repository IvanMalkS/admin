/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatRequest } from '../models/ChatRequest';
import type { ChatResponse } from '../models/ChatResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChatService {
    /**
     * Chat With Ai
     * @param requestBody
     * @returns ChatResponse Successful Response
     * @throws ApiError
     */
    public static chatWithAiChatPost(
        requestBody: ChatRequest,
    ): CancelablePromise<ChatResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/chat/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Welcome Video
     * Retrieves the welcome video for a given role.
     * This is a placeholder. In a real scenario, this would trigger D-ID video generation
     * or retrieve a pre-generated video URL.
     * @param roleId
     * @returns ChatResponse Successful Response
     * @throws ApiError
     */
    public static getWelcomeVideoChatWelcomeVideoRoleIdGet(
        roleId: number,
    ): CancelablePromise<ChatResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chat/welcome_video/{role_id}',
            path: {
                'role_id': roleId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
