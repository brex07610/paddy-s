/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'EN' | 'SN' | 'ND';

export interface Listing {
    id: string;
    title: string;
    price: number;
    unit: string;
    category: 'Grains' | 'Vegetables' | 'Fruits' | 'Livestock' | 'Dairy' | 'Tobacco' | 'Cotton' | 'Other';
    image: string;
    sellerName: string;
    province: string;
    quantity: string;
    verified: boolean;
    description: string;
}

export interface InputProduct {
    id: string;
    name: string;
    brand: string;
    price: number;
    unit: string;
    category: 'Seeds' | 'Fertiliser' | 'Chemicals' | 'Tools' | 'Livestock';
    image: string;
    recommended: boolean;
    stock: number;
}

export interface Guide {
    id: string;
    title: string;
    category: string;
    summary: string;
    readTime: string;
    image: string;
    videoUrl?: string;
}

export interface WeatherData {
    temp: number;
    rainProb: number;
    condition: 'Sunny' | 'Rainy' | 'Cloudy' | 'Stormy';
    safety: 'Green' | 'Amber' | 'Red';
}

export type View = 'home' | 'marketplace' | 'shop' | 'knowledge' | 'weather' | 'finance' | 'community' | 'programs' | 'register' | 'profile';

export interface FarmerProfile {
    name: string;
    phone: string;
    province: string;
    district: string;
    farmSize: number;
    crops: string[];
}
