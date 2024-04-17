import styled from 'styled-components'
import { useEffect, useState } from 'react'
import {
  Container,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
} from '@mui/material'
import { Search, Edit, Delete } from '@mui/icons-material'

const CustomCell = styled(TableCell)`
  right: 0;
  z-index: 1;
  height: 64px;
  position: sticky;
  position: -webkit-sticky;
  background-color: #fff;
`

export default function CustomerList() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/clientes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar clientes')
        }
        return response.json()
      })
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        console.error('Erro ao buscar clientes:', error)
      })
  }, [])

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="row" alignItems="center">
        <FormControl sx={{ m: 1, flex: 1 }} variant="outlined">
          <OutlinedInput
            type="text"
            id="input-buscar-clientes"
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" aria-label="">
                  <Search />
                </IconButton>
              </InputAdornment>
            }
            placeholder="Buscar por nome, razão social, CPF ou CNPJ"
          />
        </FormControl>

        <Button variant="contained" color="primary">
          Buscar
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ m: 1, mt: 3 }}>
        <Table aria-label="listagem de clientes" sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Nome fantasia</TableCell>
              <TableCell>CPF / CNPJ</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row: any) => (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  overflowX: 'auto',
                }}
              >
                <TableCell>{row.type}</TableCell>
                <TableCell sx={{ maxWidth: '90px' }}>
                  {row.name.toLowerCase()}
                </TableCell>

                <TableCell sx={{ maxWidth: '90px' }}>
                  {row.type === 'PJ' ? row.company_name.toLowerCase() : '-'}
                </TableCell>
                <TableCell sx={{ maxWidth: '70px' }}>
                  {row.type === 'PJ' ? row.cnpj : row.cpf}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>

                <CustomCell padding="checkbox">
                  <Stack direction="row" alignItems="center" spacing={1} m={1}>
                    <IconButton aria-label="editar" size="small">
                      <Edit fontSize="inherit" />
                    </IconButton>

                    <IconButton aria-label="deletar" size="small">
                      <Delete fontSize="inherit" />
                    </IconButton>
                  </Stack>
                </CustomCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
