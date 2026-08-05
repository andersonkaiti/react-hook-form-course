import { useRef, useState } from 'react'

export function App() {
  const [age, setAge] = useState('')

  const inputNameRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log({
      age,
      name: inputNameRef.current?.value,
    })
  }

  console.log('rendered')

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" ref={inputNameRef} />

        <input
          type="number"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}
