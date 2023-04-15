import React,{useState, useEffect} from 'react'
import TransferPage from './transferPage'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ViewTransfer = () => {
    const {id} = useParams("");
    const [Data, SetData] = useState([])
    const [allData, SetAllData] = useState([])

    useEffect(() => {
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
       getAllusers();
    }, [])

    console.log(Data)
    console.log(allData)
  return (
    <div>
        <TransferPage Data={Data} allData={allData}/>
    </div>
  )
}

export default ViewTransfer