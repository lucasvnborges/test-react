import { Grid, TextField, Button } from '@mui/material'
import { InputMaskCustom } from 'src/components'

export default function CustomerForm({
  onSubmit,
  customerType,
  register,
  errors,
  handleSubmit,
}: any) {
  return (
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
            InputProps={{
              inputComponent: InputMaskCustom as any,
              inputProps: {
                mask: '(00) 00000-0000',
              },
            }}
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" sx={{ float: 'right' }}>
        Salvar
      </Button>
    </form>
  )
}
