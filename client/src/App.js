// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Menu from './components/Menu/SideDrawer';
import EditProfile from './screens/ProfileEdit/index';
import Header from './components/Header/index';
import LeavingRequest from './screens/LeavingReport';
import Table from './components/Table/Table';
import AllEmployee from './screens/Employee/AllEmployee';

const USER_TYPE = {
  ADMIN: 'admin',
  HR: 'hr',
  EMPLOYEE: 'employee',
};

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicElement>
            <Login />
          </PublicElement>
        }
      />
      <Route path="/profile/:role/:id" element={<EditProfile />} />
      <Route path="/leaving-request/:role/" element={<LeavingRequest />} />
      <Route path="/all-employee/:role/" element={<AllEmployee />} />

      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

function PublicElement({ children }) {
  return <div>{children}</div>;
}

export default App;
