import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <>
      <Reset />
      <SideBar />
      <Routes>

        <Route path='/mypage' element={<>마이페이지</>}/>
        <Route path='/board' element={<>게시판</>}/>
        <Route path='/notice' element={<>공지사항</>}/>

      </Routes>
    </>
  );
}

export default App;
