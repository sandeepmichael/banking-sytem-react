import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Container, Button } from 'react-bootstrap'
import {Link, useNavigate, useParams} from 'react-router-dom'




const ViewUser = () => {
    const [Data, setData] = useState([])

  
   const getAllusers = async (req, res) => {
    try {
        const res = await axios.get('/data');
        console.log(res.data)
        setData(res.data)
        
    } catch (error) {
        console.log(error);
      
        
    }
   
}
    useEffect(() => {
     
       getAllusers();
    }, [])

   const deleteUser  = async(id) => {
    try {
        const res = await axios.get(`/delete/${id}`)
        console.log(res.data);
        if(!res.data){
            console.log("error")
        }else {
            alert('User deleted!!');
            getAllusers();
        }

        
    } catch (error) {
        console.log(error)
    }
   }



  return (
    <div>
        <hr></hr>
     
        
            
            <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email ID</th>
                        <th>Contact</th>
                        <th>Amount</th>
                        <th>Action</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Data.length > 0 ? Data.map((e) => {
                        return (
                         <tr key={e._id}>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.contact}</td>
                            <td>{e.amount}</td>
                            <td>
                             <Link to={`/view/${e._id}`} className='btn btn-primary'>Transfer</Link>
                                </td>
                                <td>
                               {/* <Link to={`/delete/${e._id}`} className='btn btn-danger'>Delete</Link> */}
                                <Button onClick={()=> deleteUser(e._id)} className='btn btn-danger'>Delete</Button>
                            </td>
                         </tr>)
                        }) : <tr>
                            <td>No records Found!</td></tr>}
                       
                    </tbody>

            </Table>
            </Container>
            
        
    
      
    </div>
  )
}

export default ViewUser