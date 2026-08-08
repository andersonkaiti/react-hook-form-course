import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from 'react-hook-form'
import { Switch } from './ui/switch'

interface IControlledSwitchProps<T extends FieldValues> {
  control?: Control<T>
  name: FieldPath<T>
}

export function ControlledSwitch<T extends FieldValues>({
  control,
  name,
}: IControlledSwitchProps<T>) {
  const {
    field: { onChange, value, ...rest },
  } = useController({
    name,
    control,
  })

  return <Switch onCheckedChange={onChange} checked={value} {...rest} />
}
