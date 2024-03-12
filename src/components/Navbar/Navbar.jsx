import React  ,{ useState } from "react";
import Logo from "../../assets/website/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { FaCaretDown } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Explore",
    link: "/#Books",
  },
];

const DropdownLinks = [
  {
    name: "Trending Books",
    link: "/#",
  },
  {
    name: "Best Selling",
    link: "/#",
  },
  {
    name: "Authors",
    link: "/#",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const [orderPopup, setOrderPopup] = useState(false)
  const [editData,setEditData] =useState({
    "id": "",
    "imgUrl": "",
    "title": "",
    "description": "",
    "author": "",
    "price": "",
    "rating": "1",
    "type": "book"
  })
  const [alertColor,setAlertColor] = useState("")
  const [alertMsg,setAlertMsg] = useState("")
  const [alertShow,setAlertShow] = useState(false)
  const alertMessage =(bg,msg) =>{
    setAlertColor(bg)
    setAlertMsg(msg)
    setAlertShow(true)

    setTimeout(()=>{
      setAlertShow(false)
    },3000)
  }

  const handleAdd = () => {
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
      fetch(`http://192.168.1.3:4800/addBooks?id=${id}&imgUrl=${imgUrl}&title=${title}&description=${description}&author=${author}&price=${price}&rating=${rating}&type=${type}`, {
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
            alertMessage('red','Failed to add book')
          }else{
            console.log('Book added successfully',data);
            alertMessage('green','Book added successfully')
          }
          
        })
        .catch((error) =>{ 
          console.error('Error adding book:', error)
          alertMessage('red','Error adding book')
          setOrderPopup(false)
        });

    }
  };
  return (
    <>
      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div>
              <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
                <img src={Logo} alt="Logo" className="w-10" />
                Books
              </a>
            </div>
            <div className="flex justify-between items-center gap-4">
              <div>
                <DarkMode />
              </div>
              <ul className="hidden sm:flex items-center gap-4">
                {Menu.map((menu) => (
                  <li key={menu.id}>
                    <a
                      href={menu.link}
                      className="inline-block py-4 px-4 hover:text-primary duration-200"
                    >
                      {menu.name}
                    </a>
                  </li>
                ))}
                {/* Simple Dropdown and Links */}
                {/* <li className="group relative cursor-pointer">
                  <a
                    href="/#home"
                    className="flex h-[72px] items-center gap-[2px]"
                  >
                    Quick Links{" "}
                    <span>
                      <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a>
                  <div className="absolute -left-9 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block  ">
                    <ul className="space-y-3">
                      {DropdownLinks.map((data) => (
                        <li key={data.name}>
                          <a
                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                            href={data.link}
                          >
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li> */}
              </ul>
              <button
                onClick={() => {setOrderPopup(true)}}
                className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3"
              >
                Add Book
                <FaBookOpen className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </button>
            </div>
          </div>
        </div>

        {orderPopup&&( <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px] ">
            {" "}
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1>
                  Add Book Details
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
            
              <div className="mt-4">
              <input
                type="text"
                placeholder="Book Id"
                className="w-full h-[40px] rounded-lg  border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                value={editData.id}
                onChange={(event)=>{setEditData({...editData,id:event.target.value})}}
              />
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
              <select type="text"
                placeholder="Book Category"
                className="w-full h-[40px] rounded-lg  border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4" 
                value={editData.type}
                onChange={(event)=>{setEditData({...editData,type:event.target.value})}}
              >
                  <option>book</option>
                  <option>ebook</option>
                  <option>audiobook</option>
                  
              </select>
              <div className="flex justify-center">
                <button onClick={handleAdd} className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-lg ">
                  Add
                </button>
              </div>
            </div>
            
          </div>
        </div>)}

        {alertShow&&(
          <div className="h-screen w-screen flex  justify-end  fixed top-0 left-0 mt-20 z-50 backdrop-sm ">
              <div class={`flex w-[300px] h-[50px] justify-end text-center p-4 mr-10 mb-4 text-sm text-${alertColor}-800 border border-${alertColor}-300 rounded-lg bg-${alertColor}-50 dark:bg-gray-800 dark:text-${alertColor}-400 dark:border-${alertColor}-800`} role="alert">
                  <div className="flex" style={{width:"100%"}}>
                  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                  </svg>
                
                  <div >
                    {alertMsg}
                  </div>
                  </div>
              </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
