import React from 'react'

const UserTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.results.length > 0 ? (
        props.results.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button className='button muted-button' onClick={() => {props.editRow(user)}}>Edit</button>
              <button className='button muted-button' onClick={() => {props.deleteUser(user.id)}}>Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>No hay registros</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default UserTable