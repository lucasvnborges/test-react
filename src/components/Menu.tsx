import styled from 'styled-components'
import { Box, Grid } from '@mui/material'
import { Business, Person } from '@mui/icons-material'

interface OptionProps {
  selected?: boolean
}

interface Props extends OptionProps {
  onChange: () => null
}

const Option = styled(Box)<OptionProps>`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border-radius: 4px;
  border: solid 1px #ddd;
  background-color: ${({ selected }) => (selected ? '#f1f1f1' : '#ffffff')};
`

const IconWrapper = styled.div`
  margin-right: 6px;
`

export default function Menu({ selected, onChange }: Props) {
  return (
    <Grid container spacing={3} mb={3}>
      <Grid item xs={12} sm={6}>
        <Option selected={selected}>
          <IconWrapper>
            <Person />
          </IconWrapper>
          Pessoa Física
        </Option>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Option selected={selected}>
          <IconWrapper>
            <Business />
          </IconWrapper>
          Pessoa Jurídica
        </Option>
      </Grid>
    </Grid>
  )
}
