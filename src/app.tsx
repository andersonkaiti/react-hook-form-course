import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { ErrorMessage } from '@hookform/error-message'
import { useForm } from 'react-hook-form'

interface IFormData {
  name: string
  age: number
}

export function App() {
  const { handleSubmit: submit, register, formState } = useForm<IFormData>()

  const handleSubmit = submit((data) => {
    console.log({ data })
  })

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-4xl flex-col gap-2 p-4"
      >
        <div>
          <Input
            placeholder="Nome"
            {...register('name', {
              required: {
                value: true,
                message: 'Preencha o nome.',
              },
            })}
          />

          <ErrorMessage
            errors={formState.errors}
            name="name"
            render={(error) => (
              <small className="block text-red-400">{error.message}</small>
            )}
          />
        </div>

        <div>
          <Input
            placeholder="Idade"
            type="number"
            {...register('age', {
              required: {
                value: true,
                message: 'Preencha a idade.',
              },
            })}
          />

          <ErrorMessage
            errors={formState.errors}
            name="age"
            render={(error) => (
              <small className="block text-red-400">{error.message}</small>
            )}
          />
        </div>

        <Button type="submit" className="mt-4">
          Enviar
        </Button>
      </form>
    </div>
  )
}
