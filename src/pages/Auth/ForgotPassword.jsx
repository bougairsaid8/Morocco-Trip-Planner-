import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegEnvelope, FaPaperPlane, FaRegEye, FaRegEyeSlash, FaUnlock, FaMapMarkedAlt,FaShare   } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux';
import { resetPassword ,clearAuthError} from '../../reduxStructure/slices/authSlice.jsx';
import { selectAuthError, selectAuthMessage, selectIsAuthenticated } from '../../reduxStructure/selectors.jsx';

import emailjs from '@emailjs/browser'; 
import AuthHero from '../../components/AuthHero/AuthHero';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [step, setStep] = useState('forgot'); // state for step 
  const [generatedOtp, setGeneratedOtp] = useState(''); // code otp
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    email: '',
    otp1: '', otp2: '', otp3: '', otp4: '',
    newPassword: '',
    confirmPassword: ''
  });

  // get state in Redux
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

  // move to next input 
  const handleOtpChange = (e, nextField) => {
    handleChange(e);
    if (e.target.value && nextField) {
      document.getElementsByName(nextField)[0].focus();
    }
  };
  
  const handleKeyDown = (e, prevField) => {
  if (e.key === 'Backspace' && !e.target.value && prevField) {
    document.getElementsByName(prevField)[0].focus(); // Return to previous input
  }
};

  //  create new code otp and send 
  const sendEmailOtp = async () => {
    if (!formData.email) {
      setErrors({ email: "Email is required" });
      return;
    }

    setLoading(true);
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // ceate code ex:1234
    setGeneratedOtp(otp);

    const templateParams = {
      email: formData.email,
      otp_code: otp,
    };

    try {
      // send code to server EmailJs
      await  emailjs.send(
      'service_4knl1s2', 
      'template_t1vrvxy', 
      templateParams, 
      'vIcvKHCGQmkgKor6m'
    )
      setStep('otp'); // move to next step
    } catch {
      setErrors({ email: "Failed to send email. Try again." });
    } finally {
      setLoading(false);
    }
  };

  // verify code with generatedOtp
  const verifyOtp = () => {
    const userOtp = formData.otp1 + formData.otp2 + formData.otp3 + formData.otp4;
    if (userOtp === generatedOtp) {
      // move to next step
      setStep('reset');
      setErrors({});
    } else {
      setErrors({ otp: "Invalid verification code" });
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 'forgot') {
        const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
        const exists = allUsers.some(u => u.email === formData.email);
        
        if (exists) {
            sendEmailOtp();
        } else {
            setErrors({ email: "This email is not registered!" });
        }
    }
    else if (step === 'otp') verifyOtp();
    else if (step === 'reset') {
      if (formData.newPassword.length < 6) {
        setErrors({ newPassword: "Min 6 characters" });
      } else if (formData.newPassword !== formData.confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match" });
      } else {
        dispatch(resetPassword(formData.email, formData.newPassword));
        console.log(message);
      }
    }
  };
  useEffect(()=>{
    if (isAuthenticated) {
        navigate('/'); 
      }
  },[isAuthenticated])

  return (
    <div className="auth-container-forgot" >
      <AuthHero />
      <div className="form-side-forgot">
        <div className="form-wrapper-forgot">
          <div className="brand-logo-forgot">
            <FaMapMarkedAlt className="logo-icon-forgot" /> Morocco Trip Planner
          </div>
          {error && <div className="error-message-box animate-up">{error}</div>}
          {/* Step 1: Forgot */}
          {step === 'forgot' && (
            <div className="fade-in-forgot">
              <h2>Forgot password?</h2>
              <p className="sub-text-forgot">Enter your email and we'll send you a 4-digit code.</p>
              <div className="input-group-forgot">
                <label>Email address</label>
                <div className={`input-with-icon-forgot `}>
                  <FaRegEnvelope className="field-icon-forgot" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                </div>
                {errors.email && <span className="error-text-small-forgot">{errors.email}</span>}
              </div>
              <button className="btn-main-forgot shadow-orange" onClick={handleNextStep} disabled={loading}>
                {loading ? "Sending..." : <><FaPaperPlane /> Send instructions</>}
              </button>
              <Link to="/login" className="back-link-forgot"><FaShare  /> Back to login</Link>
            </div>
          )}

          {/* Step 2: OTP */}
          {step === 'otp' && (
            <div className="fade-in-forgot">
              <h2>Check your email</h2>
              <p className="sub-text-forgot">Verification code sent to <b className='highlight-forgot'>{formData.email}</b></p>
              <div className="otp-inputs-forgot">
                {['otp1', 'otp2', 'otp3', 'otp4'].map((name, i, arr) => (
                  <input 
                    autoFocus={i === 0}
                    key={name}
                    type="text" 
                    name={name} 
                    maxLength="1" 
                    onKeyDown={(e) => handleKeyDown(e, arr[i-1])}
                    onChange={(e) => handleOtpChange(e, arr[i+1])} 
                  />
                ))}
              </div>
              {errors.otp && <span className="error-text-small-forgot text-center block">{errors.otp}</span>}
              <button className="btn-main-forgot shadow-orange" onClick={handleNextStep}>Verify Code</button>
              <button className="btn-text-forgot" onClick={sendEmailOtp}>Didn't receive code?<span style={{color:"#42A7C3"}}> Send again</span></button>
              <Link to="/login" className="back-link-forgot"><FaShare /> Back to login</Link>
            </div>
          )}

          {/* Step 3: Reset */}
          {step === 'reset' && (
            <div className="fade-in-forgot">
              <h2>Reset password</h2>
              <p className="sub-text-forgot">Enter a new password for your account.</p>
              <div className="input-group-forgot">
                <label>New password</label>
                <div className={`input-with-icon-forgot`}>
                  <FaUnlock className="field-icon-forgot" />
                  <input type={showPass ? "text" : "password"} name="newPassword" onChange={handleChange} placeholder="••••••••" />
                  <div className="eye-toggle-forgot" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>
                {errors.newPassword && <span className="error-text-small-forgot">{errors.newPassword}</span>}
              </div>
              <div className="input-group-forgot">
                <label>Confirm password</label>
                <div className={`input-with-icon-forgot`}>
                  <FaUnlock className="field-icon-forgot" />
                  <input type={showPass ? "text" : "password"} name="confirmPassword" onChange={handleChange} placeholder="••••••••" />
                </div>
                {errors.confirmPassword && <span className="error-text-small-forgot">{errors.confirmPassword}</span>}
              </div>
              <button className="btn-main-forgot shadow-orange" onClick={handleNextStep}>Update Password</button>
              <Link to="/login" className="back-link-forgot"><FaShare /> Back to login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;