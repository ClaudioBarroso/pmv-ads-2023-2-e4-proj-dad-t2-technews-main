import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../screens/Login';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import User from '../screens/User';
import EditNews from '../screens/EditNews';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<User />} />
        <Route path="/editNews/:id" element={<EditNews />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
