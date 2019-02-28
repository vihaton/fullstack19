import React from 'react';

const Notification = (props) => {
  const notifications = props.store.getState().notifications
  console.log('Notification', notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notifications.map(n =>
        n.content
      )}
    </div>
  )
}

export default Notification
