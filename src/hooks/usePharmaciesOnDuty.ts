import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Pharmacy, PharmacyResponse } from '../types/pharmacy';

const apiKey = import.meta.env.VITE_PHARMACY_ON_DUTY_API_KEY;

const fetchPharmacies = async (
  province: string,
  district: string
): Promise<Pharmacy[]> => {
  const response = await axios.get<PharmacyResponse>(
    `https://api.collectapi.com/health/dutyPharmacy?ilce=${district}&il=${province}`,
    {
      headers: {
        Authorization: `${apiKey}`,
      },
    }
  );

  if (!response.data.success) {
    throw new Error('Api request failed');
  }

  return response.data.result;
};

export function usePharmaciesOnDuty(province: string, district: string) {
  return useQuery<Pharmacy[], Error>({
    queryKey: ['pharmaciesOnDuty', province, district],
    queryFn: () => fetchPharmacies(province, district),
  });
}
