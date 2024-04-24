import {
  Grid,
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material'
import { Search } from '@mui/icons-material'

export default function SearchBar({ onSearch }) {
  const handleSearch = () => {
    // Implemente a lógica de busca aqui, utilizando a função onSearch passada como prop
  }

  return (
    <Grid item xs={12} mt={6} mb={6}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <FormControl fullWidth variant="outlined" sx={{ mr: 1 }}>
          <OutlinedInput
            type="text"
            id="input-buscar-clientes"
            endAdornment={
              <Box mr={1}>
                <InputAdornment position="end">
                  <IconButton edge="end" aria-label="Buscar">
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
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </Box>
    </Grid>
  )
}
