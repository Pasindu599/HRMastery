// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Menu from './components/Menu';
import Profile from './screens/Profile';
function App() {
  return (
    <div className="App">
      <Profile />
    </div>
  );
}

export default App;
