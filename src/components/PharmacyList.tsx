import { usePharmaciesOnDuty } from '../hooks/usePharmaciesOnDuty.ts';
import { Loader } from '@mantine/core';
import { FaLocationDot } from 'react-icons/fa6';
import { FaSquarePhone } from 'react-icons/fa6';

const PharmacyList: React.FC<{
  province: string | null;
  district: string | null;
}> = ({ province, district }) => {
  const { data, error, isLoading } = usePharmaciesOnDuty(
    province || '',
    district || ''
  );

  if (!province || !district) {
    return;
  }

  if (isLoading)
    return (
      <div className="w-2/3 mx-auto mt-10 flex justify-center">
        <Loader color="blue" size="sm" type="bars" />
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <ul className="w-2/3 mx-auto p-10 mt-10 text-neutral-200 grid grid-cols-2 gap-14">
      {data?.map(pharmacy => (
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
          <div className="text-sm">
            Nöbet başlama tarihi ve saati: <p>{pharmacy.pharmacyDutyStart}</p>
          </div>
          <div className="text-sm">
            Nöbet bitiş tarihi ve saati: <p>{pharmacy.pharmacyDutyEnd}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PharmacyList;
