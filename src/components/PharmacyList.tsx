import { usePharmaciesOnDuty } from '../hooks/usePharmaciesOnDuty.ts';
import { Loader } from '@mantine/core';
import { FaLocationDot } from 'react-icons/fa6';
import { FaSquarePhone } from 'react-icons/fa6';

type PharmacyListProps = {
  province: string;
  district: string;
};

const PharmacyList = ({ province, district }: PharmacyListProps) => {
  const { data, error, isLoading } = usePharmaciesOnDuty(province, district);

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
        const dutyStartDate = new Date(pharmacy.pharmacyDutyStart);
        const dutyStartDateString = dutyStartDate.toLocaleDateString();
        const dutyStartTimeString = dutyStartDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        const dutyEndDate = new Date(pharmacy.pharmacyDutyEnd);
        const dutyEndDateString = dutyEndDate.toLocaleDateString();
        const dutyEndTimeString = dutyEndDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        return (
          <li
            key={pharmacy.pharmacyName}
            className="bg-blue-700 p-8 rounded-md grid gap-3"
          >
            <h4 className="text-xl font-bold">{pharmacy.pharmacyName}</h4>
            <div className="pharmacy-data-body-text">
              <FaLocationDot className="text-2xl" /> <p>{pharmacy.address}</p>
            </div>
            <div className="pharmacy-data-body-text">
              <FaSquarePhone className="text-2xl" />
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
          </li>
        );
      })}
    </ul>
  );
};

export default PharmacyList;
