import { gql } from "@apollo/client";

export const POST_USER = gql`
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
