import React, { useState ,useEffect} from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { FaRegEnvelope, FaUnlock, FaMapMarkedAlt, FaPaperPlane, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux';
import { login ,clearAuthError} from '../../reduxStructure/reducers/authReducer.jsx';
import { selectAuthError, selectAuthMessage, selectIsAuthenticated } from '../../reduxStructure/selectors.jsx';

import AuthHero from '../../components/AuthHero/AuthHero.jsx';

import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  // import state from the store
  const error = useSelector(selectAuthError);
  const message = useSelector(selectAuthMessage);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // handle input change
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

  // remove error if you start typing
  if (errors[e.target.name]) {
    setErrors({ ...errors, [e.target.name]: '' });
  }
  // remove error global 
  if (error) {
    dispatch(clearAuthError());
  }
};
  // validate form data before submit
  const validate = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.password.length < 6) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
//  handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(login(formData)); 
      // message fih problem 
      console.log(message);
    }
  };

  useEffect(() => {
      if (isAuthenticated) {
        navigate('/'); 
      }
    }, [isAuthenticated]);

  return (
    <div className="auth-container-login">
      <AuthHero />

      <div className="form-side-login">
        <div className="form-wrapper-login">
          <div className="brand-logo-login">
            <FaMapMarkedAlt className="logo-icon-login" /> Morocco Trip Planner
          </div>

          <h2>Welcome back</h2>
          <p className="sub-text-login">Sign in to access your saved itineraries and trip details.</p>

          {error&& <div className="error-message-box animate-up">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Email address */}
            <div className="input-group-login">
              <label>Email address</label>
              <div className={`input-with-icon-login `}>
                <FaRegEnvelope className="field-icon-login" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="traveler@example.com" 
                />
              </div>
              {errors.email && <span className="error-text-small-login">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="input-group-login">
              <label>Password</label>
              <div className={`input-with-icon-login `}>
                <FaUnlock className="field-icon-login" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                />
                <div className="eye-toggle-login" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
              {errors.password && <span className="error-text-small-login">{errors.password}</span>}
              
              <div className="forgot-link-wrapper-login">
                <Link to="/forgot-password" className="forgot-link-login">Forgot password?</Link>
              </div>
            </div>

            <button type="submit" className="btn-main-login">
              <FaPaperPlane className="btn-icon-login" /> Log in 
            </button>
          </form>

          <p className="signup-redirect-login">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;