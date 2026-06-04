
import React,{useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Product from './pages/Product'
import User from './pages/User'
import Post from './pages/Post'
import Comments from './pages/Comments'
import SearchResults from './components/SearchResults'
import Navbar from './components/Navbar'
import StatusCard from './components/StatusCard'
import { useProduct } from './context/ProductContext'
const App = () => {
    const {
    fetchProducts,
    fetchUsers,
    fetchPost,
    fetchComments,
  } = useProduct();

   useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchPost();
    fetchComments();
  }, []);
  return (
    <div>
      <Navbar />
      <StatusCard/>
      <Routes> 
        <Route path='/' element={<h1>Hello</h1>} />
        <Route path='/product' element={<Product />} />
        <Route path='/user' element={<User />} />
        <Route path='/post' element={<Post />} />
        <Route path='/comments' element={<Comments />} />
        <Route path='/search' element={<SearchResults />} />
      </Routes>
    </div>
  )
}

export default App