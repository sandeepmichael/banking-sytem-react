import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import { Form } from 'react-bootstrap'

const TransferPage = () => {

  const {id}  = useParams("")
 
 
  const Navigate = useNavigate();
  const [allData, SetAllData] = useState([{
    receivername:"",
    receiveremail:"",
  }]);
  const [sendData, SetData] = useState({
   name:"",
   email:"",
   transferamount:"",
   



  })
     
 
  const handleChange = (e) => {
    SetData(sendData => ({ ...sendData, [e.target.name]: e.target.value }))
  }
  
  const getAllusers = async (req, res) => {
    try {
        const res = await axios.get(`/view/${id}`);
        console.log(res.data)
        console.log(res.data.data)
        console.log(res.data.records)
       SetData(res.data.data)
      SetAllData(res.data.records)
    
        
    } catch (error) {
        console.log(error);
      
        
    }
   
}

useEffect(() => {
    getAllusers();
},[])

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/transfer', sendData, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log(res)
      //SetsendData(res.data);
      alert("transfer success");
      Navigate('/history')


    } catch (error) {
      console.log(error)
    }

  }


 // const idData = Data._id;
  
  return (
    <div>

      <div className="container bg-primary  text-center p-2 mt-3">
        <h3 className="text-light fw-4">Sender Details</h3>
      </div>

      <div className="container mt-4 custom_view_right">
        <h4>Name:{sendData.name}</h4>
        <h4>Email:{sendData.email}</h4>
        <h4>Contact:{sendData.contact}</h4>
        <h4>Balance:{sendData.amount}</h4>

      </div>
      <div className="container bg-secondary  text-center p-2 mt-3">
        <h3 className="text-light fw-4">Receiver Details</h3>
      </div>



      <div className="container">
        <Form onSubmit={submitHandle}>
          <div className="form-group mt-3">
            <label for="exampleInputEmail1">From</label>

            <input type="hidden" name="senderId" value={sendData._id} />


            <input type="text" className="form-control" name="name" placeholder="Enter User Name" onChange={handleChange} value={sendData.name} /><br></br>
            <input type="email" className="form-control" name="email" placeholder="Enter Email" onChange={handleChange} value={sendData.email} />






          </div>
          <div className="form-group  mt-3">
            <label for="exampleInputEmail1">TO</label>
           {/* <input type="text" className="form-control"  name="receivername" placeholder="Enter receiver Name" onChange={handleChange}  value={sendData.receivername || ""} /><br></br> */}


            <select class="form-select" name="receivername"onChange={handleChange} value={allData.receivername}>

              <option selected>Select Receiver name</option>

              {allData.map((e) => {
                return (
                  <option >{e.name}</option>
                )
              })}

            </select>

          </div>
          <div className="form-group  mt-3">

            {/*<input type="email" className="form-control"  name="receiveremail" placeholder="Enter receiver email" onChange={handleChange}  value={sendData.receiveremail || ""} /><br></br> */}

            <select class="form-select" name="receiveremail" onChange={handleChange} value={allData.receiveremail}>

              <option selected>Select Receiver Email</option>

              {allData.map((e) => {
                return (
                  <option >{e.email}</option>
                )
              })}

            </select>
          </div>
          <div className="form-group  mt-3">
            <label for="exampleInputEmail1">Amount</label>

          </div>

          <input type="Amount" className="form-control" name="transferamount" value={sendData.transferamount} onChange={handleChange} placeholder="Enter Amount to transfer" required />

          <button type="submit" className="btn btn-primary mt-3 text-center">Submit</button>
        </Form>
      </div>






    </div>
  )
}

export default TransferPage