export interface Guest {
  id: string;
  name: string;
  children: number;
  adults: number;
  status: STATUS
  email?: string;
  phone?: string;
  address?: string;
}

export enum STATUS {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled'
}
