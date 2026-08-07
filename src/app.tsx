import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { ErrorMessage } from '@hookform/error-message'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface IFormData {
  name: string
  age: number
  zipcode: string
  street: string
  city: string
}

export function App() {
  const {
    handleSubmit: submit,
    register,
    formState,
    clearErrors,
    reset,
    setFocus,
    getValues,
    setValue,
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

  async function handleSearchZipCode() {
    const zipcode = getValues('zipcode')

    const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`)
    const data = await response.json()

    setValue('street', data.logradouro)
    setValue('city', data.localidade)
  }

  console.log('rendered')

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

        <div>
          <div className="flex gap-2">
            <Input
              placeholder="CEP"
              className="flex-1"
              {...register('zipcode')}
            />

            <Button type="button" onClick={handleSearchZipCode} variant="ghost">
              Buscar
            </Button>
          </div>

          <ErrorMessage
            errors={formState.errors}
            name="zipcode"
            render={(error) => (
              <small className="block text-red-400">{error.message}</small>
            )}
          />
        </div>

        <div>
          <Input placeholder="Rua" {...register('street')} />

          <ErrorMessage
            errors={formState.errors}
            name="street"
            render={(error) => (
              <small className="block text-red-400">{error.message}</small>
            )}
          />
        </div>

        <div>
          <Input placeholder="Cidade" {...register('city')} />

          <ErrorMessage
            errors={formState.errors}
            name="city"
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
