import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import ForgotPassword from './Components/ForgotPassword';
import DashboardLayout from './Components/Layout/DashboardLayout';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Customers from './Pages/Customers';
import Dashboard from './Pages/Dashboard';
import Payments from './Pages/Payments';
import PrivateRoutes from "./Pages/PrivateRoutes";
import Products from './Pages/Products';
import Reports from './Pages/Reports';
import Stocks from './Pages/Stocks';
import ViewDetails from './Pages/ViewDeails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check local storage for login status on initial render
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedLoggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("email");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route element={<DashboardLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
          <Route path="/dashboard" element={<PrivateRoutes isLoggedIn={isLoggedIn}><Dashboard /></PrivateRoutes>} />
          <Route path="/products" element={<PrivateRoutes isLoggedIn={isLoggedIn}><Products /></PrivateRoutes>} />
          <Route path="/customers" element={<PrivateRoutes isLoggedIn={isLoggedIn}><Customers /></PrivateRoutes>} />
          <Route path="/reports" element={<PrivateRoutes isLoggedIn={isLoggedIn}><Reports /></PrivateRoutes>} />
          <Route path="/stocks" element={<PrivateRoutes isLoggedIn={isLoggedIn}><Stocks /></PrivateRoutes>} />
          <Route path="/payments" element={<PrivateRoutes isLoggedIn={isLoggedIn}><Payments /></PrivateRoutes>} />
          <Route path="/product/:id" element={<PrivateRoutes isLoggedIn={isLoggedIn}><ViewDetails /></PrivateRoutes>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
