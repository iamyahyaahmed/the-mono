import { gql } from '@apollo/client'
import { USER_FIELDS, ORDER_FIELDS } from './fragments'

// ─── LOGIN ────────────────────────────────────────────────────────
// Returns a JWT token — stored via setToken() after success.
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        ...UserFields
      }
    }
  }
  ${USER_FIELDS}
`

// ─── CREATE_USER ─────────────────────────────────────────────────
// After creation, Apollo auto-updates the cache for this User id.
// The list query (GET_USERS) needs a manual cache update — see Step 4.
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`

// ─── UPDATE_USER ─────────────────────────────────────────────────
// Apollo will auto-merge the returned fields into the cached User
// because it matches on the same id.
export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`

// ─── DELETE_USER ─────────────────────────────────────────────────
// Returns the deleted id so we can evict it from the cache manually.
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

// ─── CREATE_ORDER ────────────────────────────────────────────────
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ...OrderFields
      user {
        id
        name
      }
    }
  }
  ${ORDER_FIELDS}
`