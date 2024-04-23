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
import { InputMaskCustom } from 'src/components'

const menuOptions = [
  { value: 'PF', label: 'Pessoa Física', icon: <Person /> },
  { value: 'PJ', label: 'Pessoa Jurídica', icon: <Business /> },
]

export default function CreateCustomer() {
  // hooks
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
        reset()
      }
    } catch (error: any) {
      throw error
    }
  }

  function handleGoBack() {
    navigate(-1)
  }

  function onSubmit(data: CustomerDataType) {
    handleCreateCustomer(data)
  }

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
            <Grid item xs={12} key={`${customerType}-cnpj`}>
              <TextField
                {...register('cnpj')}
                fullWidth
                id="cnpj"
                label="CNPJ"
                error={'cnpj' in errors && !!errors.cnpj}
                helperText={'cnpj' in errors && errors.cnpj?.message}
                InputProps={{
                  inputComponent: InputMaskCustom as any,
                  inputProps: {
                    mask: '00.000.000/0000-00',
                  },
                }}
              />
            </Grid>
          ) : (
            <Grid item xs={12} key={`${customerType}-cpf`}>
              <TextField
                {...register('cpf')}
                fullWidth
                id="cpf"
                label="CPF"
                error={'cpf' in errors && !!errors.cpf}
                helperText={'cpf' in errors && errors.cpf?.message}
                InputProps={{
                  inputComponent: InputMaskCustom as any,
                  inputProps: {
                    mask: '000.000.000-00',
                  },
                }}
              />
            </Grid>
          )}

          <Grid item xs={12} key={`${customerType}-name`}>
            <TextField
              {...register('name')}
              fullWidth
              id="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              label={customerType === 'PJ' ? 'Razão social' : 'Nome completo'}
            />
          </Grid>

          {customerType === 'PJ' && (
            <Grid item xs={12} key={`${customerType}-fantasy_name`}>
              <TextField
                {...register('fantasy_name')}
                fullWidth
                id="fantasy_name"
                label="Nome fantasia"
                error={'fantasy_name' in errors && !!errors.fantasy_name}
                helperText={
                  'fantasy_name' in errors && errors.fantasy_name?.message
                }
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6} key={`${customerType}-email`}>
            <TextField
              {...register('email')}
              fullWidth
              id="email"
              label="E-mail"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6} key={`${customerType}-phone`}>
            <TextField
              {...register('phone')}
              fullWidth
              id="phone"
              label="Telefone"
              error={!!errors.phone}
              helperText={errors.phone?.message}
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
