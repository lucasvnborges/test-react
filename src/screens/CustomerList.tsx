import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Typography,
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
  // hooks
  const navigate = useNavigate()
  // state
  const [customers, setCustomers] = useState<CustomerDataType[]>([])

  const getCustomers = async () => {
    try {
      const response = await fetch('/clientes')
      const data = await response.json()

      if (response.ok) {
        setCustomers(data)
      } else if (response.status === 400) {
        const errorData = await response.json()
        throw new Error(`${errorData.message}`)
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    } catch (error: any) {
      console.error(error.message)
      throw error
    }
  }

  useEffect(() => {
    getCustomers()
  }, [])

  return (
    <Container maxWidth="md">
      <Grid item xs={12} mt={6} mb={6}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <FormControl fullWidth variant="outlined" sx={{ mr: 1 }}>
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

      <Grid item xs={12} mb={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Lista de clientes cadastrados</Typography>

          <Button
            color="primary"
            variant="outlined"
            aria-label="Buscar cliente"
            onClick={() => navigate('/novo-cliente')}
          >
            Adicionar novo cliente
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
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
              {customers.length > 0 &&
                customers.map((row, index) => (
                  <TableRow key={row.name + index}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {row.type}
                    </TableCell>
                    <TableCell sx={{ minWidth: '180px' }}>{row.name}</TableCell>
                    <TableCell sx={{ minWidth: '180px' }}>
                      {'fantasy_name' in row &&
                      row.fantasy_name &&
                      row.type === 'PJ'
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
