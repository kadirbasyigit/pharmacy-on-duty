import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Pharmacy, PharmacyResponse } from '../types/pharmacy';

const apiKey = import.meta.env.VITE_PHARMACY_ON_DUTY_API_KEY;

const fetchPharmacies = async (
  province: string,
  district: string
): Promise<Pharmacy[]> => {
  const response = await axios.get<PharmacyResponse>(
    `https://www.nosyapi.com/apiv2/service/pharmacies-on-duty?city=${province}&district=${district}`,
    {
      params: {
        apiKey: `${apiKey}`,
      },
    }
  );

  if (response.data.status === 'failure') {
    throw new Error(response.data.messageTR);
  }

  return response.data.data;
};

export function usePharmaciesOnDuty(province: string, district: string) {
  return useQuery<Pharmacy[], Error>({
    queryKey: ['pharmaciesOnDuty', province, district],
    queryFn: () => fetchPharmacies(province, district),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
