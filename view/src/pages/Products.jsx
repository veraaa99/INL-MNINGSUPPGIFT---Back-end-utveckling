import { useEffect, useState } from "react"
import axios from "../axios_api/axios"
import { Link, useNavigate } from "react-router"
import { useProductContext } from "../contexts/ProductContext"

const Products = () => {

  const [products, setProducts] = useState([])
  const [formData, setformData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: []
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { createProduct } = useProductContext()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if(!formData.name || !formData.price || !formData.description || !formData.category || !formData.images){
        setError('Please fill in all fields')
        return
    } 

    setLoading(true)
    setError('')
    try {
        await createProduct(formData)
        navigate('/')
        
    } catch (error) {
        setError(error.response?.data?.message || 'Something went wrong')
        console.log(error)
    } 
    finally {
        setLoading(false)
    }
  }

  useEffect(() => {
    const getProducts = async() => {
      try {
        const res = await axios.get('/api/products')
        if(res.status !== 200) return
  
        setProducts(res.data)
      }
      catch(error) {
        console.log(error.message)
      }
    }
    getProducts()
  }, [])

  return (
    <div className='m-8'>
      <h1 className='text-5xl justify-self-center p-5'>PRODUCTS</h1>

      <div>
        <ul className='grid md:grid-cols-2 sm:grid-cols-1 gap-10 md:gap-20 md:m-15 px-20 justify-center'>
            { 
            !!products.length
            ? products.map((product) => (
              <div className='flex flex-col text-sm' key={product._id}>
  
                <div>
                  <Link to={`/Products/${product._id}`}>
                    <img className='object-cover rounded-lg' src={product.images[0]} ></img>
                  </Link>
                </div>
  
                <div className='flex flex-row justify-between mt-3 flex-wrap'>
                  <div className="mr-4">
                    <li><Link className='md:text-lg sm:text-base' to={`/Products/${product._id}`}>{product.name}</Link></li>
                    <p className='pt-2'>Price: {product.price} kr</p>
                  </div>
                  <div className='grid justify-items-center py-2'>
                  <button type="button">Add to cart</button>
                  </div>
                </div>
              </div>
              ))
              : (
                <div>No products avaliable</div>
              )
            }  
        </ul>
      </div>

      <div className='flex m-auto align-middle justify-center'>
        <form id="productForm" onSubmit={handleSubmit}>
            <h2 className='text-2xl p-5 my-5'>Add a new product to the collection: </h2>
            <div className='flex flex-col'>
              <label htmlFor="name">Product name: </label>
              <input className="border-1 border-solid rounded-md mb-5" type="text" name="name" id="name"/>

              <label htmlFor="price">Price: </label>
              <input className="border-1 border-solid rounded-md mb-5" type="text" name="price" id="price"/>

              <label htmlFor="description">Description: </label>
              <input className="border-1 border-solid rounded-md mb-5" type="text" name="description" id="description"/>

              <label htmlFor="category">Category: </label>
              <input className="border-1 border-solid rounded-md mb-5" type="text" name="category" id="category"/>

              <label htmlFor="images">Add product images (URL:s): </label>
              <input className="border-1 border-solid rounded-md mb-5" type="text" name="images" id="images"/>

              <button className="p-4 m-4 bg-cyan-700 border-none rounded-md cursor-pointer">Add new product</button>
            </div>
        </form>

      </div>
    </div>
  )
}
export default Products