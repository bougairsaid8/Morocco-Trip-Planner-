import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated } from './reduxStructure/selectors';

// --- IMPORTING PAGES ---
import Home from './pages/Home';
import Explorer from './pages/Explorer';
import Planner from './pages/Planner';
import MyTrips from './pages/MyTrips';
import TripDetails from './pages/TripDetails';
import Profile from './pages/Profile';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';

// --- IMPORTING COMPONENTS ---
import Navbar from './components/Navbar';

/**
 * PROTECTED ROUTE COMPONENT
 * Redirects to /login if the user is not authenticated.
 * Used for pages like Profile, Planner, and MyTrips.
 */
const ProtectedRoute = () => {
  return selectIsAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

/**
 * GUEST ROUTE COMPONENT
 * Redirects to Home (/) if the user is already logged in.
 * Used for pages like Login, Signup, and ResetPassword,ForgotPassword.
 */
const GuestRoute = () => {
  return selectIsAuthenticated ? <Navigate to="/" /> : <Outlet />;
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
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