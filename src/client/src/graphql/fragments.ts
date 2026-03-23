import { gql } from '@apollo/client'

// Core user fields — reused in every query that touches a User.
// Codegen will generate a UserFields_Fragment type from this.
export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    email
    createdAt
  }
`

// Slim order shape — used inside UserWithOrders and standalone lists
export const ORDER_FIELDS = gql`
  fragment OrderFields on Order {
    id
    status
    total
    createdAt
  }
`