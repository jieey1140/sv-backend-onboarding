import { gql } from "@apollo/client"

export const GET_SURVEY = gql`
query {
  surveyList_by_pk(id: 1) {
    id
    regDate
    surveyTitle
  }
  surveyQustion {
    qustionTitle
    surveyId
    id
  }
  surveyAnswer {
    surveyId
    surveyQustionId
    answer
    answerTitle
  }
}
`

export const POST_SURVEY = gql`
mutation MyQuery(
  $userId: String
  $surveyId: Int

  $surveyQustionId1: Int
  $answer1: survey_result

  $answer3: survey_result
  $surveyQustionId3: Int

  $answer4: survey_result
  $surveyQustionId4: Int

  $answer5: survey_result
  $surveyQustionId5: Int

  $answer6: survey_result
  $surveyQustionId6: Int
) {
  insert_surveyUserAnswer(
    objects:[
    {
      answer: $answer1, 
      surveyId: $surveyId, 
      surveyQustionId: $surveyQustionId1, 
      userId: $userId
    },
    {
      answer: $answer3, 
      surveyId: $surveyId, 
      surveyQustionId: $surveyQustionId3, 
      userId: $userId
    },
    {
      answer: $answer4, 
      surveyId: $surveyId, 
      surveyQustionId: $surveyQustionId4, 
      userId: $userId
    },
    {
      answer: $answer5, 
      surveyId: $surveyId, 
      surveyQustionId: $surveyQustionId5, 
      userId: $userId
    },    {
      answer: $answer6, 
      surveyId: $surveyId, 
      surveyQustionId: $surveyQustionId6, 
      userId: $userId
    },
  ]) {
    affected_rows
  }
}
`