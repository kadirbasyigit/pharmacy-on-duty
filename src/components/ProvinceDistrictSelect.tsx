import { Select, SelectItem } from '@nextui-org/select';
import { Button } from '@nextui-org/button';

export default function ProvinceDistrictSelect() {
  return (
    <div className="w-11/12 shadow-md rounded-md mx-auto p-10 mt-10 bg-slate-200">
      <h3 className="text-2xl font-bold pb-10">Nöbetçi Eczane Bul</h3>
      <div className="flex gap-14">
        <Select
          isRequired
          label="Şehir"
          placeholder="Şehir seçiniz"
          defaultSelectedKeys={['cat']}
          className="max-w-xs"
        >
          {/* {animals.map((animal) => (
        <SelectItem key={animal.key}>
          {animal.label}
        </SelectItem>
      ))} */}
        </Select>

        <Select
          isRequired
          label="İlçe"
          placeholder="İlçe seçiniz"
          defaultSelectedKeys={['cat']}
          className="max-w-xs"
        >
          {/* {animals.map((animal) => (
        <SelectItem key={animal.key}>
          {animal.label}
        </SelectItem>
      ))} */}
        </Select>

        <Button className="w-40 h-14" color="primary">
          Eczane ara
        </Button>
      </div>
    </div>
  );
}
