export interface Pharmacy {
  name: string;
  dist: string;
  address: string;
  phone: string;
  loc: string;
}
export interface PharmacyResponse {
  success: boolean;
  result: Pharmacy[];
}
