import { Snackbar, Alert } from '@mui/material'

export type NotificationStatus =
  | 'error'
  | 'success'
  | 'info'
  | 'warning'
  | undefined

type Props = {
  onClose: () => void
  notification: {
    message: string
    visible: boolean
    status?: NotificationStatus
  }
}

export default function Notification({
  onClose,
  notification: { visible, status = 'info', message },
}: Props) {
  return (
    <Snackbar
      open={visible}
      onClose={onClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert variant="filled" severity={status} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  )
}
