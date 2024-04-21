import styled from 'styled-components'
import { Grid, Typography } from '@mui/material'

interface MenuItemProps {
  selected?: boolean
}

interface MenuProps {
  options: {
    value: string
    label: string
    icon: any
  }[]
  selectedOption: any
  onChange: (value: any) => void
}

const MenuItem = styled(Grid)<MenuItemProps>`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border-radius: 4px;
  border: solid 1px ${({ selected }) => (selected ? '#ccc' : '#ddd')};
  background-color: ${({ selected }) => (selected ? '#f1f1f1' : '#ffffff')};
`

const IconWrapper = styled.div`
  margin-right: 6px;
`

export default function Menu({ options, selectedOption, onChange }: MenuProps) {
  return (
    <Grid container spacing={3} mb={3}>
      {options.map((option) => (
        <Grid key={option.value} item xs={12} sm={6}>
          <MenuItem
            onClick={() => onChange(option.value)}
            selected={option.value === selectedOption}
          >
            <IconWrapper>{option.icon}</IconWrapper>
            <Typography>{option.label}</Typography>
          </MenuItem>
        </Grid>
      ))}
    </Grid>
  )
}
