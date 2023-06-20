export interface House {
    home_id?: number;
    street: string;
    zip: string;
    sq_ft: number;
    num_of_bed: number;
    num_of_bath: number;
    year_built: number;
    lat: number;
    lng: number;
    city_name?: string;
    city_id?: number;
}

export interface City {
    city_id?: number;
    state_id?: number;
    city_name: string;
    state: string;
}

export interface Region {
    region_id?: number,
    region_name: string,
    cities: string[]
    region_description: string
}

export interface State {
    state_id?: number;
    name: string;
}

export interface ZillowEstimate {
    zillow_price_id?: number;
    zestimate: number;
    date: string;
    home_id: number;
  }