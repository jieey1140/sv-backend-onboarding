import 'antd/dist/antd.css';

import { Layout, Menu } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client';
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


const httpLink = createHttpLink({
  uri: 'https://select-duckling-42.hasura.app/v1/graphql',
});

const ApolloClientLink = setContext((_, { headers }) => {
  const token = '5kS1MtfPDEMNLpIMOLtzdqHPl6mf18WxFaXjFTGlvaCwu0VHGZNU1gfSOz1U69Az';
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": token
    }
  }
});

const client = new ApolloClient({
  link: ApolloClientLink.concat(httpLink),
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <React.StrictMode>
      <Layout className="layout">
      <ApolloProvider client={client}>
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
    </ApolloProvider>
  </Layout>,

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
