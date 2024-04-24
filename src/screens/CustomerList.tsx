import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Button,
  Box,
  Stack,
  Grid,
  Typography,
  LinearProgress,
  Alert,
} from '@mui/material'
import { AlertDialog, CustomersTable } from 'src/components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteCustomer, fetchCustomers } from 'src/services/customerService'

export default function CustomerList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data, isError, isPending } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  })

  const [modal, setModalState] = useState({
    visible: false,
    customerId: '',
  })

  function handleOpenDialog(id: string) {
    setModalState({
      visible: true,
      customerId: id,
    })
  }

  function handleCloseDialog() {
    setModalState({
      visible: false,
      customerId: '',
    })
  }

  const { mutate } = useMutation({
    mutationFn: deleteCustomer,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })

  const handleDeleteCustomer = () => {
    mutate(modal.customerId)
    handleCloseDialog()
  }

  return (
    <Container maxWidth="md">
      <AlertDialog
        show={modal.visible}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteCustomer}
      />

      <Grid item xs={12} mb={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Lista de clientes cadastrados</Typography>

          <Button
            color="primary"
            variant="outlined"
            aria-label="Buscar cliente"
            onClick={() => navigate('/cadastrar-cliente')}
          >
            Adicionar novo cliente
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12}>
        {isPending ? (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <LinearProgress />
          </Stack>
        ) : isError ? (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">
              Ocorreu um erro interno ao buscar os dados da lista de clientes.
            </Alert>
          </Stack>
        ) : (
          <CustomersTable
            customers={data}
            onDelete={handleOpenDialog}
            onEdit={(id: string) => navigate(`/editar-cliente/${id}`)}
          />
        )}
      </Grid>
    </Container>
  )
}
