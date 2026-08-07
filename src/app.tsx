import type { IUser } from '@app-types/user'
import { Form } from '@components/form'
import { useEffect, useState } from 'react'

async function getUser() {
  await new Promise((resolve) => setTimeout(resolve, 2_000))

  return {
    name: 'Anderson Kaiti',
    age: 22,
    city: 'Bauru',
    street: 'Hoje não, sequestrador',
    zipcode: '88888888',
  }
}

export function App() {
  const [user, setUser] = useState<IUser>({} as IUser)

  useEffect(() => {
    getUser().then((user) => setUser(user))
  }, [])

  console.log('rendered')

  return <Form user={user} />
}
