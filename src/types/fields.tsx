import React from 'react'

import { TCredentials } from './index'

export type TStateAction = TCredentials

export type TCollection = {
    id: number;
    nombre: string;
}

export interface TNewCollection {
    value: number;
    label: string;
}

export type TOption = {
    id: number | string;
    label: string;
}