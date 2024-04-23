import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'

type CustomProps = {
  name: string
  mask: string
  value: string
  onChange: (event: { target: { name: string; value: string } }) => void
}

const InputMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
  (props, ref) => {
    const { onChange, mask, value, ...other } = props
    return (
      <IMaskInput
        {...other}
        mask={mask}
        value={value}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    )
  }
)

export default InputMaskCustom
