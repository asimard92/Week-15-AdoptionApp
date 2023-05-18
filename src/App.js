// Importing our items we will need to use for this project such as react and bootstrap along with react components 

import './App.css'
import {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

// The mock API that will be used here and the variable we will use to call on it so we can use it as a pretend back end 
const MOCK_API_URL = 'https://645e56dd12e0a87ac0edd618.mockapi.io/projectweek15'


// These are the variables needed to be called on for this app along with the function to start it
function App() {

const [customers, setCustomers] = useState([{}])

const [newCustomerName, setNewCustomerName] = useState('')
const [newDogType, setNewDogType] = useState('')
const [newCustomerAdoptionDate, setNewCustomerAdoptionDate] = useState('')

const [updatedName,setUpdatedName] = useState('')
const [updatedDogType, setUpdatedDogType] = useState('')
const [updatedAdoptionDate, setUpdatedAdoptionDate] = useState('')

function getCustomers(){
  fetch(MOCK_API_URL)
  .then(data => data.json())
  .then(data => setCustomers(data))
}

useEffect(() => {
  getCustomers()
  console.log(customers)
}, [])

function deleteCustomer(id){
  fetch(`${MOCK_API_URL}/${id}`, {
    method: 'DELETE'
  }).then(() => getCustomers())

}

// Prevent default used to stop refreshing of the page and losing the information 
function postNewCustomer(e){
  e.preventDefault()

  fetch(MOCK_API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: newCustomerName,
      dogType: newDogType,  
      adoptionDate: newCustomerAdoptionDate,
    })
  }).then(() => getCustomers())
} 

// This function updates the customers information should it need to be updated
function updateCustomer(e, customerObject){
  e.preventDefault()

  let updatedCustomerObject = {
    ...customerObject, 
    name: updatedName, 
    dogType: updatedDogType, 
    adoptionDate: updatedAdoptionDate,
  }

  fetch(`${MOCK_API_URL}/${customerObject.id}`, {
    method: 'PUT', 
    body: JSON.stringify(updatedCustomerObject),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(() => getCustomers())
}


// After using all the information above, the app will return this information to the user on the screen 

  return (
    <div className="App">
      <img src='https://media.istockphoto.com/id/1265898634/vector/vector-cartoon-cute-dogs-with-big-bone.jpg?s=612x612&w=0&k=20&c=_SJuZYyjVjo5xMsXSFF1Cv6WmULvGiMFeV_IkQwkzig=' alt='cute cartoon dogs above a white dog bone'></img>
      <form>
        {/* Form used to add a customer to the adoption data base with a submit button */}
        <h1>Dog Adoption Database</h1>
        <br />
        <label>Name:</label>
        <input onChange={(e) => setNewCustomerName(e.target.value)}></input>
        <label>Dog Type:</label>
        <input onChange={(e) => setNewDogType(e.target.value)}></input>
        <label>Adoption Date:</label>
        <input type="date" onChange={(e) => setNewCustomerAdoptionDate(e.target.value)}></input>
        <br />
        <br />
        <button onClick={(e) => postNewCustomer(e)} className='btn btn-danger'>Submit</button>
      </form>

      {/* Shows the current information about the customer after submitting  */}
      {customers.map((customer, index) => (
        <div className='customerContainer' key={index}>
          <h3>Current Information:</h3>
            <div>
              Customer Full Name: {customer.name} <br />
              Dog Type: {customer.dogType} <br />
              Adoption Date Requested: {customer.adoptionDate} 
              <br />
              <br />
              <button onClick={() => deleteCustomer(customer.id) } className='btn btn-info'>Delete</button>
              <br />
              <br />
            </div>

            {/* Form used to allow user to update customer credentials with update button  */}
            <form>
              <h3>Update Customer Credentials</h3>
              <label>Update Customer Name:</label>
              <input onChange={(e) => setUpdatedName(e.target.value)}></input><br />             
              <label>Update Dog Type:</label>
              <input onChange={(e) => setUpdatedDogType(e.target.value)}></input><br />
              <label>Change Adoption Date:</label>
              <input type="date" onChange={(e) => setUpdatedAdoptionDate(e.target.value)}></input>
              <br /> 
              <br />
              <button onClick={(e) => updateCustomer(e, customer)} className='btn btn-info'>Update</button>
              <br />
            </form>
        </div>
      ))}
    </div>
  )
}

export default App
