import React, { useState } from 'react'
import {Form, Button, Container} from "react-bootstrap"
import axios from 'axios';

const AddUser = () => {
    const [inputs, setInputs] = useState({
      
    })
   // const {name, email, contact, amount} = inputs;
  
    const handleChange = (e) => {
        
        setInputs(inputs => ({...inputs, [e.target.name]:e.target.value}))
    }

    const Handlesubmit = async(e) => {
        e.preventDefault();

        try {
            const res= await axios.post('/adduser', inputs, {
                headers : {
                    "Content-Type" : "application/json",
                }
            });
            setInputs(res.data);
            alert("user added successfully");
            
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
   <div>
   <h1 className='add-user'>Add User</h1>
   <hr></hr>
   <br></br>

   <Container>
   
    <Form onSubmit={Handlesubmit}>
    <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name="name" value={inputs.name || ''} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={inputs.email || ''} onChange={handleChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contact</Form.Label>
        <Form.Control type="number" placeholder="Contact No"  name="contact" value={inputs.contact || ''} onChange={handleChange}/>
      </Form.Group>
     

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" placeholder="Amount" name="amount" value={inputs.amount || ''} onChange={handleChange} />
      </Form.Group>
       


      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
    
   </div>
  )
}

export default AddUser