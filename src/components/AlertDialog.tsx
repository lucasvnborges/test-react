import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from '@mui/material'

type Props = {
  show: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function AlertDialog({ show = false, onClose, onConfirm }: Props) {
  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>
        Remover cliente da lista
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta ação não pode ser desfeita. Tem certeza de que deseja excluir
          este cliente?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
