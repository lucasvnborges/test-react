import styled from 'styled-components'
import { Box, Stack } from '@mui/material'

type OptionProps = {
  selected?: boolean
}

const Option = styled(Box)<OptionProps>`
  flex: 1;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border-radius: 4px;
  border: solid 1px #ddd;
  background-color: ${({ selected }) => (selected ? '#f1f1f1' : '#ffffff')};
`

export default function Menu() {
  return (
    <Stack direction="row" spacing={2} mb={4}>
      <Option selected>Pessoa Física</Option>
      <Option>Pessoa Jurídica</Option>
    </Stack>
  )
}
