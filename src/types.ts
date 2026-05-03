/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
    id: string;
    name: string;
    price: number;
    unit: string;
    category: 'Fruits' | 'Vegetables' | 'Bundles' | 'Seasonal' | 'Offers';
    image: string;
    description: string;
    badge?: string;
    origin?: string;
    nutrition?: string[];
    featured?: boolean;
}

export interface CartItem extends Product {
    quantity: number;
    selectedUnit?: string;
}

export type View = 'home' | 'shop' | 'product-detail' | 'about' | 'specials' | 'checkout' | 'delivery' | 'payment' | 'confirmation';

export interface OrderDetails {
    name: string;
    address: string;
    phone: string;
    deliverySlot: string;
    paymentMethod: string;
}
