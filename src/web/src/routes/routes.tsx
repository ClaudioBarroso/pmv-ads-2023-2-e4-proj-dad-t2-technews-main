import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../screens/Login';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
