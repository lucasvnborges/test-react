import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { CustomerDataType } from 'src/models/customer'
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
  Grid,
} from '@mui/material'
import { Search, Edit, Delete } from '@mui/icons-material'

const CustomCell = styled(TableCell)`
  right: 0;
  z-index: 1;
  height: 64px;
  position: sticky;
  position: -webkit-sticky;
  background-color: rgb(250 250 250 / 80%);
`

const NameColumn = styled(TableCell)`
  font-weight: bold;
`

export default function CustomerList() {
  const [data, setData] = useState<CustomerDataType[]>()

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
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Grid item xs={12}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <FormControl sx={{ mr: 1, flex: 1 }} variant="outlined">
            <OutlinedInput
              type="text"
              id="input-buscar-clientes"
              endAdornment={
                <Box mr={1}>
                  <InputAdornment position="end">
                    <IconButton edge="end" aria-label="">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                </Box>
              }
              placeholder="Buscar cliente(s) por Tipo, Nome, Nome Fantasia, Documento, E-mail ou Telefone"
            />
          </FormControl>

          <Button
            color="primary"
            variant="contained"
            aria-label="Buscar cliente"
          >
            Buscar
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table aria-label="Lista de clientes">
            <TableHead>
              <TableRow>
                <NameColumn>Tipo</NameColumn>
                <NameColumn>Nome</NameColumn>
                <NameColumn>Nome fantasia</NameColumn>
                <NameColumn>CPF / CNPJ</NameColumn>
                <NameColumn>E-mail</NameColumn>
                <NameColumn>Telefone</NameColumn>
                <NameColumn></NameColumn>
              </TableRow>
            </TableHead>

            <TableBody>
              {data &&
                data.map((row, index) => (
                  <TableRow key={row.name + index}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {row.type}
                    </TableCell>
                    <TableCell sx={{ minWidth: '180px' }}>{row.name}</TableCell>
                    <TableCell sx={{ minWidth: '180px' }}>
                      {row.fantasy_name && row.type === 'PJ'
                        ? row.fantasy_name
                        : '-'}
                    </TableCell>
                    <TableCell sx={{ minWidth: '130px' }}>
                      {row.type === 'PJ' ? row.cnpj : row.cpf}
                    </TableCell>
                    <TableCell sx={{ minWidth: '110px' }}>
                      {row.email}
                    </TableCell>
                    <TableCell sx={{ minWidth: '110px' }}>
                      {row.phone}
                    </TableCell>

                    <CustomCell padding="checkbox">
                      <Stack
                        m={1}
                        spacing={1}
                        direction="row"
                        alignItems="center"
                      >
                        <IconButton
                          size="medium"
                          color="inherit"
                          aria-label="Editar cliente"
                        >
                          <Edit fontSize="inherit" />
                        </IconButton>

                        <IconButton
                          size="medium"
                          color="error"
                          aria-label="Excluir cliente"
                        >
                          <Delete fontSize="inherit" />
                        </IconButton>
                      </Stack>
                    </CustomCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  )
}
