import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendUserAuthRequest } from "../../api-helpers/apiHelpers";

import AuthForm from "./AuthForm";
import { userAction } from "../../store";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data);
    dispatch(userAction.login());
    localStorage.setItem("userId", data.existingUser._id);
    console.log("data from on recieved ",data)
    navigate("/");
  };
  const getData = (data) => {
    console.log(data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;