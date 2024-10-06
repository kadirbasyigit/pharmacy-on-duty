import ProvinceDistrictSelect from './components/ProvinceDistrictSelect';
import Header from './components/layout/Header';
import '@mantine/core/styles.css';
import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import PharmacyList from './components/PharmacyList';

function App() {
  const [province, setProvince] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);

  return (
    <MantineProvider>
      <>
        <Header />
        <ProvinceDistrictSelect
          setProvince={setProvince}
          setDistrict={setDistrict}
        />
        <PharmacyList province={province} district={district} />
      </>
    </MantineProvider>
  );
}

export default App;
