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
}`

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
    answerTitle
  }
}`

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function FORM() {
  const [values, setValues] = useState({ email: "", password: "" });
  const { loading, error, data } = useQuery(GET_SURVEY_LIST);
  const surveyQustionList = useQuery(GET_SURVEY_QUS_LIST);
  const answer = useQuery(GET_SURVEY_ANS_LIST)
  if(loading) return (<>잠시만 기다려 주세요.</>)
  if(error) return(<>에러가 발생하였습니다.</>)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onFinish = (values: any) => {
    console.log(values);
    alert('submit');
  };

  return (
    <Layout className="layout">
    <Layout.Content className="content">
    <h1 style={{ textAlign:'center' }}>{loading ? "Loading..." : data.surveyList_by_pk.surveyTitle}</h1>
    <Form
      name="validate_other"
      {...formItemLayout}
      style={{padding:"20px"}}
      onFinish={onFinish}
    >
      {surveyQustionList.loading ? "Loading" : surveyQustionList.data.surveyQustion.map((index: any)=>{
        return (
          <Form.Item name={`radio-group${index.id}`} label={index.qustionTitle} key={index.id}>
            <Radio.Group>
              {answer.loading ? "Loading" : answer.data.surveyAnswer.map((item: any) => {
                return index.id === item.surveyQustionId ? <Radio value={item.answer}>{item.answerTitle}</Radio> : null
              })}
            </Radio.Group>
          </Form.Item>
        )
      })}
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