# RHF Course

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7-EC5990?logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4-3E67B1?logo=zod&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-2-60A5FA?logo=biome&logoColor=white)

Projeto de estudos sobre **React Hook Form**, cobrindo desde o registro de campos até integração com validação via schema e componentes controlados.

## Tecnologias

| Ferramenta | Uso |
| --- | --- |
| [React 19](https://react.dev/) + [Vite](https://vite.dev/) | Base da aplicação |
| [React Hook Form](https://react-hook-form.com/) | Gerenciamento de formulários |
| [Zod](https://zod.dev/) + [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | Validação por schema |
| [@hookform/error-message](https://github.com/react-hook-form/error-message) | Renderização de erros |
| [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/) | Estilização e componentes |
| [Biome](https://biomejs.dev/) | Lint e formatação |
| [Husky](https://typicode.github.io/husky/) + [commitlint (gitmoji)](https://github.com/arvinxx/commitlint-config-gitmoji) | Padronização de commits |

## Tópicos estudados

Os tópicos abaixo seguem a ordem em que foram trabalhados ao longo dos commits:

- Diferença entre componentes controlados e não controlados
- Gerenciamento de formulários com `react-hook-form` e `register`
- Validação de campos e tratamento de erros
- Exibição de mensagens de erro por campo (manualmente e com `@hookform/error-message`)
- Tipagem dos dados do formulário com interface
- Regras de validação customizadas com `validate`
- `defaultValues`, estado `isDirty` e ação `clearErrors`
- Submit assíncrono com estado de loading (`isSubmitting`) e `reset`
- Foco programático em campos com `setFocus`
- Reatividade com `watch` (campo reativo e subscription)
- Leitura e escrita de valores com `getValues` e `setValue`
- Busca automática de endereço a partir do CEP
- Erros manuais com `setError`
- Validação manual forçada com `trigger`
- `defaultValues` assíncronos com indicador de `isLoading`
- Prop reativa `values` e `keepDirtyValues` para preservar o que o usuário digitou
- Modos de validação (`mode` e `reValidateMode`)
- Resolver customizado para integrar validação externa
- Validação por schema com Zod via `zodResolver`
- Integração de componentes controlados com `Controller`
- Migração de `Controller` para `useController` e compartilhamento de contexto com `FormProvider`
