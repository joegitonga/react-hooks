import React, { useState } from 'react'
import UserTable from './tables/UserTable'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'

const App = () => {

  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Craig', username: 'siliconeidolon' },
    { id: 3, name: 'Ben', username: 'benisphere' },
  ]

//setting the users state to the above declared array  
  const [users, setUsers] = useState(usersData)

//Adding user functionality. The user id is incremented by 1 from the current array length
  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

//Deletion functionality
//The filter() method creates a new array with all elements that pass the test implemented by the provided function i.e filter function. 
//In this case it omits the user which has the passed id from the new array.
  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
    setEditing(false)
  }

  const [editing, setEditing] = useState(false)

  const initialFormState = { id: null, name: '', username: '' }

  const [currentUser, setCurrentUser] = useState(initialFormState)
//Editing functionality
  const editRow = user => {
    setEditing(true)
  
    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }
//Updating user functionality passes the user id and the updatedUser
  const updateUser = (id, updatedUser) => {
    setEditing(false)
  
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
        { editing ? 
          (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : 
          (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )
        }
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  )
}

export default App;
