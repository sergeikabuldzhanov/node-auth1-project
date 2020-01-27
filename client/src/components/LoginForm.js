import React from "react";

export const LoginForm = props => {
  return (
    <form className="login">
      <h3>Login</h3>
      <label htmlFor="">
        <span>Email</span>
        <input type="text" />
      </label>
      <label htmlFor="">
        <span>Password</span>
        <input type="password" />
      </label>
      <input type="button" value="" />
    </form>
  );
};
