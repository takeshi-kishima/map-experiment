/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Error } from '../models/Error';
import type { NewPet } from '../models/NewPet';
import type { Pet } from '../models/Pet';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Return Pets Data.
     *
     * @param tags tags to filter by
     * @param limit maximum number of results to return
     * @returns Pet pet response
     * @returns Error unexpected error
     * @throws ApiError
     */
    public static findPets(
        tags?: Array<string>,
        limit?: number,
    ): CancelablePromise<Array<Pet> | Error> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pets',
            query: {
                'tags': tags,
                'limit': limit,
            },
        });
    }

    /**
     * Creates a new pet in the store. Duplicates are allowed
     * @param requestBody Pet to add to the store
     * @returns Pet pet response
     * @returns Error unexpected error
     * @throws ApiError
     */
    public static addPet(
        requestBody: NewPet,
    ): CancelablePromise<Pet | Error> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pets',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
