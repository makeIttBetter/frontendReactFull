import React, { useState } from "react";
import { useAuth } from "components/guards/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { SignIn } from "api/auth";
import '@fortawesome/fontawesome-free/css/all.css';
import swal from 'sweetalert';

function SignInForm({ styles }) {
  const [state, setState] = React.useState({
    username: "",
    password: ""
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();

    const { username, password } = state;
    try {
      const response = await SignIn(username, password);
      // console.log(response)
      if (response.status === 200) {
        var token = response.data.token;
        // console.log(response.data.token)
        // Simulate sign-in process
        signIn(token={token});
        // Navigate to main page upon successful sign-up
        navigate('/main');
      } else {
        swal ({
          title: "Sign-In failed", 
          icon: "error"
        });
        console.error('Sign-In failed');
      }
    } catch (error) {
      swal ({
        title: "Sign-In failed",
        text: error.response.data.message,
        icon: "error"
      });
      console.error('Error during sign-In:', error);
    }
    // signIn();
    // navigate('/main');
  };

  return (
    <div className={`${styles['form-container']} ${styles['sign-in-container']}`}>
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
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
        <span>or use your account</span>
        <input
          type="username"
          placeholder="username"
          name="username"
          value={state.username}
          onChange={handleChange}
          className={styles.input}
        />
        <div className={styles['password-container']}>
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
            className={`${styles.input} ${styles['password-input']}`}
          />
          <FontAwesomeIcon 
            icon={passwordVisible ? faEye : faEyeSlash} 
            onClick={togglePasswordVisibility} 
            className={styles['toggle-icon']} 
          />
        </div>
        <a href="#" className={styles.link}>Forgot your password?</a>
        <button className={styles.button}>Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;