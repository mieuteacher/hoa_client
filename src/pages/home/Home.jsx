import "./home.scss";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';

import Footer from '@components/Footer'

import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@actions/user';
import Carousel  from '@components/Carousel'
import Navbar1 from "../../components/Navbar1";
import Image from "../../components/Image";
import { RootContext } from "@/App";

function Home() {
  const {userStore} = useContext(RootContext)
  const { t } = useTranslation();

  const [feature, setFeature] = useState([
    "Find a Store", "Help", "Join Us", "Sign In"
  ])
  return (
    <div className="root_page">
      {/* <Carousel/>
      <Navbar1/>  */}
      {/* Before Nav */}
      {/* <section className="before_nav">
        <div className="before_nav_content">
          <h1 className="brand_name">JS_230410_CLIENT {t("hello")}  -  {t("about")}  User: {userStore?.data?.first_name}  {userStoreuserStore?.data?.last_name}</h1>
          <div className="feature">
              {
                feature.map((item, index) => (
                  <span className="feature_item" key={Date.now() * Math.random()}>{item}</span>
                ))
              }
          </div>
        </div>
      </section> */}
   
      {/* Navbar */}
      <Carousel/>
      <Navbar1/>
      
      {/* Body */}
   
      <section className="body_container">
        <div className="body_container_center">

          <Outlet/>
      
        </div>
      </section>
      {/* Footer */}
      <Footer/> 
    </div>
  );
}

export default Home;
