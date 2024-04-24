import { Snackbar, Alert } from '@mui/material'

export type NotificationStatus =
  | 'error'
  | 'success'
  | 'info'
  | 'warning'
  | undefined

export type NotificationType = {
  message: string
  visible: boolean
  status?: NotificationStatus
}

type Props = {
  onClose: () => void
  notification: NotificationType
}

export default function Notification({
  onClose,
  notification: { visible, status, message },
}: Props) {
  return (
    <Snackbar
      open={visible}
      onClose={onClose}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert variant="filled" severity={status} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  )
}
