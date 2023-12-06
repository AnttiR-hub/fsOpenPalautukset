import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../request'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UsersInfo = () => {

  const result = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    options:
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
  )

  if( result.isLoading ){
    return <div>loading data...</div>
  }

  if( result.isError ){
    return<div>user service not available due to problem in server</div>
  }


  const users = result.data

  console.log('display', users)

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td>User</td>
            <td>Blogs created</td>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UsersInfo