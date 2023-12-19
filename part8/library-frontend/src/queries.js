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
query AllBooks($genres: String) {
  allBooks(genres: $genres) {
    title
    published
    author {
      name
      born
      bookCount
    }
    genres
    id
  }
}
`
export const addBook = gql`
mutation AddBook($title: String!, $author: String!, $published: String!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    published
    genres
  }
}`

export const editAuthor = gql`
mutation EditAuthor($name: String!, $born: String!) {
  editAuthor(name: $name, born: $born) {
    name
    born
  }
}`

export const login = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      value
    }
  }
`

export const getUser = gql`
query{
  me{
    username
    favoriteGenre
  }
}
`

export const getBooksByGenre = 
  gql`
  query booksByGenre($genres: String!) {
    booksByGenre(genres: $genres) {
      title
      published
    }
  }`
