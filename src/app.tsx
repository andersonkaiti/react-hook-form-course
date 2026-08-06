import { useForm } from 'react-hook-form'

export function App() {
  const { handleSubmit: submit, register } = useForm()

  /**
   * O handleSubmit é uma função currying: que retorna outra função.
   * No caso, ele retorna: (event?: React.BaseSyntheticEvent) => Promise<unknown>
   *
   * Ele recebe como argumento uma função chamada onValid, que é a função
   * callback que será executada quando todos os dados do formulário estiverem
   * válidos.
   */

  const handleSubmit = submit((data) => {
    console.log('Formulário submetido')

    console.log({ data })
  })

  console.log('rendered')

  /**
   * O useForm também retorna a função register, que serve para registrar
   * o input
   */

  // const inputName = form.register('name')

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" {...register('name')} />

        <input type="number" {...register('age')} />

        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}
