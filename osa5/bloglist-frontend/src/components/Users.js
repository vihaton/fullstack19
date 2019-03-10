import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

const Users = (props) => {
  if (!props.user) {
    return <div></div>
  }
  return (
    <div>
      <h2>Users</h2>
      <Table striped celled>

        {/* <Table.Header>
          <Table.Row>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header> */}

        <Table.Body>
          {props.user.users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell>
                {user.name}
                {/* <Link to={`/notes/${note.id}`}>
                  {note.content}
                </Link> */}
              </Table.Cell>
              <Table.Cell>
                {user.blogs.length}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('App state to props, state:', state)
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Users)