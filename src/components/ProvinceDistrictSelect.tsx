import { Select, Button } from '@mantine/core';
import { provinceData } from '../provinceData';
import { useState } from 'react';

type Province = {
  province: string;
  districts: string[];
};

type ProvinceDistrictSelectProps = {
  setProvince: (province: string) => void;
  setDistrict: (district: string) => void;
};

export default function ProvinceDistrictSelect({
  setProvince,
  setDistrict,
}: ProvinceDistrictSelectProps) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [districts, setDistricts] = useState<string[]>([]);

  const handleProvinceChange = (value: string | null) => {
    setSelectedProvince(value);
    setSelectedDistrict(null);
    if (value) {
      const selectedData = provinceData.find(
        (p: Province) => p.province === value
      );
      setDistricts(selectedData ? selectedData.districts : []);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (value: string | null) => {
    setSelectedDistrict(value);
  };

  const getLocation = () => {
    if (selectedProvince) {
      setProvince(selectedProvince);
    }

    if (selectedDistrict) {
      setDistrict(selectedDistrict);
    }
  };

  return (
    <div className="w-11/12 xl:w-2/3 mx-auto p-10 bg-blue-200 mt-10 rounded-md shadow-lg">
      <h3 className="font-bold text-2xl mb-6">Eczane Bul</h3>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-center lg:gap-10">
        <Select
          className="w-64 mx-auto lg:mx-0"
          label="Şehir Seçin"
          placeholder="Bir şehir seçin"
          data={provinceData.map((location: Province) => location.province)}
          onChange={handleProvinceChange}
        />
        <Select
          className="w-64 mx-auto lg:mx-0"
          label="İlçe Seçin"
          placeholder="Bir ilçe seçin"
          data={districts}
          disabled={!selectedProvince}
          onChange={handleDistrictChange}
          value={selectedDistrict}
        />
        <Button className="self-end mx-auto lg:mx-0" onClick={getLocation}>
          Eczane Ara
        </Button>
      </div>
    </div>
  );
}
