import { NOTIFICATION } from '~/src/shared/utils/constants'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

const notifications = ref<Notification[]>([])

export const useNotification = () => {
  const notify = (
    message: string,
    type: Notification['type'] = 'info',
    duration: number = NOTIFICATION.AUTO_DISMISS_DELAY
  ) => {
    const id = Date.now().toString() + Math.random().toString(36)
    
    const notification: Notification = {
      id,
      type,
      message,
      duration
    }

    notifications.value.push(notification)

    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }

    return id
  }

  const remove = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const success = (message: string, duration?: number) => {
    return notify(message, 'success', duration)
  }

  const error = (message: string, duration?: number) => {
    return notify(message, 'error', duration)
  }

  const warning = (message: string, duration?: number) => {
    return notify(message, 'warning', duration)
  }

  const info = (message: string, duration?: number) => {
    return notify(message, 'info', duration)
  }

  return {
    notifications: readonly(notifications),
    notify,
    remove,
    success,
    error,
    warning,
    info
  }
}
