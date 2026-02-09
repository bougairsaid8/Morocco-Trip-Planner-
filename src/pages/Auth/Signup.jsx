import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegEnvelope, FaUnlock, FaMapMarkedAlt, FaPaperPlane, FaRegEye, FaRegEyeSlash, FaUser, FaArrowRight, FaShare } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearAuthError } from '../../reduxStructure/reducers/authReducer.jsx';
import { selectAuthError, selectAuthMessage, selectIsAuthenticated } from '../../reduxStructure/selectors.jsx';
import AuthHero from '../../components/AuthHero/AuthHero.jsx';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [step, setStep] = useState(1); // الحالة ديال المرحلة
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const error = useSelector(selectAuthError);
  const message = useSelector(selectAuthMessage);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    if (error) {
      dispatch(clearAuthError());
    }
  };

  // التحقق من المرحلة الأولى (Username & Email)
  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // التحقق من المرحلة الثانية (Passwords & Terms)
  const validateStep2 = () => {
    let newErrors = {};
    if (formData.password.length < 6) newErrors.password = "Min 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!termsAccepted) newErrors.terms = "Accept terms to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      dispatch(signup(formData));
            // message fih problem 
      console.log(message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-container-signup">
      <AuthHero />
      <div className="form-side-signup">
        <div className="form-wrapper-signup">
          <div className="brand-logo-signup"> 
            <span><FaMapMarkedAlt className="logo-icon-signup" /> Morocco Trip Planner</span>
            {step === 2 && <p className="back-link-signup" onClick={handleBack}><FaShare /> Back </p>}
          </div>

          <h2>{step === 1 ? "Create your account" : "Set your security"}</h2>
          <p className="sub-text-signup">
            {step === 1 ? "Start planning your dream Morocco trip in minutes." : "Protect your account with a strong password."}
          </p>

          {error && <div className="error-message-box animate-up">{error}</div>}

          <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}>
            
            {/* --- STEP 1: Personal Info --- */}
            {step === 1 && (
            // Full Name & Email
              <div className="slideUp-signup">
                <div className="input-group-signup">
                  <label>Full Name</label>
                  <div className="input-with-icon-signup">
                    <FaUser className="field-icon-signup" />
                    <input name="username" onChange={handleChange} placeholder="e.g. Idris Al-Hassan" value={formData.username}/>
                  </div>
                  {errors.username && <span className="error-text-small-signup">{errors.username}</span>}
                </div>

                <div className="input-group-signup">
                  <label>Email address</label>
                  <div className="input-with-icon-signup">
                    <FaRegEnvelope className="field-icon-signup" />
                    <input name="email" onChange={handleChange} placeholder="you@example.com" value={formData.email}/>
                  </div>
                  {errors.email && <span className="error-text-small-signup">{errors.email}</span>}
                </div>

                <button type="button" className="btn-main-signup" onClick={handleNext}>
                  Next  
                </button>
              </div>
            )}

            {/* --- STEP 2: Security & Terms --- */}
            {step === 2 && (
                // Password, Confirm Password, Terms Checkbox
              <div className="slideUp-signup">
                <div className="input-group-signup">
                  <label>Password</label>
                  <div className="input-with-icon-signup">
                    <FaUnlock className="field-icon-signup" />
                    <input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} placeholder="••••••••" value={formData.password}/>
                    <div className="eye-toggle-signup" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </div>
                  </div>
                  {errors.password && <span className="error-text-small-signup">{errors.password}</span>}
                </div>

                <div className="input-group-signup">
                  <label>Confirm Password</label>
                  <div className="input-with-icon-signup">
                    <FaUnlock className="field-icon-signup" />
                    <input type={showPassword ? "text" : "password"} name="confirmPassword" onChange={handleChange} placeholder="••••••••" value={formData.confirmPassword}/>
                  </div>
                  {errors.confirmPassword && <span className="error-text-small-signup">{errors.confirmPassword}</span>}
                </div>

                <div className="checkbox-group-wrapper-signup">
                  <div className="checkbox-group-signup">
                    <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                    <label htmlFor="terms">
                      I agree to the <span className="link-style">Terms</span> and <span className="link-style">Privacy Policy</span>
                    </label>
                  </div>
                  {errors.terms && <span className="error-text-small-signup block">{errors.terms}</span>}
                </div>

                <div className="btn-group-signup">
                
                  
                  <button type="submit" className="btn-main-signup">
                    <FaPaperPlane /> Sign up
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="login-redirect-signup">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;