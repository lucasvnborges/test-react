import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'

type Props = {
  name: string
  mask: string
  onChange: (event: { target: { name: string; value: string } }) => void
}

const InputMaskCustom = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { onChange, mask, ...other } = props
    return (
      <IMaskInput
        {...other}
        mask={mask}
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
