import React from 'react'

/* Antd */
import { AutoComplete, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function Navbar() {
    const renderTitle = (title) => (
        <span>
          {title}
          <a
            style={{
              float: 'right',
            }}
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
          >
            more
          </a>
        </span>
      );
    
    const renderItem = (title, count) => ({
    value: title,
    label: (
        <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
        }}
        >
        {title}
        <span>
            <UserOutlined /> {count}
        </span>
        </div>
    ),
    });

    const options = [
    {
        label: renderTitle('Libraries'),
        options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
    },
    {
        label: renderTitle('Solutions'),
        options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
    },
    {
        label: renderTitle('Articles'),
        options: [renderItem('AntDesign design language', 100000)],
    },
    ];

    const [menu, setMenu] = useState([
    "Home", "About", "Contacts", "Policies"
    ]);
  return (
    <nav>
    <div className="nav_content">
      <div className="left_content">
        {/* Logo */}
        <img src={`${process.env.REACT_APP_SERVER_HOST}logo1.png`} className="logo"/>
      </div>
      <div className="middle_content">
          {
            menu.map((item, index) => (
              <div className="item" key={Date.now() * Math.random()}>{item}</div>
            ))
          }
      </div>
      <div className="right_content">
        {/* Search */}
        <AutoComplete
          popupClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={500}
          style={{
            width: 250,
          }}
          options={options}
        >
          <Input.Search size="large" placeholder="input here" />
        </AutoComplete>
        {/* Wishlist */}
        <i className="fa-regular fa-heart"></i>
        {/* Cart */}
        <i className="fa-solid fa-bag-shopping"></i>
      </div>
    </div>
  </nav>
  )
}
