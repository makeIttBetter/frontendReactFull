import React from "react";
import { useAuth } from "components/guards/AuthContext";
import { useNavigate } from "react-router-dom";
import { SignIn } from "api/auth";

function SignInForm({ styles }) {
  const [state, setState] = React.useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();
  const { signIn } = useAuth();

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
      console.log(response)
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        // Simulate sign-in process
        signIn();
        // Navigate to main page upon successful sign-up
        navigate('/main');
      } else {
        // Handle errors
        console.error('Sign-In failed');
      }
    } catch (error) {
      console.error('Error during sign-In:', error);
    }
    signIn();
    navigate('/main');
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
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className={styles.input}
        />
        <a href="#" className={styles.link}>Forgot your password?</a>
        <button className={styles.button}>Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;