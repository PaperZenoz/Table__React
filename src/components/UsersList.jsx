import React from 'react';

 const UsersList = ({state, onRowSelect}) => {
    return (
        state.map((user, index) => <UsersItem  key={index} user={user} index={index} onRowSelect={onRowSelect}/>)
    )
}

const UsersItem = ({user, index, onRowSelect}) => {

     return(
         <tr onClick={onRowSelect.bind(null, user)}>
             <th>{index + 1}</th>
             <td>{user.id}</td>
             <td>{user.firstName}</td>
             <td>{user.lastName}</td>
             <td>{user.email}</td>
         </tr>
         )

}


export default  UsersList