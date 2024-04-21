import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerDataType, CustomerSchema } from 'src/models/customer'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Business, Person } from '@mui/icons-material'
import { CustomerTypeMenu } from 'src/components'

const menuOptions = [
  { value: 'PF', label: 'Pessoa Física', icon: <Person /> },
  { value: 'PJ', label: 'Pessoa Jurídica', icon: <Business /> },
]

export default function CreateCustomer() {
  // hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CustomerDataType>({
    defaultValues: {
      type: 'PF',
    },
    resolver: zodResolver(CustomerSchema),
  })
  // state
  const [customerType, setCustomerType] = useState('PF')

  const handleCustomerTypeChange = (value: 'PF' | 'PJ') => {
    reset()
    setCustomerType(value)
    setValue('type', value)
  }

  const handleCreateCustomer = async (customer: CustomerDataType) => {
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

  const onSubmit = (data: CustomerDataType) => handleCreateCustomer(data)

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h5" mb={3}>
        Cadastrar novo cliente
      </Typography>

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
                error={!!errors.cnpj}
                {...register('cnpj', { required: true })}
                helperText={errors.cnpj && 'CNPJ é obrigatório'}
              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="cpf"
                label="CPF"
                error={!!errors.cpf}
                {...register('cpf', { required: true })}
                helperText={errors.cpf && 'CPF é obrigatório'}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              error={!!errors.name}
              {...register('name', { required: true })}
              helperText={errors.name && 'Nome é obrigatório'}
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
                error={!!errors.fantasy_name}
                {...register('fantasy_name', { required: true })}
                helperText={
                  errors.fantasy_name && 'Nome fantasia é obrigatório'
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
              {...register('email', { required: true })}
              helperText={errors.email && 'E-mail é obrigatório'}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phone"
              label="Telefone"
              error={!!errors.phone}
              {...register('phone', { required: true })}
              helperText={errors.phone && 'Telefone é obrigatório'}
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained">
          Salvar
        </Button>
      </form>
    </Container>
  )
}
