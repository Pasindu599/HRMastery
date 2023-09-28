// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Menu from './components/Menu/SideDrawer';
import EditProfile from './screens/ProfileEdit/index';
import Header from './components/Header/index';
import LeavingRequest from './screens/LeavingReport';
function App() {
  return <LeavingRequest />;
}

export default App;
