import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerDataType, CustomerSchema } from 'src/models/customer'
import {
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { Business, Person } from '@mui/icons-material'
import { CustomerTypeMenu } from 'src/components'
import { ArrowBack } from '@mui/icons-material'

const menuOptions = [
  { value: 'PF', label: 'Pessoa Física', icon: <Person /> },
  { value: 'PJ', label: 'Pessoa Jurídica', icon: <Business /> },
]

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

  const customerType = watch('type')

  function handleCustomerTypeChange(value: 'PF' | 'PJ') {
    reset()
    setValue('type', value)
  }

  async function handleCreateCustomer(customer: CustomerDataType) {
    try {
      const response = await fetch('/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      })

      if (response.ok) {
        console.log('Cliente criado com sucesso!')
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

  function handleGoBack() {
    navigate(-1)
  }

  function onSubmit(data: CustomerDataType) {
    handleCreateCustomer(data)
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Grid display="flex" alignItems="center" flexDirection="row" mb={3}>
        <IconButton onClick={handleGoBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" ml={1}>
          Cadastrar novo cliente
        </Typography>
      </Grid>

      <CustomerTypeMenu
        options={menuOptions}
        selectedOption={customerType}
        onChange={handleCustomerTypeChange}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} mb={3}>
          {customerType === 'PJ' ? (
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="cnpj"
                label="CNPJ"
                error={'cnpj' in errors && !!errors.cnpj}
                {...register('cnpj', { required: true })}
                helperText={'cnpj' in errors && errors.cnpj?.message}
              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="cpf"
                label="CPF"
                error={'cpf' in errors && !!errors.cpf}
                {...register('cpf', { required: true })}
                helperText={'cpf' in errors && errors.cpf?.message}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name', { required: true })}
              label={
                customerType === 'PJ' ? 'Nome da empresa' : 'Nome completo'
              }
            />
          </Grid>

          {customerType === 'PJ' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="fantasy_name"
                label="Nome fantasia"
                {...register('fantasy_name', { required: true })}
                error={'fantasy_name' in errors && !!errors.fantasy_name}
                helperText={
                  'fantasy_name' in errors && errors.fantasy_name?.message
                }
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              label="E-mail"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', { required: true })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phone"
              label="Telefone"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              {...register('phone', { required: true })}
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" sx={{ float: 'right' }}>
          Salvar
        </Button>
      </form>
    </Container>
  )
}
