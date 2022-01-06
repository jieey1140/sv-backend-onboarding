import { Button, Form, Input, InputNumber } from 'antd';

import { Layout } from 'antd';

function App() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
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
  
  return (
      <div style={{maxWidth:"1280px", margin:"60px auto"}}>
        <Layout className="layout">
          <Layout.Content className="content">
          <Form {...layout} name="nest-messages" validateMessages={validateMessages} style={{padding:"20px"}}>
            <Form.Item name={['user', 'name']} label="이름">
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'email']} label="이메일" rules={[{ type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'birthDay']} label="생년월일" rules={[{ type: 'number', min: 0, max: 99 }]}>
              <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'phoneNumber']} label="휴대폰 번호">
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'userId']} label="아이디">
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'password']} label="패스워드">
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
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
