import { Select, Button } from '@mantine/core';
import { provinceData } from '../provinceData';
import { useState } from 'react';

type Province = {
  province: string;
  districts: string[];
};

export default function ProvinceDistrictSelect() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [districts, setDistricts] = useState<string[]>([]);

  const handleProvinceChange = (value: string | null) => {
    setSelectedProvince(value);
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
    console.log(selectedProvince);
    console.log(selectedDistrict);
  };

  return (
    <div className="w-2/3 mx-auto p-10 bg-blue-300 mt-10">
      <h3 className="font-bold text-2xl mb-6">Eczane Bul</h3>
      <div className="flex gap-16">
        <Select
          className="w-64"
          label="Şehir Seçin"
          placeholder="Bir şehir seçin"
          data={provinceData.map((location: Province) => location.province)}
          onChange={handleProvinceChange}
        />
        <Select
          className="w-64"
          label="İlçe Seçin"
          placeholder="Bir ilçe seçin"
          data={districts}
          disabled={!selectedProvince}
          onChange={handleDistrictChange}
        />
        <Button className="self-end" onClick={getLocation}>
          Eczane Ara
        </Button>
      </div>
    </div>
  );
}
