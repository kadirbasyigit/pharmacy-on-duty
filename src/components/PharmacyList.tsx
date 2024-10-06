import { usePharmaciesOnDuty } from '../hooks/usePharmaciesOnDuty.ts';
import { Loader } from '@mantine/core';
import { FaLocationDot } from 'react-icons/fa6';
import { FaSquarePhone } from 'react-icons/fa6';
import { Button } from '@mantine/core';

type PharmacyListProps = {
  province: string;
  district: string;
};

const PharmacyList = ({ province, district }: PharmacyListProps) => {
  const { data, error, isLoading } = usePharmaciesOnDuty(province, district);

  function handleClick(address: string) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(url, '_blank');
  }

  if (!province || !district) {
    return null;
  }

  if (isLoading)
    return (
      <div className="w-2/3 mx-auto mt-10 flex justify-center">
        <Loader color="blue" size="sm" type="bars" />
      </div>
    );
  if (error)
    return (
      <div className="w-2/3 mx-auto mt-10 flex justify-center">
        <h3>Bir hata oluştu: {error.message}</h3>
      </div>
    );

  if (!data || data.length < 1)
    return (
      <div className="w-2/3 mx-auto mt-10 flex justify-center">
        <h3>Maalesef sonuç bulunamadı...</h3>
      </div>
    );

  return (
    <ul className="w-2/3 mx-auto p-10 mt-10 text-neutral-200 grid grid-cols-2 gap-14">
      {data?.map(pharmacy => {
        const startDate = pharmacy.pharmacyDutyStart;
        const isoStringFormattedStartDate = startDate.replace(' ', 'T');
        const dutyStartDate = new Date(isoStringFormattedStartDate);
        const dutyStartDateString = dutyStartDate.toLocaleDateString();
        const dutyStartTimeString = dutyStartDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        const endDate = pharmacy.pharmacyDutyEnd;
        const isoStringFormattedEndDate = endDate.replace(' ', 'T');
        const dutyEndDate = new Date(isoStringFormattedEndDate);
        const dutyEndDateString = dutyEndDate.toLocaleDateString();
        const dutyEndTimeString = dutyEndDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        const address = pharmacy.address;

        return (
          <li
            key={pharmacy.pharmacyName}
            className="bg-blue-700 p-8 rounded-md grid gap-3"
          >
            <h4 className="text-xl font-bold">{pharmacy.pharmacyName}</h4>
            <div className="pharmacy-data-body-text">
              <FaLocationDot size={24} /> <p>{pharmacy.address}</p>
            </div>
            <div className="pharmacy-data-body-text">
              <FaSquarePhone size={24} />
              <p>{pharmacy.phone}</p>
            </div>

            <p className="text-sm">
              Nöbet başlangıç tarihi ve saati: {dutyStartDateString} -{' '}
              {dutyStartTimeString}
            </p>

            <p className="text-sm">
              Nöbet bitiş tarihi ve saati: {dutyEndDateString} -{' '}
              {dutyEndTimeString}
            </p>
            <Button
              onClick={() => handleClick(address)}
              variant="gradient"
              gradient={{ from: 'rgba(2, 2, 92, 1)', to: 'blue', deg: 94 }}
              leftSection={
                <img
                  src="/images/google-maps.png"
                  alt="google maps image"
                  width="24px"
                />
              }
            >
              Haritalarda Göster
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default PharmacyList;
