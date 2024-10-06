import { usePharmaciesOnDuty } from '../hooks/usePharmaciesOnDuty.ts';

const PharmacyList: React.FC<{
  province: string | null;
  district: string | null;
}> = ({ province, district }) => {
  const { data, error, isLoading } = usePharmaciesOnDuty(
    province || '',
    district || ''
  );

  if (!province || !district) {
    return <div>Lütfen bir şehir ve ilçe seçin.</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <ul>
      {data?.map(pharmacy => (
        <li key={pharmacy.name}>
          <h4>{pharmacy.name}</h4>
          <p>{pharmacy.address}</p>
          <p>{pharmacy.phone}</p>
        </li>
      ))}
    </ul>
  );
};

export default PharmacyList;
