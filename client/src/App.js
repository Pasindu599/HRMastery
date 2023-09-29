// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Menu from './components/Menu/SideDrawer';
import EditProfile from './screens/ProfileEdit/index';
import Header from './components/Header/index';
import LeavingRequest from './screens/LeavingReport';

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/home" element={<Header />} />
    //     <Route path="/profile" element={<EditProfile />} />
    //     <Route path="/leaving" element={<LeavingRequest />} />
    //   </Routes>
    // </Router>
    <Login />
  );
}

export default App;
