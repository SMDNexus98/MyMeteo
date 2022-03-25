export class Business {
    alias: string;
    display_phone: string;
    distance: number;
    id: string;
    image_url: string;
    is_closed: boolean;
    name: string;
    phone: string;
    rating: number;
    review_count: number;
    transactions: any;
    url: string;
    categories: Array<Categories>;
    coordinates: Coordinates;
    location: Location;
}

export interface Categories {
    alias: string;
    title: string;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Location {
    address1: string;
    address2: string;
    address3: string;
    city: string;
    country: string;
    state: string;
    zip_code: string;
    display_address: Array<string>;
}