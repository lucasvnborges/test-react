import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { Business, Person, ArrowBack } from '@mui/icons-material'
import { Container, Grid, IconButton, Typography } from '@mui/material'
import { CustomerDataType, CustomerSchema } from 'src/models/customer'
import { CustomerForm, CustomerTypeMenu, Notification } from 'src/components'
import { NotificationStatus } from 'src/components/Notification'
import { createCustomer } from 'src/services/customerService'

export default function CreateCustomer() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CustomerDataType>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      type: 'PF',
    },
  })

  const [notification, setNotification] = useState<{
    message: string
    visible: boolean
    status?: NotificationStatus
  }>({
    visible: false,
    message: '',
  })

  const customerType = watch('type')

  function handleCustomerTypeChange(value: 'PF' | 'PJ') {
    reset()
    setValue('type', value)
  }

  const { mutate } = useMutation({
    mutationKey: ['customers'],
    mutationFn: createCustomer,
    onError: () => {
      setNotification({
        visible: true,
        status: 'error',
        message: 'Ocorreu um erro interno ao cadastrar o novo cliente!',
      })
    },
    onSuccess: () => {
      setNotification({
        visible: true,
        status: 'success',
        message: 'Novo cliente criado com sucesso!',
      })
      reset()
      setValue('type', customerType)
    },
  })

  function handleGoBack() {
    navigate(-1)
  }

  function handleCloseNotification() {
    setNotification({
      visible: false,
      message: '',
    })
  }

  function onSubmit(data: CustomerDataType) {
    mutate(data)
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
          Cadastrar novo cliente
        </Typography>
      </Grid>

      <CustomerTypeMenu
        options={[
          { value: 'PF', label: 'Pessoa Física', icon: <Person /> },
          { value: 'PJ', label: 'Pessoa Jurídica', icon: <Business /> },
        ]}
        selectedOption={customerType}
        onChange={handleCustomerTypeChange}
      />

      <CustomerForm
        errors={errors}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        customerType={customerType}
      />
    </Container>
  )
}
