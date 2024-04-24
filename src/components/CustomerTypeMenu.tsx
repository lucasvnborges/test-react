import styled from 'styled-components'
import { Box, Grid, Typography } from '@mui/material'

type ItemProps = {
  selected?: boolean
  disabled?: boolean
}

type Props = {
  options: {
    value: string
    label: string
    icon: any
  }[]
  selectedOption: any
  onChange?: (value: any) => void
  isEditing?: boolean
}

const MenuItem = styled(Grid)<ItemProps>`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border-radius: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border: solid 1px ${({ selected }) => (selected ? '#ccc' : '#ddd')};
  background-color: ${({ selected }) => (selected ? '#f1f1f1' : '#ffffff')};
`

export default function Menu({
  options,
  selectedOption,
  onChange,
  isEditing,
}: Props) {
  return (
    <Grid container spacing={3} mb={3}>
      {options.map((option) => (
        <Grid key={option.value} item xs={12} sm={6}>
          <MenuItem
            selected={option.value === selectedOption}
            disabled={isEditing && option.value !== selectedOption}
            onClick={() => !isEditing && onChange && onChange(option.value)}
          >
            <Box mr={1}>{option.icon}</Box>
            <Typography>{option.label}</Typography>
          </MenuItem>
        </Grid>
      ))}
    </Grid>
  )
}
