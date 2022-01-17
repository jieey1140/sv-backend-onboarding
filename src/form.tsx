import {
  Button,
  Form,
  Layout,
  Radio,
} from 'antd';

import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from 'react';
const GET_SURVEY_LIST = gql`
query GetSurveyList {
  surveyList_by_pk(id: 1) {
    regDate
    surveyTitle
  }
}
`

const GET_SURVEY_QUS_LIST = gql`

query surveyQustionList {
   surveyQustion {
    qustionTitle
    surveyId
    id
  }
}`


const GET_SURVEY_ANS_LIST = gql`
query surveyAnswerList {
  surveyAnswer {
    surveyId
    surveyQustionId
    answer
  }
}`



const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function FORM() {
  const [values, setValues] = useState({ email: "", password: "" });
  const { loading, error, data } = useQuery(GET_SURVEY_LIST);
  const res2 = useQuery(GET_SURVEY_QUS_LIST);
  const answer = useQuery(GET_SURVEY_ANS_LIST)
  if(loading) return (<>잠시만 기다려 주세요.</>)
  if(error) return(<>에러가 발생하였습니다.</>)
console.log(answer.data.surveyAnswer)
console.log(res2.data.surveyQustion)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Layout className="layout">
    <Layout.Content className="content">
    <h1 style={{ textAlign:'center' }}>{loading ? "Loading..." : data.surveyList_by_pk.surveyTitle}</h1>
    <Form
      name="validate_other"
      {...formItemLayout}
      style={{padding:"20px"}}
    >
      {res2.loading ? "Loading" : res2.data.surveyQustion.map((index: any)=>{
        return (answer.data.surveyAnswer.map((item: any) => {
          return <>{item.answer}</>
        }))
      })}
      <Form.Item name="radio-group1" label="평소에 PC 게임을 즐겨하십니까?">
        <Radio.Group>
          <Radio value="1">예</Radio>
          <Radio value="2">아니요</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="radio-group2" label="평소에 모바일 게임을 즐겨하십니까?">
        <Radio.Group>
          <Radio value="1">예</Radio>
          <Radio value="2">아니요</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="radio-group3" label="일주일에 며칠 정도 PC 게임을 하십니까?">
        <Radio.Group>
          <Radio value="1">1일 미만</Radio>
          <Radio value="2">1~2일</Radio>
          <Radio value="3">3~4일</Radio>
          <Radio value="4">5~7일</Radio>
          <Radio value="5">2주 간 거의 매일</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="radio-group4" label="일주일에 며칠 정도 모바일게임을 하십니까?">
        <Radio.Group>
          <Radio value="1">1일 미만</Radio>
          <Radio value="2">1~2일</Radio>
          <Radio value="3">3~4일</Radio>
          <Radio value="4">5~7일</Radio>
          <Radio value="5">2주 간 거의 매일</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="radio-group5" label="지난 일주일 동안 게임 때문에 밤을 샌 적이 있다.">
        <Radio.Group>
          <Radio value="1">0일</Radio>
          <Radio value="2">1일</Radio>
          <Radio value="3">2일</Radio>
          <Radio value="4">3일</Radio>
          <Radio value="5">4일</Radio>
          <Radio value="6">5일</Radio>
          <Radio value="7">6일</Radio>
          <Radio value="8">7일</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          제출
        </Button>
      </Form.Item>
    </Form>
  </Layout.Content>
</Layout>
  )
}