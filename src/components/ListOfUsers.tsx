import {
  Table,
  TableCaption,
  TableContainer,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import useSWR from 'swr'

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    suite: string
    city: String
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  company: {
    bs: string
    catchPhrase: string
    name: string
  }
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ListOfProducts() {
  const { data, error, isLoading } = useSWR(
    'https://jsonplaceholder.typicode.com/users',
    fetcher
  )

  console.log(data, error, isLoading)

  if (isLoading) return <strong>Loading...</strong>
  if (error) return <strong>Error ocurred</strong>

  return (
    <div className="container mx-auto">
      <TableContainer>
        <Table variant="simple">
          <TableCaption>List of users</TableCaption>

          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Username</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((user: User) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                </Tr>
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Username</Th>
              <Th>Email</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  )
}
