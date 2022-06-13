/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NewPet } from './NewPet';

export type Pet = (NewPet & {
    id: number;
});

