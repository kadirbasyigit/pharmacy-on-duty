import ProvinceDistrictSelect from './components/ProvinceDistrictSelect';
import Header from './components/layout/Header';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <>
        <Header />
        <ProvinceDistrictSelect />
      </>
    </MantineProvider>
  );
}

export default App;
