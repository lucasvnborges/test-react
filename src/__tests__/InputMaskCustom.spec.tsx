import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InputMaskCustom } from 'src/components'
import { TextField } from '@mui/material'

describe('TextField with InputMaskCustom', () => {
  test('should only accept numbers when typing', () => {
    render(
      <TextField
        fullWidth
        id="cpf"
        label="CPF"
        InputProps={{
          inputComponent: InputMaskCustom as any,
          inputProps: {
            mask: '000.000.000-00',
          },
        }}
      />
    )
    const input = screen.getByRole('textbox')

    userEvent.type(input, 'a1!')

    expect(input).toHaveValue('1')
  })

  test('should correctly format the value with the mask', () => {
    render(
      <TextField
        fullWidth
        id="cpf"
        label="CPF"
        InputProps={{
          inputComponent: InputMaskCustom as any,
          inputProps: {
            mask: '000.000.000-00',
          },
        }}
      />
    )
    const input = screen.getByRole('textbox')

    userEvent.type(input, '12345678900')

    expect(input).toHaveValue('123.456.789-00')
  })
})
