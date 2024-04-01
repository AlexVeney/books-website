import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Update = () => {
  
  const {id} = useParams();
  const [book,setBook] = useState({
    title:'',
    description:'',
    price: 0,
    cover:''
  }) 
  
  useEffect(()=>{
    const fetchBook = async ()=>{
      try{
        const res = await axios.get('http://localhost:8800/books/'+id);
        //console.log(res.data[0]);
        setBook(res.data[0]);
      }catch(err){
        console.log(err);
      }
    };
    fetchBook();
  },[]);


  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setBook(prev=>({...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async e =>{
    e.preventDefault()

    try{
      await axios.put("http://localhost:8800/books/"+id, book)
      navigate("/")

    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='form'>
      <h2>Update Book {id}</h2>
      <input type="text" placeholder="title" value={book.title} onChange={handleChange} name="title"/>
      <input type="text" placeholder="description" value={book.description} onChange={handleChange} name="description"/>
      <input type="number" placeholder="price" value={book.price} onChange={handleChange} name="price"/>
      <input type="text" placeholder="cover" value={book.cover} onChange={handleChange} name="cover"/>
      <button className="formButton" onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update