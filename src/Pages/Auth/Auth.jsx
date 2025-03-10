import React, { useContext, useState } from "react";
import classes from "./signUp.module.css";

import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Utilities/firebase";
import { Datacontext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utilities/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // console.log(email, password);

  const [{ user }, dispatch] = useContext(Datacontext); // after we register the user and we get the userinfor we have to availe the user info for the other components to use using usecontext(datacontext), then we dispatch it inside the fuction below

  const [loading, setLoading] = useState({
    signin: false,
    signUp: false,
  }); // loading functionalty to show the email is processed its good practice

  const navigate = useNavigate(); // after user is signin or signup it should navigate to the home page(/) and we go to header page and fix the signin tab

  console.log(user); // checking we can set or put the user on our state in this case (user)

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name); // we use to check which button is clicked on the event

    if (e.target.name == "signin") {
      setLoading({ ...loading, signin: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          console.log(userinfo);

          dispatch({
            type: Type.SET_USER,
            user: userinfo.user,
          });
          setLoading({ ...loading, signin: false });
          navigate("/");
        })
        .catch((err) => {
          setError(err.message); // we have to creat div or small tage on the .jsx to show this error on the form by red color
          setLoading({ ...loading, signUp: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });

      // here we have to register the user on the fire base to get authntication by using email and password
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          console.log(userinfo);
          // same thing here right away after signUp we have to dispatch the userinfo to put it on the state(user)

          dispatch({
            type: Type.SET_USER,
            user: userinfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate("/"); // after finishing signup navigate to home page
        })
        .catch((err) => {
          setError(err.message); // we have to creat div or small tage on the .jsx to show this error on the form by red color
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <div>
        {/*logo*/}
        <Link to={"/"}>
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG12.png"
            alt="Amazon logo"
          />
        </Link>
      </div>
      {/*form div */}
      <div className={classes.login__container}>
        <h1>Sign in</h1> <br />
        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>
            <br />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password</label>
            <br />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <br />
          {/*sin in btn */}
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.btn__sin}
          >
            {loading.signin ? <ClipLoader color="gray" /> : " Sign in"}
          </button>
          <br />
          <br />
        </form>
        {/*agreement */}
        <p>
          By signing-in you agree to the AMAZON,
          <br />
          FAKE CLONE Conditions of Use & sale. <br />
          please see our Privacy Notice,our Cookies Notice and our
          interest-Based Ads Notice.
          <br />
        </p>
        <br />
        {/*creat account btn */}
        <button
          type="submit"
          name="signUp"
          onClick={authHandler}
          className={classes.btn__creat}
        >
          {loading.signUp ? (
            <ClipLoader color="gray" />
          ) : (
            "Creat your amazon Account"
          )}
        </button>
        {error && (
          <small style={{ color: "red", paddingTop: "5px" }}>{error}</small> // showing there is error filling the form
        )}
      </div>
    </section>
  );
}

export default Auth;
