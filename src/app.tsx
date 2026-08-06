import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { ErrorMessage } from '@hookform/error-message'
import { Loader2 } from 'lucide-react'
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
    reset,
    setFocus,
    watch,
  } = useForm<IFormData>({
    defaultValues: {
      name: '',
      age: 18,
    },
  })

  const handleSubmit = submit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2_000))

    reset(data)

    console.log({ data })
  })

  // Assiste a alguma alteração em algum campo do formulário (o RHF cria um
  // observable por baixo dos panos e o componente escuta ele) e retorna um
  // valor reativo.
  // const [age, name] = watch(['age', 'name'])
  const age = watch('age')

  console.log('rendered')

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-4xl flex-col gap-2 p-4"
      >
        <h1>Idade: {age}</h1>

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
            disabled={
              !formState.isDirty || formState.isSubmitting || !formState.isValid
            }
          >
            {formState.isDirty && formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}
            {formState.isDirty && formState.isSubmitting
              ? 'Salvando...'
              : 'Salvar'}
          </Button>

          <Button
            type="submit"
            className="flex-1"
            disabled={formState.isDirty || formState.isSubmitting}
          >
            {!formState.isDirty && formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}
            {!formState.isDirty && formState.isSubmitting
              ? 'Enviando...'
              : 'Enviar'}
          </Button>
        </div>

        <div className="flex gap-2 self-end">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => clearErrors()}
          >
            Limpar erros
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setFocus('age')}
          >
            Focar na idade
          </Button>
        </div>
      </form>
    </div>
  )
}
