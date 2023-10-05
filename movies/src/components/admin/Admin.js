import React from 'react'
import AuthForm from '../auth/AuthForm'
import { sendAdminAuthRequest } from '../../api-helpers/apiHelpers'
import { useDispatch } from 'react-redux'
import { adminAction } from '../../store';

function Admin()  {
  const dispatch = useDispatch();
  const onResRecieved = (data) =>{
    console.log(data);
    dispatch(adminAction.login());
    localStorage.setItem("adminId",data.id);
    localStorage.setItem("token",data.token);
  }
  const getData = (data) =>{
    console.log("from admin",data)
  sendAdminAuthRequest(data.inputs)
  .then(onResRecieved)
  .catch((err) =>console.log(err))
  }
  return (
    <div>
      <AuthForm   onSubmit={getData} isAdmin={true} />
    </div>
  )
}

export default Admin