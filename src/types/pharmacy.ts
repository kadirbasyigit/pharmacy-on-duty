export interface Pharmacy {
  pharmacyName: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  pharmacyDutyStart: string;
  pharmacyDutyEnd: string;
}
export interface PharmacyResponse {
  status: string;
  messageTR: string;
  data: Pharmacy[];
}
