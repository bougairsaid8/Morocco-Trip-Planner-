import React, { useState ,useEffect} from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { FaRegEnvelope, FaUnlock, FaMapMarkedAlt, FaPaperPlane, FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux';
import { signup ,clearAuthError} from '../../reduxStructure/slices/authSlice.jsx';
import { selectAuthError, selectAuthMessage, selectIsAuthenticated } from '../../reduxStructure/selectors.jsx';
import AuthHero from '../../components/AuthHero/AuthHero.jsx';
import './Signup_old.css';

const Signup_old = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  // import state in store redux
  const error = useSelector(selectAuthError);
  const message = useSelector(selectAuthMessage);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // remove error if you start typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    // remove error global 
    if (error) {
      dispatch(clearAuthError());
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.password.length < 6) newErrors.password = "Min 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords match error";
    if (!termsAccepted) newErrors.terms = "Accept terms to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      
      
      dispatch(signup(formData)); 
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
    <div className="auth-container-signup">
      <AuthHero />
      <div className="form-side-signup">
        <div className="form-wrapper-signup">
          <div className="brand-logo-signup">
            <FaMapMarkedAlt className="logo-icon-signup" /> Morocco Trip Planner
          </div>

          <h2>Create your account</h2>
          <p className="sub-text-signup">Start planning your dream Morocco trip in minutes.</p>
          {/* خطأ عام في تسجيل الدخول */}
          {error&& <div className="error-message-box animate-up">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="input-group-signup">
              <label>Full Name</label>
              <div className={`input-with-icon-signup`}>
                <FaUser className="field-icon-signup" />
                <input name="username" onChange={handleChange} placeholder="e.g. Idris Al-Hassan" value={formData.username}/>
              </div>
              {errors.username && <span className="error-text-small-signup">{errors.username}</span>}
            </div>

            {/* Email */}
            <div className="input-group-signup">
              <label>Email address</label>
              <div className={`input-with-icon-signup`}>
                <FaRegEnvelope className="field-icon-signup" />
                <input name="email" onChange={handleChange} placeholder="you@example.com" value={formData.email}/>
              </div>
              {errors.email && <span className="error-text-small-signup">{errors.email}</span>}
            </div>

            {/* Password Row */}
            <div className="row-signup">
              <div className="input-group-signup mb-0">
                <label>Password</label>
                <div className={`input-with-icon-signup `}>
                  <FaUnlock className="field-icon-signup" />
                  <input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} placeholder="••••••••" value={formData.password}/>
                  <div className="eye-toggle-signup" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>
                {errors.password && <span className="error-text-small-signup">{errors.password}</span>}
              </div>
              
              <div className="input-group-signup mb-0">
                <label>Confirm</label>
                <div className={`input-with-icon-signup `}>
                  <FaUnlock className="field-icon-signup" />
                  <input type={showPassword ? "text" : "password"} name="confirmPassword" onChange={handleChange} placeholder="••••••••" value={formData.confirmPassword}/>
                </div>
                {errors.confirmPassword && <span className="error-text-small-signup">{errors.confirmPassword}</span>}
              </div>
            </div>

            {/* Terms */}
            <div className="checkbox-group-wrapper-signup">
              <div className="checkbox-group-signup">
                <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                <label htmlFor="terms">
                  {/* kyfach blanhom */}
                  I agree to the <span style={{color:"#42A7C3",textDecoration:"none"}}>Terms</span> and <span style={{color:"#42A7C3",textDecoration:"none"}}>Privacy Policy</span>
                </label>              
                </div>
              {errors.terms && <span className="error-text-small-signup block">{errors.terms}</span>}
            </div>

            <button type="submit" className="btn-main-signup">
              <FaPaperPlane className="btn-icon-signup" /> Sign up
            </button>
          </form>

          <p className="login-redirect-signup">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup_old;