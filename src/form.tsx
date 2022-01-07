import {
  Form,
  Radio,
  Button,
} from 'antd';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function FORM() {
  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
      }}
    >
      <Form.Item name="radio-group" label="평소에 PC 게임을 즐겨하십니까?">
        <Radio.Group>
          <Radio value="a">예</Radio>
          <Radio value="b">아니요</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="radio-group" label="평소에 모바일 게임을 즐겨하십니까?">
        <Radio.Group>
          <Radio value="a">예</Radio>
          <Radio value="b">아니요</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="radio-group" label="일주일에 며칠 정도 PC 게임을 하십니까?">
        <Radio.Group>
          <Radio value="a">1일 미만</Radio>
          <Radio value="b">1~2일</Radio>
          <Radio value="c">3~4일</Radio>
          <Radio value="d">5~7일</Radio>
          <Radio value="e">2주 간 거의 매일</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="radio-group" label="일주일에 며칠 정도 모바일게임을 하십니까?">
        <Radio.Group>
          <Radio value="a">1일 미만</Radio>
          <Radio value="b">1~2일</Radio>
          <Radio value="c">3~4일</Radio>
          <Radio value="d">5~7일</Radio>
          <Radio value="e">2주 간 거의 매일</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="radio-group" label="지난 일주일 동안 게임 때문에 밤을 샌 적이 있다.">
        <Radio.Group>
          <Radio value="a">0일</Radio>
          <Radio value="b">1일</Radio>
          <Radio value="c">2일</Radio>
          <Radio value="d">3일</Radio>
          <Radio value="e">4일</Radio>
          <Radio value="f">5일</Radio>
          <Radio value="g">6일</Radio>
          <Radio value="h">7일</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          제출
        </Button>
      </Form.Item>
    </Form>
  )
}