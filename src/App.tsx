import { ApolloClient, createHttpLink, gql, InMemoryCache, useQuery } from '@apollo/client';
import { Button, Form, Input, InputNumber } from 'antd';

import { ApolloProvider } from '@apollo/client';
import { Layout } from 'antd';
import { useState } from 'react';
import { setContext } from '@apollo/client/link/context';
const GET_SURVEY_LIST = gql`
query GetSurveyList {
  surveyList {
    surveyTitle
    regDate
    id
  }
}
`

function App() {

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

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */
  
  const [values, setValues] = useState({ name: "", email: "", password: "", birthDay:"", phoneNumber:"", userId:"" });



  const { loading, error, data } = useQuery(GET_SURVEY_LIST);
  if(loading) return (<>잠시만 기다려 주세요.</>)
  if(error) return(<>에러가 발생하였습니다.</>)

  console.log(data);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // input value 가져오기
    const { name, value } = event.target;
    console.log(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(values);
  };

  
  return (
      <div style={{maxWidth:"1280px", margin:"60px auto"}}>
        <ApolloProvider client={client}>
        <Layout className="layout">
          <Layout.Content className="content">
          <Form {...layout} name="nest-messages" validateMessages={validateMessages} style={{padding:"20px"}}>
            <Form.Item name={['user', 'name']} label="이름">
              <Input onChange={handleChange} name="name" />
            </Form.Item>
            <Form.Item name={['user', 'email']} label="이메일" rules={[{ type: 'email' }]}>
              <Input onChange={handleChange} name="email" />
            </Form.Item>
            <Form.Item name={['user', 'birthDay']} label="생년월일" rules={[{ type: 'number', min: 0, max: 99 }]}>
              <Input onChange={handleChange} name="birthDay" />
            </Form.Item>
            <Form.Item name={['user', 'phoneNumber']} label="휴대폰 번호">
              <Input onChange={handleChange} name="phoneNumber" />
            </Form.Item>
            <Form.Item name={['user', 'userId']} label="아이디">
              <Input onChange={handleChange} name="userId" />
            </Form.Item>
            <Form.Item name={['user', 'password']} label="패스워드">
              <Input onChange={handleChange} name="password" />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" onSubmit={handleSubmit}>
              회원가입
            </Button>
          </Form.Item>
        </Form>    
      </Layout.Content>
    </Layout>
    </ApolloProvider>
  </div>
  );
}

export default App;
