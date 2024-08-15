import React, { useState } from "react";
import { signUp } from "api/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import swal from 'sweetalert';

function SignUpForm({ styles }) {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = re.test(String(email).toLowerCase());
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: isValid ? "" : "Invalid email format"
    }));
    return isValid;
  };

  const validatePassword = (password, confirmPassword) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isComplex = (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit &&
      hasSpecialChar
    );

    const passwordsMatch = password === confirmPassword;
    console.log(password.length >= minLength, hasUpperCase, hasLowerCase, hasDigit, hasSpecialChar, isComplex, passwordsMatch);

    setErrors((prevErrors) => ({
      ...prevErrors,
      password: isComplex ? "" : "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.",
      confirmPassword: passwordsMatch ? "" : "Passwords do not match"
    }));

    return isComplex && passwordsMatch;
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = state;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    if (!validateForm()) return;

    const { name, email, password } = state;

    try {
      const response = await signUp(name, email, password);
      console.log(response);
      if (response.status === 200) {
        swal ({
          title: "Sign-up successful",
          text: "Go Check Your Email!",
          icon: "success"
        });
      } else {
        swal ({
          title: "Sign-up failed", 
          icon: "error"
        });
        console.error('Sign-up failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        swal ({
          title: "User already exists", 
          text: "Change Your Username & Email and Try Again!", 
          icon: "error" 
        });
      } else {
        swal ({
          title: "Sign-up failed", 
          text: error.response.data.message,
          icon: "error"
        });
        console.error('Error during sign-up:', error);
      }
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));

    // Perform validation for email and password onChange
    if (name === "email") {
      validateEmail(value);
    } else if (name === "password" || name === "confirmPassword") {
      validatePassword(state.password, state.confirmPassword);
    }
  };

  return (
    <div className={`${styles['form-container']} ${styles['sign-up-container']}`}>
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className={styles['social-container']}>
          <a href="#" className={styles.social}>
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className={styles.social}>
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className={styles.social}>
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          onBlur={handleChange}
          placeholder="username"
          className={styles.input}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          onBlur={handleChange}
          placeholder="Email"
          className={styles.input}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
        <div className={styles['password-container']}>
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={state.password}
            onChange={handleChange}
            onBlur={handleChange}
            placeholder="Password"
            className={`${styles.input} ${styles['password-input']}`}
          />
          <FontAwesomeIcon 
            icon={passwordVisible ? faEye : faEyeSlash} 
            onClick={togglePasswordVisibility} 
            className={styles['toggle-icon']} 
          />
        </div>
        {errors.password && <span className={styles.error}>{errors.password}</span>}
        <div className={styles['password-container']}>
          <input
            type={passwordVisible ? "text" : "password"}
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
            onBlur={handleChange}
            placeholder="Confirm Password"
            className={`${styles.input} ${styles['password-input']}`}
          />
          <FontAwesomeIcon 
            icon={passwordVisible ? faEye : faEyeSlash} 
            onClick={togglePasswordVisibility} 
            className={styles['toggle-icon']} 
          />
        </div>
        {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        <button className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;