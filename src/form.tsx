import {
  Button,
  Form,
  Layout,
  Radio,
} from 'antd';

import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GET_SURVEY, POST_SURVEY } from './sql';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function FORM() {
  const { loading, error, data} = useQuery(GET_SURVEY)
  const [postSurvey] = useMutation(POST_SURVEY, { onCompleted: postSurveyCompleted });
  function execPostUser (values: any) {
    console.log(values)
    postSurvey({
      variables: {
        userId:"jieey11401",
        surveyId:1,

        answer1: values.surveyQustionId1,
        surveyQustionId1: "1",

        answer3: values.surveyQustionId3,
        surveyQustionId3: "3",
      
        answer4: values.surveyQustionId4,
        surveyQustionId4: "4",
      
        answer5: values.surveyQustionId5,
        surveyQustionId5: "5",
      
        answer6: values.surveyQustionId6,
        surveyQustionId6: "6",
      }
    })
  }
   
  function postSurveyCompleted (data: any) {
    console.log(data);
    toast(`설문지 등록이 완료되었습니다.`);
  }

  const [values, setValues] = useState({ email: "", password: "" });

  if(loading) return (<>잠시만 기다려 주세요.</>)
  if(error) return(<>에러가 발생하였습니다.</>)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout className="layout">
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
    <Layout.Content className="content">
    <h1 style={{ textAlign:'center' }}>{loading ? "Loading..." : data.surveyList_by_pk.surveyTitle}</h1>
    <Form
      name="validate_other"
      {...formItemLayout}
      style={{padding:"20px"}}
      onFinish={execPostUser}
    >
      {data.surveyQustion.map((index: any)=>{
        return (
          <Form.Item name={`surveyQustionId${index.id}`} label={index.qustionTitle} key={index.id}>
            <Radio.Group>
              {data.surveyAnswer.map((item: any) => {
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