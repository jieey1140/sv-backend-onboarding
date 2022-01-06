import { Button, Form, Input, InputNumber } from 'antd';
import {DatePicker, Layout} from 'antd';

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
  
  const Demo = () => {
    const onFinish = (values: any) => {
      console.log(values);
    };
  }
  
  return (
    <Layout className="layout">
          {/* <Layout.Header className="header"><h1>Hello world</h1></Layout.Header> */}
          <Layout.Content className="content">
          <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
              
          </Layout.Content>
          {/* <Layout.Footer className="footer">footer</Layout.Footer> */}
    </Layout>
  );
}

export default App;
