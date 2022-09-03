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

export interface ComputerDetailsTopProps {
  singleName: string;
  teamName: string | undefined;
  positionName: string | undefined;
  singleEmail: string;
  singlePhone: string;
  singleImg: string;
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

export interface CPU {
  id: number;
  name: string;
}

export interface CPUModified {
  value: string;
  label: string;
}

export interface TeamModified {
  value: string;
  label: string;
}

export interface BrandModified {
  value: string;
  label: string;
}

export interface UseForm {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  team_id: number | null;
  position_id: number | null;
}

export interface WholeInfo {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  team_id: number | null;
  position_id: number | null;
  token: string;
  laptop_name: string;
  laptop_image: string | unknown;
  laptop_brand_id: number | null;
  laptop_cpu: string;
  laptop_cpu_cores: number | null;
  laptop_cpu_threads: number | null;
  laptop_ram: number | null;
  laptop_hard_drive_type: string;
  laptop_state: string;
  laptop_purchase_date: string;
  laptop_price: number | null;
}

export interface UserFormToSend {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  team_id: number | null;
  position_id: number | null;
}

export interface LaptopUseForm {
  laptop_name: string;
  laptop_image: string | unknown;
  laptop_brand_id: number | null;
  laptop_cpu: string;
  laptop_cpu_cores: number | null;
  laptop_cpu_threads: number | null;
  laptop_ram: number | null;
  laptop_hard_drive_type: string;
  laptop_state: string;
  laptop_purchase_date: string;
  laptop_price: number | null;
}

export interface LaptopFormProps {
  setPage: (info: boolean) => void;
  page: boolean;
  sendData: () => void;
}
