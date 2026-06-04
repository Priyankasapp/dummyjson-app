
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Product from './pages/Product'
import User from './pages/User'
import Post from './pages/Post'
import Comments from './pages/Comments'
import SearchResults from './components/SearchResults'
import Navbar from './components/Navbar'
import StatusCard from './components/StatusCard'
import { useProduct } from './context/ProductContext'
import Lenis from 'lenis'
import ProductDetails from './components/ProductDetails'

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
    // These context fetchers are intentionally called once on app load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 md:px-6 py-6'>
        <StatusCard/>
        <div className="mt-8">
           <Routes> 
        <Route path='/' element={<Product/>} />
        <Route path='/product' element={<Product/>} />
        <Route path='/product/:productId' element={<ProductDetails />} />
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
