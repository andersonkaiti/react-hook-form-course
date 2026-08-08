import type { IUser } from '@app-types/user'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ControlledSwitch } from './controlled-switch'
import { Button } from './ui/button'
import { Input } from './ui/input'

const userSchema = z.object({
  blocked: z.boolean().optional(),
  name: z.string().min(1, 'Nome é obrigatório.'),
  age: z.number().min(18, 'Você precisa ser maior de idade.'),
  zipcode: z.string(),
  city: z.string().optional(),
  street: z.string().optional(),
})

type FormData = z.infer<typeof userSchema>

interface IFormProps {
  user: IUser
}

export function Form({ user }: IFormProps) {
  const form = useForm<FormData>({
    values: user,
    resetOptions: {
      keepDirtyValues: true,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(userSchema),
  })

  const {
    handleSubmit: submit,
    register,
    formState,
    clearErrors,
    reset,
    setFocus,
    setValue,
    watch,
    setError,
    trigger,
  } = form

  const handleSubmit = submit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2_000))

    reset(data)

    console.log({ data })
  })

  useEffect(() => {
    const { unsubscribe } = watch(async ({ zipcode }, { name }) => {
      if (name === 'zipcode' && zipcode && zipcode?.length < 8) {
        setError('zipcode', {
          type: 'minLength',
          message: 'O CEP deve ter 8 dígitos.',
        })
      }

      if (name === 'zipcode' && zipcode && zipcode.length >= 8) {
        const response = await fetch(
          `https://viacep.com.br/ws/${zipcode}/json/`,
        )
        const data = await response.json()

        if (data.erro) {
          setError('zipcode', {
            type: 'validate',
            message: 'O CEP informado é inválido.',
          })
        }

        setValue('street', data.logradouro)
        setValue('city', data.localidade)
      }
    })

    return () => unsubscribe()
  }, [setValue, watch, setError])

  return (
    <FormProvider {...form}>
      <div className="flex min-h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-4xl flex-col gap-2 p-4"
        >
          <div>
            <ControlledSwitch<FormData> name="blocked" />
          </div>

          <div>
            <Input placeholder="Nome" {...register('name')} />

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
                valueAsNumber: true,
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
            <Input
              placeholder="CEP"
              className="flex-1"
              {...register('zipcode')}
            />

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
              disabled={!formState.isDirty || formState.isSubmitting}
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

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => trigger()}
            >
              Forçar validação
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}
