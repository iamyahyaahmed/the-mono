/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment UserFields on User {\n    id\n    name\n    email\n    createdAt\n  }\n": typeof types.UserFieldsFragmentDoc,
    "\n  fragment OrderFields on Order {\n    id\n    status\n    total\n    createdAt\n  }\n": typeof types.OrderFieldsFragmentDoc,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        ...UserFields\n      }\n    }\n  }\n  \n": typeof types.LoginDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ...UserFields\n    }\n  }\n  \n": typeof types.CreateUserDocument,
    "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      ...UserFields\n    }\n  }\n  \n": typeof types.UpdateUserDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id) {\n      id\n    }\n  }\n": typeof types.DeleteUserDocument,
    "\n  mutation CreateOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      ...OrderFields\n      user {\n        id\n        name\n      }\n    }\n  }\n  \n": typeof types.CreateOrderDocument,
    "\n  query GetUsers($page: Int, $limit: Int) {\n    users(page: $page, limit: $limit) {\n      nodes {\n        ...UserFields\n      }\n      totalCount\n      hasNextPage\n    }\n  }\n  \n": typeof types.GetUsersDocument,
    "\n  query GetUser($id: ID!) {\n    user(id: $id) {\n      ...UserFields\n      orders {\n        ...OrderFields\n      }\n    }\n  }\n  \n  \n": typeof types.GetUserDocument,
    "\n  query GetOrders($status: OrderStatus) {\n    orders(status: $status) {\n      ...OrderFields\n      user {\n        id\n        name\n      }\n    }\n  }\n  \n": typeof types.GetOrdersDocument,
};
const documents: Documents = {
    "\n  fragment UserFields on User {\n    id\n    name\n    email\n    createdAt\n  }\n": types.UserFieldsFragmentDoc,
    "\n  fragment OrderFields on Order {\n    id\n    status\n    total\n    createdAt\n  }\n": types.OrderFieldsFragmentDoc,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        ...UserFields\n      }\n    }\n  }\n  \n": types.LoginDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ...UserFields\n    }\n  }\n  \n": types.CreateUserDocument,
    "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      ...UserFields\n    }\n  }\n  \n": types.UpdateUserDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id) {\n      id\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation CreateOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      ...OrderFields\n      user {\n        id\n        name\n      }\n    }\n  }\n  \n": types.CreateOrderDocument,
    "\n  query GetUsers($page: Int, $limit: Int) {\n    users(page: $page, limit: $limit) {\n      nodes {\n        ...UserFields\n      }\n      totalCount\n      hasNextPage\n    }\n  }\n  \n": types.GetUsersDocument,
    "\n  query GetUser($id: ID!) {\n    user(id: $id) {\n      ...UserFields\n      orders {\n        ...OrderFields\n      }\n    }\n  }\n  \n  \n": types.GetUserDocument,
    "\n  query GetOrders($status: OrderStatus) {\n    orders(status: $status) {\n      ...OrderFields\n      user {\n        id\n        name\n      }\n    }\n  }\n  \n": types.GetOrdersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserFields on User {\n    id\n    name\n    email\n    createdAt\n  }\n"): (typeof documents)["\n  fragment UserFields on User {\n    id\n    name\n    email\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OrderFields on Order {\n    id\n    status\n    total\n    createdAt\n  }\n"): (typeof documents)["\n  fragment OrderFields on Order {\n    id\n    status\n    total\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        ...UserFields\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        ...UserFields\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ...UserFields\n    }\n  }\n  \n"): (typeof documents)["\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ...UserFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      ...UserFields\n    }\n  }\n  \n"): (typeof documents)["\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      ...UserFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      ...OrderFields\n      user {\n        id\n        name\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation CreateOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      ...OrderFields\n      user {\n        id\n        name\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers($page: Int, $limit: Int) {\n    users(page: $page, limit: $limit) {\n      nodes {\n        ...UserFields\n      }\n      totalCount\n      hasNextPage\n    }\n  }\n  \n"): (typeof documents)["\n  query GetUsers($page: Int, $limit: Int) {\n    users(page: $page, limit: $limit) {\n      nodes {\n        ...UserFields\n      }\n      totalCount\n      hasNextPage\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUser($id: ID!) {\n    user(id: $id) {\n      ...UserFields\n      orders {\n        ...OrderFields\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  query GetUser($id: ID!) {\n    user(id: $id) {\n      ...UserFields\n      orders {\n        ...OrderFields\n      }\n    }\n  }\n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrders($status: OrderStatus) {\n    orders(status: $status) {\n      ...OrderFields\n      user {\n        id\n        name\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query GetOrders($status: OrderStatus) {\n    orders(status: $status) {\n      ...OrderFields\n      user {\n        id\n        name\n      }\n    }\n  }\n  \n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;