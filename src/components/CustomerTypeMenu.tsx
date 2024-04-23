import styled from 'styled-components'
import { Box, Grid, Typography } from '@mui/material'

type ItemProps = {
  selected?: boolean
}

type Props = {
  options: {
    value: string
    label: string
    icon: any
  }[]
  selectedOption: any
  onChange: (value: any) => void
}

const MenuItem = styled(Grid)<ItemProps>`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border-radius: 4px;
  border: solid 1px ${({ selected }) => (selected ? '#ccc' : '#ddd')};
  background-color: ${({ selected }) => (selected ? '#f1f1f1' : '#ffffff')};
`

export default function Menu({ options, selectedOption, onChange }: Props) {
  return (
    <Grid container spacing={3} mb={3}>
      {options.map((option) => (
        <Grid key={option.value} item xs={12} sm={6}>
          <MenuItem
            onClick={() => onChange(option.value)}
            selected={option.value === selectedOption}
          >
            <Box mr={1}>{option.icon}</Box>
            <Typography>{option.label}</Typography>
          </MenuItem>
        </Grid>
      ))}
    </Grid>
  )
}
