import { useForm } from 'react-hook-form'

export function App() {
  const { handleSubmit: submit, register } = useForm()

  const handleSubmit = submit(
    (data) => {
      console.log({ data })
    },
    (errors) => {
      console.log({ errors })
    },
  )

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          {...register('name', {
            required: true,
            minLength: 2,
          })}
        />

        <input
          type="number"
          {...register('age', {
            required: true,
            min: 18,
            max: 99,
            setValueAs: (value) => Number(value),
          })}
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}
