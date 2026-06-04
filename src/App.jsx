
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
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 md:px-6 py-6'>
        <StatusCard/>
        <div className="mt-8">
           <Routes> 
        <Route path='/' element={<Product/>} />
        <Route path='/user' element={<User />} />
        <Route path='/post' element={<Post />} />
        <Route path='/comments' element={<Comments />} />
        <Route path='/search' element={<SearchResults />} />
      </Routes>
        </div>
     
      </main>
      
    </div>
  )
}

export default App