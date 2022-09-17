import React, { useEffect, useState } from 'react'
import UserTable from './components/tables/UserTable'
import AddUserForm from './components/forms/AddUserForm'
import EditUserForm from './components/forms/EditUserForm'

const App = () => {

  const [users, setUsers] = useState([]);
  const [ search, setSearch ] = useState("")

  //función para traer los datos de la API
  const URL = 'https://jsonplaceholder.typicode.com/users'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setUsers(data)
    
  }
  
  //función de búsqueda
  const searcher = (e) => {
  setSearch(e.target.value)   
  }

  let results = []
   if(!search)
   {
       results = users
   }else{
        results = users.filter( (dato) =>
        dato.name.toLowerCase().includes(search.toLocaleLowerCase())
    )
  }


  useEffect(() => {
    showData();
  }, []);

    
    const addUser = async (user) => {
    await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        name: user.name,
        email: user.email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data)
        setUsers((users) => [...users, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const deleteUser = async (id) => {
    await fetch(URL+`/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter(user => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, name: '', email: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const editRow = (user) => {
    setEditing(true)  
    setCurrentUser({ id: user.id, name: user.name, email: user.email })
  }

  const updateUser = async (id,updatedUser) => {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          if (res.status !== 201) {
            return;
          } else {
            return res.json();
          }
        })
        .then((data) => {        
          setEditing(true) 
          console.log(data)
          setUsers(users.map(user => (user.id === id ? updatedUser : user)))        
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return (
        <div className="container">
            <h1>Desarrollo Crud JSONplaceholder</h1>
            <div className="flex-row">             
              <div className="flex-small">
              <h2>Filtrar Usuarios</h2>
            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control'/>         
                {editing ? (
                  <>
                    <h2>Editar Usuarios</h2>
                    <EditUserForm
                      editing={editing}
                      setEditing={setEditing}
                      currentUser={currentUser}
                      updateUser={updateUser}
                    />
                  </>
                ) : (
                  <>
                    <h2>Añadir Usuarios</h2>
                    <AddUserForm addUser={addUser} />
                  </>
                )}
              </div>
              <div className="flex-large">          
                <h2>Listado Usuarios</h2>
                <UserTable results={results} editRow={editRow} deleteUser={deleteUser} />
              </div>
            </div>      
        </div>       
    );
}

export default App