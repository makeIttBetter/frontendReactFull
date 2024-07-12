import React from "react";
import { signUp } from "api/auth";
import { useAuth } from "components/guards/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUpForm({ styles }) {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();
    const { name, email, password } = state;

    try {
      const response = await signUp(name, email, password);
      if (response.status === 200) {
        // Simulate sign-in process
        signIn();
        // Navigate to main page upon successful sign-up
        navigate('/main');
      } else {
        // Handle errors
        console.error('Sign-up failed');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
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
          placeholder="Name"
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          className={styles.input}
        />
        <button className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
