import { useQuery } from "@apollo/client"
import { allBooks, getUser } from "../queries"


const Recommendations = (props) => {

const user = props.user

 const genres = user ? user.favoriteGenre : null
 
 console.log(genres)

 const booksResult = useQuery(allBooks, {variables: {genres}})
 
 if (booksResult.loading)  {
  return <div>loading...</div>
}
 
  const books = booksResult.data.allBooks  


  if (!props.show) {
    return null
  }
  
    return (
        <div>
          <h2>Recommendations</h2>
          <p>books in your favorite genres: {genres} </p>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
               ))}
            </tbody>
      </table>
        </div> 
    )
}

export default Recommendations