import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './reduxStructure/selectors';


// --- IMPORTING PAGES ---
import Home from './pages/Home/Home.jsx';
import Explorer from './pages/Explorer/Explorer.jsx';
import Planner from './pages/Planner/Planner.jsx';
import MyTrips from './pages/MyTrips/MyTrips.jsx';
import TripDetails from './pages/TripDetails/TripDetails.jsx';
import Profile from './pages/Profile/Profile.jsx';
import About from './pages/About/About.jsx';
import Login from './pages/Auth/Login.jsx';
import SignUp from './pages/Auth/Signup.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

// test 
import SignupSteps from './pages/Auth/Signup.jsx';

// --- IMPORTING COMPONENTS ---
import Navbar from './components/Navbar/Navbar.jsx';

/**
 * PROTECTED ROUTE COMPONENT
 * Redirects to /login if the user is not authenticated.
 * Used for pages like Profile, Planner, and MyTrips.
 */
const ProtectedRoute = () => {
  const isAuth = useSelector(selectIsAuthenticated);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

/**
 * GUEST ROUTE COMPONENT
 * Redirects to Home (/) if the user is already logged in.
 * Used for pages like Login, Signup, and ResetPassword,ForgotPassword.
 */
const GuestRoute = () => {
  const isAuth = useSelector(selectIsAuthenticated);
  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

function App() {
  return (
    <Router>
      {/* Global Navigation Bar - Visible on all pages */}
      <Navbar />

      <Routes>
        {/* --- PUBLIC ROUTES --- 
            Accessible by everyone (Logged in or not) */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/explorer" element={<Explorer />} />

        {/* --- GUEST ONLY ROUTES --- 
            Accessible only if NOT logged in. Redirects to '/'. */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* test */}
          <Route path="/signup-steps" element={<SignupSteps />} />
        </Route>

        {/* --- PROTECTED ROUTES --- 
            Accessible only if logged in. Redirects to '/login' . */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/planner/:cityName" element={<Planner />} />
          <Route path="/tripDetails/:tripId" element={<TripDetails />} />
        </Route>

        {/* --- 404 NOT FOUND ---  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;