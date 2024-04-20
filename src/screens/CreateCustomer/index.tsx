import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerDataType, CustomerSchema } from 'src/models/customer'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Menu } from 'src/components'

export default function CreateCustomer() {
  // hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerDataType>({
    defaultValues: {
      type: 'PJ',
    },
    resolver: zodResolver(CustomerSchema),
  })
  // state
  const [isCompany, setIsCompany] = useState(true)

  const createUser = (customer: CustomerDataType) => {
    fetch('/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao criar cliente')
        }

        reset();
      })
      .catch((error) => {
        console.error('Erro ao criar cliente:', error)
      })
  }

  const onSubmit = (data: CustomerDataType) => createUser(data)

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      {errors.type && <span>{errors.type.message}</span>}
      {errors.name && <span>{errors.name.message}</span>}
      {errors.cpf && <span>{errors.cpf.message}</span>}
      {errors.email && <span>{errors.email.message}</span>}
      {errors.phone && <span>{errors.phone.message}</span>}
      {errors.fantasy_name && <span>{errors.fantasy_name.message}</span>}

      <Typography variant="h5" mb={3}>
        Cadastrar novo cliente
      </Typography>

      <Menu />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} mb={3}>
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              error={!!errors.name}
              {...register('name', { required: true })}
              helperText={errors.name && 'Nome é obrigatório'}
              label={isCompany ? 'Nome da empresa' : 'Nome completo'}
            />
          </Grid>

          {isCompany && (
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
