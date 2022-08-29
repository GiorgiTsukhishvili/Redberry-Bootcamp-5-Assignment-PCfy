export interface Laptops {
  laptop: {
    id: number;
    image: string;
    name: string;
  };
  user: { name: string; surname: string };
}

export interface SingleLaptop {
  laptop: {
    brand_id: number;
    cpu_id: number;
    hard_drive_type: string;
    image: string;
    name: string;
    price: number;
    purchase_date: string;
    ram: number;
    state: string;
  };
  user: {
    email: string;
    name: string;
    phone_number: string;
    position_id: number;
    surname: string;
    team_id: number;
  };
}

export interface LaptopData {
  laptop: {
    brand_id: number;
    cpu: {
      cores: number;
      name: string;
      threads: number;
    };
    hard_drive_type: string;
    image: string;
    name: string;
    price: number;
    purchase_date: string;
    ram: number;
    state: string;
  };
  user: {
    email: string;
    name: string;
    phone_number: string;
    position_id: number;
    surname: string;
    team_id: number;
  };
}

export interface OnlyLaptop {
  brand_id: number;
  cpu: {
    cores: number;
    name: string;
    threads: number;
  };
  hard_drive_type: string;
  image: string;
  name: string;
  price: number;
  purchase_date: string;
  ram: number;
  state: string;
}

export interface Team {
  id: number;
  name: string;
}

export interface Position {
  id: number;
  name: string;
  team_id: number;
}

export interface Brand {
  id: number;
  name: string;
}
