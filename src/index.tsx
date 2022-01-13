import 'antd/dist/antd.css';

import { Breadcrumb, Layout, Menu } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Content, Footer, Header } from 'antd/lib/layout/layout';

import App from './App';
import Form from './form';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

const navMenu = [
  {id: 0, NavTitle:"메인", Href: "/"},
  {id: 1, NavTitle:"회원가입", Href: "/register"},
  {id: 2, NavTitle:"설문지", Href: "/form"},
]

ReactDOM.render(
  <React.StrictMode>
      <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        {navMenu.map((index) => {
          return <Menu.Item key={index.id}><a href={index.Href}>{index.NavTitle}</a></Menu.Item>;
        })}
      </Menu>
    </Header>
    <Content style={{ padding: '50px', maxWidth: "1280px" }}>
      <BrowserRouter>  
     <Routes>
      <Route path="/register" element={< App/>} />
      <Route path="/form" element={< Form/>} />
    </Routes>
    </BrowserRouter>  
    </Content>
    <Footer style={{ textAlign: 'center' }}>&copy; 2022</Footer>
  </Layout>,
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
