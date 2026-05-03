import { Listing, InputProduct, Guide } from "./types";

export const LISTINGS: Listing[] = [
    {
        id: 'L1',
        title: 'Mixed Grade Maize',
        price: 320,
        unit: 'tonne',
        category: 'Grains',
        image: 'https://images.unsplash.com/photo-1551727041-5b347d65b633?w=800&q=80',
        sellerName: 'Phiri Farming Co.',
        province: 'Mashonaland Central',
        quantity: '50 tonnes',
        verified: true,
        description: 'Moisture content 12.5%. Available for collection or delivery.'
    },
    {
        id: 'L2',
        title: 'Grade A Onion Bulbs',
        price: 1.20,
        unit: 'kg',
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=800&q=80',
        sellerName: 'Mai Tadiwa',
        province: 'Manicaland',
        quantity: '500 kg',
        verified: false,
        description: 'Large, firm bulbs. Harvested yesterday.'
    },
    {
        id: 'L3',
        title: 'Brahman Cross Bulls',
        price: 1200,
        unit: 'head',
        category: 'Livestock',
        image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&q=80',
        sellerName: 'Gumbo Estates',
        province: 'Matabeleland South',
        quantity: '3 available',
        verified: true,
        description: '3-year-olds, healthy and vaccinated.'
    }
];

export const INPUTS: InputProduct[] = [
    {
        id: 'I1',
        name: 'SC719 Maize Seed',
        brand: 'Seed Co',
        price: 28,
        unit: '10kg bag',
        category: 'Seeds',
        image: 'https://images.unsplash.com/photo-1599590984817-036130403323?w=800&q=80',
        recommended: true,
        stock: 450
    },
    {
        id: 'I2',
        name: 'Compound D Fertiliser',
        brand: 'Windmill',
        price: 35,
        unit: '50kg bag',
        category: 'Fertiliser',
        image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&q=80',
        recommended: true,
        stock: 1200
    }
];

export const GUIDES: Guide[] = [
    {
        id: 'G1',
        title: 'Pfumvudza Scaling Tips',
        category: 'Crop Guides',
        summary: 'How to maximise yields on a small plot using climate-smart holing.',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80'
    },
    {
        id: 'G2',
        title: 'Fall Armyworm Control',
        category: 'Pest Control',
        summary: 'Identifying and managing FAW outbreaks in your maize fields.',
        readTime: '8 min',
        image: 'https://images.unsplash.com/photo-1558583055-d74059d8d346?w=800&q=80'
    }
];

export const PROVINCES = [
    'Harare',
    'Bulawayo',
    'Manicaland',
    'Mashonaland Central',
    'Mashonaland East',
    'Mashonaland West',
    'Masvingo',
    'Matabeleland North',
    'Matabeleland South',
    'Midlands'
];
