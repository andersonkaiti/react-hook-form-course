import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { ErrorMessage } from '@hookform/error-message'
import { useForm } from 'react-hook-form'

interface IFormData {
  name: string
  age: number
}

export function App() {
  const {
    handleSubmit: submit,
    register,
    formState,
    clearErrors,
  } = useForm<IFormData>({
    // Para identificar se o input está "dirty" ou não, é necessário adicionar
    // valores-padrão, até porque undefined !== ''
    defaultValues: {
      name: '',
      age: 18,
    },
  })

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
              setValueAs: (age) => Number(age),
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

        <div className="mt-4 flex gap-2">
          <Button
            type="submit"
            className="flex-1"
            disabled={!formState.isDirty}
          >
            Salvar
          </Button>

          <Button type="submit" className="flex-1" disabled={formState.isDirty}>
            Enviar
          </Button>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="self-end"
          onClick={() => clearErrors()}
        >
          Limpar erros
        </Button>
      </form>
    </div>
  )
}
