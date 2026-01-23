export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    platform?: string;
    brand?: string;
    stock: number;
    rating?: number;
    reviews?: number;
    features?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface CartItem extends Product {
    quantity: number;
}
