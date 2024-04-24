import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { Business, Person, ArrowBack } from '@mui/icons-material'
import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { CustomerDataType, CustomerSchema } from 'src/models/customer'
import { CustomerForm, CustomerTypeMenu, Notification } from 'src/components'
import { NotificationType } from 'src/components/Notification'
import { getCustomerById, updateCustomer } from 'src/services/customerService'

export default function EditCustomer() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const {
    data: customer,
    isPending,
    isFetched,
  } = useQuery({
    queryKey: ['customers', id],
    queryFn: () => !!id && getCustomerById(id),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CustomerDataType>({
    resolver: zodResolver(CustomerSchema),
  })
  const customerType = watch('type')

  const [notification, setNotification] = useState<NotificationType>({
    visible: false,
    message: '',
  })

  useEffect(() => {
    if (!!customer) reset(customer)
  }, [customer])

  const { mutate } = useMutation({
    mutationKey: ['customers'],
    mutationFn: updateCustomer,
    onError: () => {
      setNotification({
        visible: true,
        status: 'error',
        message: 'Ocorreu um erro interno ao atualizar o cliente!',
      })
    },
    onSuccess: () => {
      setNotification({
        visible: true,
        status: 'success',
        message: 'Cliente atualizado com sucesso!',
      })
    },
  })

  function handleGoBack() {
    navigate('/', { replace: true })
  }

  function handleCloseNotification() {
    setNotification({
      visible: false,
      message: '',
    })
  }

  function onSubmit(data: CustomerDataType) {
    if (!!id) mutate({ ...data, id })
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Notification
        notification={notification}
        onClose={handleCloseNotification}
      />

      <Grid display="flex" alignItems="center" flexDirection="row" mb={3}>
        <IconButton onClick={handleGoBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" ml={1}>
          Editar dados do cliente
        </Typography>
      </Grid>

      {isPending && !isFetched && (
        <Stack sx={{ width: '100%' }} spacing={2} mb={3} alignItems="center">
          <CircularProgress size={26} />
        </Stack>
      )}

      {isFetched && !customer && (
        <Stack sx={{ width: '100%' }} spacing={2} mb={3}>
          <Alert severity="warning">
            Não encontramos o ID do cliente informado. Por favor, retorne à
            lista ou tente novamente.
          </Alert>
        </Stack>
      )}

      <CustomerTypeMenu
        isEditing
        selectedOption={customerType}
        options={[
          { value: 'PF', label: 'Pessoa Física', icon: <Person /> },
          { value: 'PJ', label: 'Pessoa Jurídica', icon: <Business /> },
        ]}
      />

      <CustomerForm
        errors={errors}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        customerType={customerType}
        disabled={isPending || (isFetched && !customer)}
      />
    </Container>
  )
}
