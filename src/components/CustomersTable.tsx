import styled from 'styled-components'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Stack,
  Paper,
  Alert,
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { CustomerDataType } from 'src/models/customer'

type Props = {
  customers: CustomerDataType[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

type TextTableCellProps = {
  children: React.ReactNode
  minWidth: string
}

type ActionButtonType = {
  onClick: () => void
  icon: React.ReactNode
}

const TextTableCell: React.FC<TextTableCellProps> = ({
  children,
  minWidth,
}) => <TableCell sx={{ minWidth }}>{children}</TableCell>

const ActionButton: React.FC<ActionButtonType> = ({ onClick, icon }) => (
  <IconButton size="medium" color="inherit" onClick={onClick}>
    {icon}
  </IconButton>
)

const CustomCell = styled(TableCell)`
  right: 0;
  z-index: 1;
  height: 64px;
  position: sticky;
  position: -webkit-sticky;
  background-color: rgb(250 250 250 / 80%);
`

export default function CustomersTable({ customers, onEdit, onDelete }: Props) {
  if (customers.length === 0)
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="info">
          Sua lista de clientes está vazia. Comece adicionando um novo cliente.
        </Alert>
      </Stack>
    )

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Lista de clientes">
        <TableHead>
          <TableRow>
            <TextTableCell minWidth="20px">Tipo</TextTableCell>
            <TextTableCell minWidth="180px">Nome</TextTableCell>
            <TextTableCell minWidth="180px">Nome fantasia</TextTableCell>
            <TextTableCell minWidth="130px">Documento</TextTableCell>
            <TextTableCell minWidth="110px">E-mail</TextTableCell>
            <TextTableCell minWidth="110px">Telefone</TextTableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {customers &&
            customers.map((customer, index) => (
              <TableRow key={customer.name + index}>
                <TextTableCell minWidth="20px">{customer.type}</TextTableCell>
                <TextTableCell minWidth="180px">{customer.name}</TextTableCell>
                <TextTableCell minWidth="180px">
                  {customer.type === 'PJ' ? customer.fantasy_name || '-' : '-'}
                </TextTableCell>
                <TextTableCell minWidth="130px">
                  {customer.type === 'PJ' ? customer.cnpj : customer.cpf}
                </TextTableCell>
                <TextTableCell minWidth="110px">{customer.email}</TextTableCell>
                <TextTableCell minWidth="110px">{customer.phone}</TextTableCell>

                <CustomCell>
                  <Stack direction="row" alignItems="center">
                    <ActionButton
                      onClick={() => onEdit(customer.id)}
                      icon={<Edit />}
                    />
                    <ActionButton
                      onClick={() => onDelete(customer.id)}
                      icon={<Delete color="error" />}
                    />
                  </Stack>
                </CustomCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
