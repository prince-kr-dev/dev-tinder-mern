import axios from 'axios';
import React, { useEffect } from 'react'
import { URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import ConnectionListCard from './ConnectionListCard';

function Connections() {
  const dispatch = useDispatch();

  const connections = useSelector((store)=> store.connections);

  
  
  
  const fetchConnections = async ()=>{
    try{
      
      const res = await axios.get(URL + "/user/connections", {withCredentials:true})
      // console.log(res.data.data);
      dispatch(addConnections(res.data.data))
    }catch(err){
      console.log(err);
    }
  }
  
  useEffect(()=>{
    fetchConnections();
  },[])
  
  if(!connections) return <h1 className='mt-10 text-center text-xl'>Loading...</h1>;
  if(connections.length === 0) return <h1 className='mt-10 text-center text-xl'>No Connections</h1>


  return (
    <div className='pt-10'>
      <h1 className='text-2xl text-center mb-5'>Connections</h1>
      {connections.map((data, i)=>(
        <ConnectionListCard key={i} data={data}/>
      ))}
    </div>
  )
}

export default Connections