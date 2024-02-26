import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import SideBar from './components/SideBar/SideBar';
import SideBarTop from './components/SideBarTop/SideBarTop';
import RootLayout from './components/RootLayout/RootLayout';
import { MENUS } from './constants/menu';

function App() {
  return (
    <>
      <Reset />
      <SideBar />
      <SideBarTop />
      <RootLayout>
        <Routes>
          {MENUS.map(menu => <Route key={menu.id} path={menu.path} element={menu.element} />)}
        </Routes>
      </RootLayout>
      
    </>
  );
}

export default App;
