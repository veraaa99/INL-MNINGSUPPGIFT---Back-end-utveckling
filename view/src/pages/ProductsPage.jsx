// All products page

import { nanoid } from "nanoid";
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"

import { useProductContext } from "../contexts/ProductContext"
import { useShoppingCartContext } from "../contexts/ShoppingCartContext"
import { useUserContext } from "../contexts/UserContext"

const ProductsPage = () => {

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: []
  })

  const [error, setError] = useState('')

  const { getProducts, createProduct, updateFormData, setUpdateFormData, products, productEditor, setProductEditor,
    handleUpdateChange, handleUpdateFileChange, handleUpdateSubmit, removeProduct, updateError, setUpdateError } = useProductContext()
  const { addProductToCart } = useShoppingCartContext()
  const { user } = useUserContext()

  const navigate = useNavigate()
  const { state } = useLocation();

  useEffect(() => {
    getProducts()
  }, [state])

  const handleChange = e => {
    setFormData(state => ({
      ...state,
      [e.target.id]: e.target.value
    }))
  }

  // Upload submitted file to MongoDB tutorial: https://www.youtube.com/watch?v=yZjpK5QijlU&t=2776s
  const handleFileChange = async (e) => {
    let files = e.target.files  
    
    const images = await imagebase64(files)

    setFormData(state => ({
    ...state,
    images: images
    }))

  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try {      
      if(formData.name === '' || formData.price == '' ){
        setError('Please fill in name and price')
        return
      } 
      
      createProduct(formData)

      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        images: '',
      })
      
      setError('')
      setUpdateError('')

      // Navigate and rerender components tips: https://stackoverflow.com/a/75612877
      navigate('/products' , { state: nanoid() }) 
             
    } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong')
        console.log(err)

    } 
  }

  const openProductEditor = (product) => {
    setProductEditor(product);

    setUpdateFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      images: '',
    })
  }

  const handleRemove = ( product ) => {
    removeProduct(product)
    navigate('/products', { state: nanoid() })  
  }

  const handleUpdateSubmitAndNavigate = (e) => {
    handleUpdateSubmit(e)
    navigate('/products', { state: nanoid() })
  }

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
                    <li><Link className='md:text-lg sm:text-base' to={`/products/${product._id}`}>{product.name}</Link></li>
                    <p className='pt-2'>Price: {product.price} kr</p>
                    <p className='pt-2'>Category: {product.category}</p>
                  </div>
                    <div className='grid justify-items-center py-2'>
                      { user &&
                        <button className='block p-2 bg-amber-300 rounded-xl m-2 cursor-pointer' type="button" onClick={() => addProductToCart(product)}>Add to cart</button>
                      }
                      <button className='block p-2 bg-orange-700 rounded-xl m-2 cursor-pointer' onClick={() => handleRemove(product)}>Remove product</button>
                      <button className='block p-2 bg-blue-400 rounded-xl m-2 cursor-pointer' onClick={() => openProductEditor(product)}>Update product</button>
                    </div>
                    { productEditor == product &&
                      <div className="flex m-auto">
                        <form id="updateProductForm" onSubmit={handleUpdateSubmitAndNavigate}>
                          <h2 className='md:text-lg sm:text-base mb-3'>Update this product: </h2>
                          <div className='flex flex-col'>

                            <label htmlFor="name">Product name: *</label>
                            <input className="border-1 border-solid rounded-md mb-4" type="text" name="name" id="name" value={updateFormData.name} onChange={handleUpdateChange}/>

                            <label htmlFor="price">Price: *</label>
                            <input className="border-1 border-solid rounded-md mb-4" type="number" name="price" id="price" value={updateFormData.price} onChange={handleUpdateChange}/>

                            <label htmlFor="description">Description: </label>
                            <input className="border-1 border-solid rounded-md mb-4" type="text" name="description" id="description" value={updateFormData.description} onChange={handleUpdateChange}/>

                            <label htmlFor="category">Category: </label>
                            <input className="border-1 border-solid rounded-md mb-4" type="text" name="category" id="category" value={updateFormData.category} onChange={handleUpdateChange}/>

                            <label htmlFor="images">Add product images: </label>
                            <input className="border-1 border-solid rounded-md mb-4" type="file" name="images" id="images" value={updateFormData.images} multiple onChange={handleUpdateFileChange}/>
                            
                            <p className="text-red-500 text-center text-lg mt-5">{updateError}</p>

                            <div className="flex flex-col gap-5">
                              <button className="p-4 px-7 bg-cyan-700 border-none rounded-md cursor-pointer" type="submit"> Update product</button>
                              <button className='p-4 px-7 bg-blue-400 rounded-md self-end cursor-pointer' type="button" onClick={() => setProductEditor(null)}>Close</button>
                            </div>

                          </div>
                        </form>
                      </div>
                    }
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
              <label htmlFor="name">Product name: *</label>
              <input className="border-1 border-solid rounded-md mb-5" type="text" name="name" id="name" value={formData.name} onChange={handleChange}/>

              <label htmlFor="price">Price: *</label>
              <input className="border-1 border-solid rounded-md mb-5" type="number" name="price" id="price" value={formData.price} onChange={handleChange}/>

              <label htmlFor="description">Description: </label>
              <input className="border-1 border-solid rounded-md mb-5" type="text" name="description" id="description" value={formData.description} onChange={handleChange}/>

              <label htmlFor="category">Category: </label>
              <input className="border-1 border-solid rounded-md mb-5" type="text" name="category" id="category" value={formData.category} onChange={handleChange}/>

              <label htmlFor="images">Add product images: </label>
              <input className="border-1 border-solid rounded-md mb-5" type="file" name="images" id="images" multiple onChange={handleFileChange}/>
              
              <p className="text-red-500 text-center text-lg mt-5">{error}</p>

              <button className="p-4 m-4 bg-cyan-700 border-none rounded-md cursor-pointer">Add new product</button>
            </div>
        </form>

      </div>
    </div>
  )
}
export default ProductsPage