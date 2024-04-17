import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerSchema } from 'src/models/customer'
import { Button, Container, TextField } from '@mui/material'
import Menu from './Menu'

type CustomerDataType = z.infer<typeof CustomerSchema>

export default function CreateCustomer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerDataType>({
    resolver: zodResolver(CustomerSchema),
  })

  const onSubmit = (data: CustomerDataType) => console.log(data)

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Menu />

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '40%',
          maxWidth: '40%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          label="Nome"
          variant="outlined"
          error={!!errors.name}
          style={{ marginBottom: '20px' }}
          {...register('name', { required: true })}
          helperText={errors.name && 'Nome é obrigatório'}
        />
        <TextField
          label="Email"
          variant="outlined"
          error={!!errors.email}
          style={{ marginBottom: '20px' }}
          {...register('email', { required: true })}
          helperText={errors.email && 'Email é obrigatório'}
        />
        <Button variant="contained" color="primary" type="submit">
          Cadastrar
        </Button>
      </form>
    </Container>
  )
}
