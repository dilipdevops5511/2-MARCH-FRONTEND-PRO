import React, { useEffect, useState } from "react";
import Book1 from "../../assets/books/book1.jpg";
import Book2 from "../../assets/books/book2.jpg";
import Book3 from "../../assets/books/book3.jpg";
import { FaStar } from "react-icons/fa";
import { Tabs, Tab } from '../tab';
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import Img1 from "../../assets/books/book2.jpg";
import Img2 from "../../assets/books/book1.jpg";
import Img3 from "../../assets/books/book3.jpg";

import { IoCloseOutline } from "react-icons/io5";

const Books = () => {
  const [h,seth] = useState('')
  const [orderPopup, setOrderPopup] = useState(false)
  const [validModal,setValidModal] =useState("")
  const [editData,setEditData] =useState({
    "id": "",
    "imgUrl": "",
    "title": "",
    "description": "",
    "author": "",
    "price": "",
    "rating": "",
    "type": ""
  })
  const [data,setData] =useState([])
  const [Type,setType] = useState("")
  const [alertColor,setAlertColor] = useState("")
  const [alertMsg,setAlertMsg] = useState("")
  const [alertShow,setAlertShow] = useState(false)
  const alertMessage = (bg,msg) =>{
    console.log(bg,msg,'bg,msg')
    setAlertColor(bg)
    setAlertMsg(msg)
    setAlertShow(true)

    setTimeout(()=>{
      setAlertShow(false)
    },3000)
  }

  const func = (p) => {
    getBooks(p)
    setType(p)
  };
  // blue red green yellow
  const handleUpdate = () => {
    console.log(editData)
    const {id ,imgUrl,title,description,author,price,rating,type} = editData
    
    if(isNaN(id)){
        alertMessage('red','Invalid book id.')
    }else if(imgUrl.length<5){
      alertMessage('red','Invalid book Image URL.')
      
    }else if(title.length<3){
      alertMessage('red','Invalid book tittle.')
      
    }else if(description.length<10){
      
        alertMessage('red','Invalid book description.')
      }else if(author.length<3){
        alertMessage('red','Invalid book author.')
      
    }else if(isNaN(price)){
      alertMessage('red','Invalid book price.')
      
    }else if(isNaN(rating)){
      alertMessage('red','Invalid book rating.')
      
    }else if(type.length<3){
      alertMessage('red','Invalid book type.')
      
    }else{
      fetch(`http://aad5225e6faf8463ab9c63978b8eadf1-1417549700.ap-south-1.elb.amazonaws.com:4800/updateBook?id=${id}&imgUrl=${imgUrl}&title=${title}&description=${description}&author=${author}&price=${price}&rating=${rating}&type=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
       
      })
        .then(response => response.json())
        .then((data)=>{
          setOrderPopup(false)
          console.log(data,'res data')
          if (!data.Success) {
            console.log('Failed to add book');
            alertMessage('red','Failed to update book.')
          }else{
            console.log('Book added successfully',data);
            alertMessage('green','Book updated successfully.')
            getBooks(Type)
          }
          
        })
        .catch((error) =>{ 
          console.error('Error adding book:', error)
          alertMessage('red','Error adding book')
          setOrderPopup(false)
        });
    }
  };

  const handleDelete = () => {
    console.log(editData)
    const {id ,imgUrl,title,description,author,price,rating,type} = editData
    if(isNaN(id)){

    }else{
      fetch(`http://aad5225e6faf8463ab9c63978b8eadf1-1417549700.ap-south-1.elb.amazonaws.com:4800/deleteBook?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
       
      })
        .then(response => response.json())
        .then((data)=>{
          setOrderPopup(false)
          console.log(data,'res data')
          if (!data.Success) {
            console.log('Failed to add book');
            alertMessage('red','Failed to delete book.')
          }else{
            console.log('Book added successfully',data);
            alertMessage('red','Book details Deleted.')
            getBooks(Type)

            
          }
          
        })
        .catch((error) =>{ 
          console.error('Error adding book:', error)
          alertMessage('red','Error adding book')
          setOrderPopup(false)
        });
    }
  };

  const getBooks = async (type) => {
   
    await  fetch(`http://aad5225e6faf8463ab9c63978b8eadf1-1417549700.ap-south-1.elb.amazonaws.com:4800/getBooks?type=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then((data)=>{
          console.log(data,'res data')
          if (!data.Success) {
            console.log('Failed to add book');
            alertMessage('red','Failed to get book Details.')
            
          }else{
            
            setData(data.Success)
          }
          
        })
        .catch((error) =>{ 
          console.error('Error adding book:', error)
          alertMessage('red','Error adding book')

        });
    
  };

  useEffect(()=>{
    getBooks('all')
    setType('all')
  },[])

  
  return (
    <>
      <span id="Books"></span>
      <div className="mt-14 mb-12" style={{minHeight:'800px'}}>
        <div className="container">
          {/* header */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            {/* <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Top Books for you
            </p> */}
            <h1 className="text-3xl font-bold">Top Books</h1>
            {/* <p className="text-xs text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis delectus architecto error nesciunt,
            </p> */}
          </div>

          {/* Body section */}
          <div  style={{width:'100%'}}>
              <Tabs>
            
                <Tab  label="All" func={func} p="all">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
                  {data.map((book,index) => {
                    return(
                      <div
                    key={index}
                      data-aos="zoom-in"
                      className="mt-20 rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
                    >
                      <div className="h-[100px]">
                        <img
                          src={book.imgUrl}
                          alt=""
                          className="max-w-[100px] block mx-auto transform -translate-y-14
                        group-hover:scale-105  duration-300 shadow-md"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <div className="w-full flex items-center justify-center gap-1">
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                        </div>
                        <h1 className="text-xl font-bold">{book.title}</h1>
                        <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                          {book.description}
                        </p>
                        

                          <div className="flex justify-end gap-7 mt-2">
                            <span onClick={()=>{
                              setOrderPopup(true)
                              setValidModal("edit")
                              setEditData(book)
                            }} className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"><FaEdit className="cursor-pointer"/></span>
                            <span onClick={()=>{
                              setOrderPopup(true)
                              setValidModal("delete")
                              setEditData(book)
                            }} className="bg-light hover:scale-105 duration-300 text-red-600 py-1 px-4 rounded-full mt-4 group-hover:bg-red-600 group-hover:text-light"><FaRegTrashAlt className="cursor-pointer"/></span>
                          </div>
                      
                      </div>
                      </div>
                    )
                  })}
                  </div>
                </Tab>

                <Tab  label="Book" func={func} p="book">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
                {data.map((book,index) => {
                    return(
                      <div
                    key={index}
                      data-aos="zoom-in"
                      className="mt-20 rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
                    >
                      <div className="h-[100px]">
                        <img
                          src={book.imgUrl}
                          alt=""
                          className="max-w-[100px] block mx-auto transform -translate-y-14
                        group-hover:scale-105  duration-300 shadow-md"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <div className="w-full flex items-center justify-center gap-1">
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                        </div>
                        <h1 className="text-xl font-bold">{book.title}</h1>
                        <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                          {book.description}
                        </p>
                        

                          <div className="flex justify-end gap-7 mt-2">
                            <span onClick={()=>{
                              setOrderPopup(true)
                              setValidModal("edit")
                              setEditData(book)
                            }} className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"><FaEdit className="cursor-pointer"/></span>
                            <span onClick={()=>{
                              setOrderPopup(true)
                              setValidModal("delete")
                              setEditData(book)
                            }} className="bg-light hover:scale-105 duration-300 text-red-600 py-1 px-4 rounded-full mt-4 group-hover:bg-red-600 group-hover:text-light"><FaRegTrashAlt className="cursor-pointer"/></span>
                          </div>
                      
                      </div>
                      </div>
                    )
                  })}
                  </div>
                </Tab>

                <Tab  label="E-Book" func={func} p="ebook">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
                {data.map((book,index) => {
                    return(
                      <div
                    key={index}
                      data-aos="zoom-in"
                      className="mt-20 rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
                    >
                      <div className="h-[100px]">
                        <img
                          src={book.imgUrl}
                          alt=""
                          className="max-w-[100px] block mx-auto transform -translate-y-14
                        group-hover:scale-105  duration-300 shadow-md"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <div className="w-full flex items-center justify-center gap-1">
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                        </div>
                        <h1 className="text-xl font-bold">{book.title}</h1>
                        <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                          {book.description}
                        </p>
                        

                          <div className="flex justify-end gap-7 mt-2">
                            <span onClick={()=>{
                              setOrderPopup(true)
                              setValidModal("edit")
                              setEditData(book)
                            }} className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"><FaEdit className="cursor-pointer"/></span>
                            <span onClick={()=>{
                              setOrderPopup(true)
                              setValidModal("delete")
                              setEditData(book)
                            }} className="bg-light hover:scale-105 duration-300 text-red-600 py-1 px-4 rounded-full mt-4 group-hover:bg-red-600 group-hover:text-light"><FaRegTrashAlt className="cursor-pointer"/></span>
                          </div>
                      
                      </div>
                      </div>
                    )
                  })}
                  </div>
                </Tab>

                <Tab  label="Audio Book" func={func} p="audiobook">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
                {data.map((book,index) => {
                    return(
                      <div
                    key={index}
                      data-aos="zoom-in"
                      className="mt-20 rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
                    >
                      <div className="h-[100px]">
                        <img
                          src={book.imgUrl}
                          alt=""
                          className="max-w-[100px] block mx-auto transform -translate-y-14
                        group-hover:scale-105  duration-300 shadow-md"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <div className="w-full flex items-center justify-center gap-1">
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                        </div>
                        <h1 className="text-xl font-bold">{book.title}</h1>
                        <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                          {book.description}
                        </p>
                        

                          <div className="flex justify-end gap-7 mt-2">
                            <span onClick={()=>{
                              setOrderPopup(true)
                              setValidModal("edit")
                              setEditData(book)
                            }} className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"><FaEdit className="cursor-pointer"/></span>
                            <span onClick={()=>{
                              setOrderPopup(true)
                              setValidModal("delete")
                              setEditData(book)
                            }} className="bg-light hover:scale-105 duration-300 text-red-600 py-1 px-4 rounded-full mt-4 group-hover:bg-red-600 group-hover:text-light"><FaRegTrashAlt className="cursor-pointer"/></span>
                          </div>
                      
                      </div>
                      </div>
                    )
                  })}
                  </div>
                </Tab>

              </Tabs>
            
            {/* <div className="flex justify-center">
              <button className="text-center mt-10 cursor-pointer  bg-primary text-white py-1 px-5 rounded-md">
                View All Books
              </button>
            </div> */}
          </div>
        </div>

        {orderPopup&&( <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px] ">
            {" "}
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1>
                  {validModal==='edit'?("Edit Book Details"):("Delete Book Details")}
                </h1>
              </div>
              <div>
                <IoCloseOutline
                  className="text-2xl cursor-pointer "
                  onClick={() => setOrderPopup(false)}
                />
              </div>
            </div>
            {/* Body */}
            {validModal==='edit'?(
              <div className="mt-4">
   
              <input
                type="text"
                placeholder="Book Imgage Url"
                className="w-full h-[40px] rounded-lg  border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                value={editData.imgUrl}
                onChange={(event)=>{setEditData({...editData,imgUrl:event.target.value})}}
              />
               <input
                type="text"
                placeholder="Book Title"
                className="w-full h-[40px] rounded-lg  border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                value={editData.title}
                onChange={(event)=>{setEditData({...editData,title:event.target.value})}}
              />
               <input
                type="text"
                placeholder="Description"
                className="w-full h-[40px] rounded-lg  border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                value={editData.description}
                onChange={(event)=>{setEditData({...editData,description:event.target.value})}}
              />
               <input
                type="text"
                placeholder="Author"
                className="w-full h-[40px] rounded-lg  border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                value={editData.author}
                onChange={(event)=>{setEditData({...editData,author:event.target.value})}}
              />
               <input
                type="text"
                placeholder="Book Price"
                className="w-full h-[40px] rounded-lg  border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                value={editData.price}
                onChange={(event)=>{setEditData({...editData,price:event.target.value})}}
              />
              <select type="text"
                placeholder="Book Rating"
                className="w-full h-[40px] rounded-lg  border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                value={editData.rating}
                onChange={(event)=>{setEditData({...editData,rating:event.target.value})}}
              >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
              </select>
              {/* <select type="text"
                placeholder="Book Category"
                className="w-full h-[40px] rounded-lg  border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4" 
                value={editData.type}
                onChange={(event)=>{setEditData({...editData,type:event.target.value})}}
              >
                  <option>book</option>
                  <option>ebook</option>
                  <option>audiobook</option>
                  
              </select> */}
              <div className="flex justify-center">
                <button onClick={handleUpdate} className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-lg ">
                  Update
                </button>
              </div>
            </div>
            ):(
              <>
              <div className="mt-4  flex items-center" style={{width:'100%',height:'40%'}} >
                <div style={{width:'100%'}}>
                <h5>Are You Sure Want to delete the book detials</h5>
                </div>

              
              </div>
              <div className="mt-4  flex items-center" style={{width:'100%',height:'40%'}} >
               
                <div style={{width:'100%'}} className="flex justify-center">
                    <button onClick={()=>{setOrderPopup(false)}} className="bg-gradient-to-r bg-primary  hover:scale-105 duration-200 text-white py-1 px-4 rounded-full mx-1 ">
                    Cancel
                    </button>
                    <button onClick={handleDelete} className="bg-gradient-to-r bg-red-600  hover:scale-105 duration-200 text-white py-1 px-4 rounded-full mx-1">
                      Delete
                    </button>
              </div>
              </div>
              </>
            )}
            
          </div>
        </div>)}
      </div> 
     
      {alertShow&&(
          <div className="h-screen w-screen flex  justify-end  fixed top-0 left-0 mt-20 z-50 backdrop-sm ">
              <div className={`flex w-[300px] h-[50px] justify-end text-center p-4 mr-10 mb-4 text-sm text-${alertColor}-800 border border-${alertColor}-300 rounded-lg bg-${alertColor}-50 dark:bg-gray-800 dark:text-${alertColor}-400 dark:border-${alertColor}-800`} role="alert">
                  <div className="flex" style={{width:"100%"}}>
                  <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                  </svg>
                
                  <div >
                    {alertMsg}
                  </div>
                  </div>
              </div>
          </div>
      )}

    </>
  );
};

export default Books;
