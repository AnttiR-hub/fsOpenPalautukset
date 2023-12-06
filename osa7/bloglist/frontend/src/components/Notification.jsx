import { useNotificationValue } from '../notificationContext'

const Notification = ({ className }) => {

  const message = useNotificationValue()

  if (message === '') {
    return null
  }


  return (
    <div className={className}>
      {message}
    </div>
  )
}


export default Notification