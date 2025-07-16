export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  location: string;
  phone: string;
  email: string;
  password: string;
  commission_rate: number;
};

export type JWTPayload = {
  id: string;
  email: string;
  name: string;
};