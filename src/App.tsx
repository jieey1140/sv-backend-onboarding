
import { gql, useMutation } from '@apollo/client';
import { Button, Form, Input } from 'antd';
import { Layout } from 'antd';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

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

const POST_USER = gql`
mutation (
  $birthDay: String
  $email: String
  $gender: gender
  $name: String
  $password: String
  $phoneNumber: String
  $userId: String
) {
  insert_users_one(object:{
    birthDay: $birthDay
    email: $email
    gender: $gender
    name: $name
    password: $password
    phoneNumber: $phoneNumber
    userId: $userId
  }) {
    birthDay
    email
    gender
    name
    password
    phoneNumber
    userId
  }
}`

function execPostUser () {
  console.log({input: values})
  postUser({
    variables: {
      birthDay: values.birthDay,
      email: values.email,
      gender: 'M',
      name: values.name,
      password: values.password,
      phoneNumber: values.phoneNumber,
      userId: values.userId
    }
  })
}

  const [postUser] = useMutation(POST_USER, { onCompleted: postUserCompleted });
  function postUserCompleted (data: any) {
    console.log(data);
    toast(`${values.userId} 회원가입이 완료되었습니다.`);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setValues({ ...values, [name]: value });
  };
  
  return (
      <div style={{maxWidth:"1280px", margin:"60px auto"}}>
        <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        <Layout className="layout">
          <Layout.Content className="content">
          <Form {...layout} name="nest-messages" validateMessages={validateMessages} style={{padding:"20px"}}>
            <Form.Item name={['user', 'name']} label="이름">
              <Input onChange={handleChange} name="name" />
            </Form.Item>
            <Form.Item name={['user', 'email']} label="이메일" rules={[{ type: 'email' }]}>
              <Input onChange={handleChange} name="email" />
            </Form.Item>
            <Form.Item name={['user', 'birthDay']} label="생년월일" rules={[{ type: 'string', min: 0, max: 99 }]}>
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
            <Button type="primary" htmlType="submit" onClick={execPostUser}>
              회원가입
            </Button>
          </Form.Item>
        </Form>    
      </Layout.Content>
    </Layout>
  </div>
  );
}

export default App;
