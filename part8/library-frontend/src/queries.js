import { gql } from "@apollo/client";

export const allAuthors = gql`
query AllAuthors {
  allAuthors {
    name
    born
    bookCount
  }
}
`
export const allBooks = gql`
query AllBooks {
  allBooks {
    title
    author
    published
  }
}
`
export const addBook = gql`
mutation AddBook($title: String!, $published: String!, $genres: [String!]!, $author: String!) {
  addBook(title: $title, published: $published, genres: $genres, author: $author) {
    title
    published
    author
    id
    genres
  }
}`

export const editAuthor = gql`
mutation EditAuthor($name: String!, $setBornTo: String!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
  }
}`