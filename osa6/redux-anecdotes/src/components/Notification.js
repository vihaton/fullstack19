import React from 'react';
import { connect } from 'react-redux'

const Notification = (props) => {
  const notifications = props.notifications
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

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

export default connect(mapStateToProps)(Notification)