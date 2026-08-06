import { useForm } from 'react-hook-form'

export function App() {
  const { handleSubmit: submit, register, formState } = useForm()

  const handleSubmit = submit((data) => {
    console.log({ data })
  })

  // reativo
  console.log(formState.errors)

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            {...register('name', {
              required: {
                value: true,
                message: 'Este campo é obrigatório',
              },
              minLength: {
                value: 2,
                message: 'Tem que ter no mínimo 2 dígitos',
              },
            })}
          />

          {formState.errors.name && (
            <small className="block text-red-400">
              {formState.errors.name?.message}
            </small>
          )}
        </div>

        <div>
          <input
            type="number"
            {...register('age', {
              required: {
                value: true,
                message: 'Este campo é obrigatório',
              },
              min: {
                value: 18,
                message: 'A idade mínima é de 18 anos',
              },
              max: {
                value: 99,
                message: 'A idade máxima é de 99 anos',
              },
              setValueAs: (value) => Number(value),
            })}
          />

          {formState.errors.age && (
            <small className="block text-red-400">
              {formState.errors.age.message}
            </small>
          )}
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}
