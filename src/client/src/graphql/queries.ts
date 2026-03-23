import { gql } from '@apollo/client'
import { USER_FIELDS, ORDER_FIELDS } from './fragments'

// ─── GET_USERS ────────────────────────────────────────────────────
// Paginated list. Variables typed by codegen as GetUsersQueryVariables.
export const GET_USERS = gql`
  query GetUsers($page: Int, $limit: Int) {
    users(page: $page, limit: $limit) {
      nodes {
        ...UserFields
      }
      totalCount
      hasNextPage
    }
  }
  ${USER_FIELDS}
`

// ─── GET_USER ─────────────────────────────────────────────────────
// Single user with their orders nested.
// $id is non-nullable — codegen marks it required in the variables type.
export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserFields
      orders {
        ...OrderFields
      }
    }
  }
  ${USER_FIELDS}
  ${ORDER_FIELDS}
`

// ─── GET_ORDERS ───────────────────────────────────────────────────
// Orders filtered by status — optional variable.
export const GET_ORDERS = gql`
  query GetOrders($status: OrderStatus) {
    orders(status: $status) {
      ...OrderFields
      user {
        id
        name
      }
    }
  }
  ${ORDER_FIELDS}
`