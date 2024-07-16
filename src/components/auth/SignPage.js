import React, { useState, useEffect } from "react";
import styles from "./Sign.module.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

function SignPage() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
    }
  };
  const containerClass = `${styles.container} ${
    type === "signUp" ? styles["right-panel-active"] : ""
  }`;

  useEffect(() => {
    document.body.classList.add(styles['body-sign']);
    return () => {
      document.body.classList.remove(styles['body-sign']);
    };
  }, []);

  return (
    <div className={styles.SignPage}>
      <h2>Flomad</h2>
      <div className={containerClass} id={styles.container}>
        <SignUpForm styles={styles} />
        <SignInForm styles={styles} />
        <div className={styles["overlay-container"]}>
          <div className={styles.overlay}>
            <div className={styles["overlay-panel"] + " " + styles["overlay-left"]}>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className={styles.ghost}
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className={styles["overlay-panel"] + " " + styles["overlay-right"]}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className={styles.ghost}
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignPage;