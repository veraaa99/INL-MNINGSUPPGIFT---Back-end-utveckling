import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { useProductContext } from "../contexts/ProductContext"
import { useShoppingCartContext } from "../contexts/ShoppingCartContext"
// import { Promise } from "mongoose"

const ProductsPage = () => {

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: []
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [img, setImg] = useState('')
  const [imgs, setImgs] = useState('')

  const { getProducts, createProduct, products } = useProductContext()
  const { addProductToCart } = useShoppingCartContext()

  const navigate = useNavigate()

  const handleChange = e => {
    setFormData(state => ({
      ...state,
      [e.target.id]: e.target.value
    }))
    console.log(formData)
  }

  const imagebase64 = async (files) => {
    // const reader = new FileReader()
    // await reader.readAsDataURL(file)
    // console.log(
    //   file
    // )

    // const data = new Promise((resolve, reject) => {
    //   reader.onload = () => resolve(reader.result)
    //   reader.onerror = (err) => reject(err)
    // })

    // return data

    // TESTA NEDAN!!!
      // Convert the FileList into an array and iterate
      let newFiles = Array.from(files).map(file => {

        // Define a new file reader
        let reader = new FileReader();
        reader.readAsDataURL(file)

        // Create a new promise
        return new Promise(resolve => {

            // Resolve the promise after reading file
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err)

        });

    });

    // At this point you'll have an array of results
    let res = await Promise.all(newFiles);
    return res

  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    let files = e.target.files    
    
    const images = await imagebase64(files)

    setFormData(state => ({
      ...state,
      images: images
    }))

    console.log(images)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
        
        createProduct(formData)
        setFormData({
          name: '',
          price: '',
          description: '',
          category: '',
          images: '',
        })
        
        if(formData.name === '' || formData.price == '' ){
          setError('Please fill in name and price')
          console.log(error)
          setLoading(false)
          return
        } 
        
        setLoading(true)
        setError('')
        navigate('/')
        
    } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong')
        console.log(err)

    } 
    finally {
        setLoading(false)

    }
  }

  useEffect(() => {
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
                    <li><Link className='md:text-lg sm:text-base' to={`/products/${product._id}`}>{product.name}</Link></li>
                    <p className='pt-2'>Price: {product.price} kr</p>
                    <p className='pt-2'>Category: {product.category}</p>
                  </div>
                  <div className='grid justify-items-center py-2'>
                    <button className='block p-2 bg-amber-300 rounded-xl m-2' type="button" onClick={() => addProductToCart(product)}>Add to cart</button>
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
              <label htmlFor="name">Product name: *</label>
              <input className="border-1 border-solid rounded-md mb-5" type="text" name="name" id="name" value={formData.name} onChange={handleChange}/>

              <label htmlFor="price">Price: *</label>
              <input className="border-1 border-solid rounded-md mb-5" type="text" name="price" id="price" value={formData.price} onChange={handleChange}/>

              <label htmlFor="description">Description: </label>
              <input className="border-1 border-solid rounded-md mb-5" type="text" name="description" id="description" value={formData.description} onChange={handleChange}/>

              <label htmlFor="category">Category: </label>
              <input className="border-1 border-solid rounded-md mb-5" type="text" name="category" id="category" value={formData.category} onChange={handleChange}/>

              {/* <label htmlFor="images">Add product images (URL:s): </label> */}
              {/* <input className="border-1 border-solid rounded-md mb-5" type="text" name="images" id="images" value={formData.images} onChange={handleChange}/> */}

              <label htmlFor="images">Add product images: </label>
              <input className="border-1 border-solid rounded-md mb-5" type="file" name="images" id="images" multiple onChange={handleFileChange}/>

              <button className="p-4 m-4 bg-cyan-700 border-none rounded-md cursor-pointer">Add new product</button>

              {/* { img && <img src={img}/> } */}
            </div>
        </form>

      </div>
    </div>
  )
}
export default ProductsPage