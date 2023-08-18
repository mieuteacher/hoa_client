import React, { useEffect, useState } from 'react'
import validate from '@utils/validate';
import api from '@api';
import { Alert } from 'antd';
import './Login.scss'


export default function Login() {
  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   window.location.href = "/";
    // }
  })
  return (
    <div>
    
   <section className="h-100 gradient-form" >
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">
                <div className="text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{ width: 185 }}
                    alt="logo"
                  />
                  <h4 className="mt-1 mb-5 pb-1">We are The Godiva Team</h4>
                </div>
                <form onSubmit={async (e) => {
        e.preventDefault();
        let data = {
          user_name: e.target.user_name.value,
          password: e.target.password.value,
          type: !validate.isEmail(e.target.user_name.value) // Email false, User Name true
        }

        try {
          let result = await api.users.login(data);
          if (result.status === 200) {
            if (result.data.token === undefined) {            
              alert("Đăng nhập thất bại")
            } else {
              localStorage.setItem("token", result.data.token);
              alert("Đăng nhập Thành Công")
              window.location.href = "/";
            }


          } else {
            alert(result.data.message)
          }
        } catch (error) {
          console.log(error);
          alert("Đăng nhập thất bại");
        }

      }}>
                  <p>Please login to your account</p>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="form2Example11"
                      className="form-control"
                      placeholder="User name"       
                      name='user_name'

                    />
                    
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example22"
                      className="form-control"
                      placeholder="Password"
                      name='password'
                    />
                  
                  </div>
                  <div className="text-center pt-1 mb-5 pb-1">
                    <button
                      className="btn  btn-block fa-lg  mb-3"
                      type="submit"
                    >
                      Log in
                    </button>
                    <a className="text-muted" href="#!">
                      Forgot password?
                    </a>
                  </div>
                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                      <a href='/register'>
                      Create new
                      </a>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> 
    </div>
  )
}
