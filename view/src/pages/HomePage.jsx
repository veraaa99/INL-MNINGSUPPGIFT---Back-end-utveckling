// Home page

import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { nanoid } from "nanoid";

import { useProductContext } from "../contexts/ProductContext"
import { useShoppingCartContext } from "../contexts/ShoppingCartContext"
import { useUserContext } from "../contexts/UserContext"

const HomePage = () => {

  const { getProducts, updateFormData, setUpdateFormData, products, productEditor, setProductEditor,
    handleUpdateChange, handleUpdateFileChange, handleUpdateSubmit, removeProduct, updateError } = useProductContext()
  const { addProductToCart } = useShoppingCartContext()
  const { user } = useUserContext()

  const navigate = useNavigate()
  const { state } = useLocation();

  useEffect(() => {
    getProducts()
  }, [state])

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
    navigate('/', { state: nanoid() })  
  }

  const handleUpdateSubmitAndNavigate = (e) => {
    handleUpdateSubmit(e)
    navigate('/', { state: nanoid() })
  }

  return (
    <div className='m-8'>
      <h1 className='text-5xl justify-self-center p-5'>HOME</h1>
      <h2 className='text-3xl justify-self-center p-5'>Popular products: </h2>

      <div>
        <ul className='grid md:grid-cols-2 sm:grid-cols-1 gap-10 md:gap-20 md:m-15 px-20 justify-center'>
            { 
            !!products.length
            ? products.slice(0, 5).map((product) => (
                <div className='flex flex-col text-sm justify-center' key={product._id}>

                  <div>
                    <Link to={`/products/${product._id}`}>
                      <img className='object-cover rounded-lg' src={product.images[0]} ></img>
                    </Link>
                  </div>

                  <div className='flex flex-row justify-between mt-3 flex-wrap'>
                    <div className="mr-4">
                      <li><Link className='md:text-xl' to={`/products/${product._id}`}>{product.name}</Link></li>
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

                            <div className="flex flex-col gap-5">
                              <button className="p-4 px-7 bg-cyan-700 border-none rounded-md cursor-pointer" type="submit"> Update product</button>
                              <button className='p-4 px-7 bg-blue-400 rounded-md self-end cursor-pointer' type="button" onClick={() => setProductEditor(null)}>Close</button>
                            </div>

                            <p className="text-red-500 text-center text-lg mt-5">{updateError}</p>
          
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

    </div>
  )
}
export default HomePage