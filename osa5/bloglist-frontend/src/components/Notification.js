import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notifications = props.notifications
  console.log('Notification', notifications)
  const notificationStyle = {
    'color': 'rgb(67, 185, 67)',
    'background': 'lightgrey',
    'fontSize': '20px',
    'borderStyle': 'solid',
    'borderRadius': '5px',
    'padding': '10px',
    'marginBottom': '10px',
  }

  const errorStyle = {
    'color': 'rgb(173, 14, 14)',
    'background': 'lightgrey',
    'fontSize': '20px',
    'borderStyle': 'solid',
    'borderRadius': '5px',
    'padding': '10px',
    'marginBottom': '10px'
  }

  if (notifications[0].content[0] === 'E') {
    return (
      <div style={errorStyle}>
        {notifications.map(n => n.content)}
      </div>
    )
  } else {
    return (
      <div style={notificationStyle}>
        {notifications.map(n =>
          n.content
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('mapState @ Notification\n', state)
  return {
    notifications: state.notifications
  }
}

export default connect(mapStateToProps)(Notification)