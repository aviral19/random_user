import axios from 'axios';
import { useState,useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [pg, setPg] = useState(1);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  useEffect(() => {
    axios
      .get('https://randomuser.me/api/?results=120')
      .then(res => setUsers(res.data.results))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    setPaginatedUsers(users.slice(pg*10 - 10, pg * 10));
  }, [users, pg]);

  console.log(paginatedUsers)

  const nextPage = () => {
    if(pg === users.length/10){
      return;
    }
      
    console.log(pg);
    setPg(pg+1);
  };

  const prevPage = () => {
    if(pg === 1){
      return;
    }
    console.log(pg)
    setPg(pg - 1);
  };
  
  
  // const toggleSort = () => {
  //   if(sortedUsers === 1){
  //     const userSorted = users.map(user => {
  //       return user
  //     });
  //     const sorted = userSorted.sort((a, b) => {
  //       return a.name.first > b.name.first ? 1 : -1;
  //     });
  //     setUsers(sorted);
  //     setSortedUsers(2)
  //   }
    
  //   if(sortedUsers === 2){
  //     const userSorted = users.map(user => {
  //       return user
  //     });
  //     const sorted = userSorted.sort((a, b) => {
  //       return a.name.first > b.name.first ? -1 : 1;
  //     });
  //     setUsers(sorted);
  //     setSortedUsers(3)
  //   }
  //   if(sortedUsers === 3){
  //     setUsers([...originalUsers]);
  //     setSortedUsers(1)
  //   }

  // };

  
  return (
    <div>
      <h1>List of users</h1>
      <button onClick={nextPage}>Next</button>
      <button onClick={prevPage}>Prev</button>
      <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Picture</th>
            <th>Date of Birth</th>
          </tr>
            {paginatedUsers.map(paginatedUsers => (
              <tr>
                <td>{paginatedUsers.name.first} {paginatedUsers.name.last}</td>
                <td>{paginatedUsers.email}</td>
                <td>{paginatedUsers.phone}</td>
                <td>
                  <img src={paginatedUsers.picture.thumbnail} alt="user" />
                </td>
                <td>{paginatedUsers.dob.date.split('T')[0]}</td>
              </tr>
            ))}
      </table>
      {/* <table>
        {users.map(user => (
          <td key={user.login.uuid}>

            <img src={user.picture.thumbnail} alt="user" />
            <tr>
              Name: {user.name.first} {user.name.last}
            </tr>
            <tr>Contact no: {user.cell}</tr>
            <tr>Email: {user.email}</tr>
            <tr>DOB: {user.dob.date.split('T')[0]}</tr>
          </td>
        ))}
      </table> */}
    </div>
  );
}

export default App;
