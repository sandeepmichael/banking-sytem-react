import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Button, Container, Table } from 'react-bootstrap';


const HistoryPage = () => {
const [historydata, setHistoryData] = useState([]);

const getdata = async()=> {
    try{
    const res = await axios.get('/transfer')
     console.log(res.data);
     setHistoryData(res.data.data);
    }catch(error){
        console.log(error);
    }
}

useEffect(() => {
   
    getdata();
}, [])

  const removeUser = async(id) => {
    try {
        const res = await axios.get(`/remove/${id}`);
        console.log(res.data);
        if(!res.data){
            console.log("error")
        }else {
            alert('Removed successfully');
            getdata();
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div>
         <div className="container mt-2">
          <Link to="/viewuser" className="btn btn-secondary fw-bold mb-2">&larr; Back</Link>
      </div>

      <Container>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Amount</th>
                    <th>Data</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {historydata.length>0 ? historydata.map((e) => {
                    return (
                       <tr key={e._id}>
                        <td>{e.senderEmail}</td>
                        <td>{e.receiverEmail}</td>
                        <td>{e.amount}</td>
                        <td>{e.date}</td>
                        <td>
                        <Button onClick={() => removeUser(e._id)} className='btn btn-danger'>Delete</Button>
                        </td>
                       </tr>
                    )
                }): <tr>
                    <td>No records found</td>
                    </tr>}
            </tbody>
             

        </Table>
      </Container>

            
    </div>
  )
}

export default HistoryPage;