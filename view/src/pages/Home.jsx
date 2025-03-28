import { useEffect, useState } from "react"
import axios from "../axios_api/axios"
import { Link } from "react-router"

const Home = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async() => {
      try {
        const res = await axios.get('/api/products')
        if(res.status !== 200) return
  
        // const data = res.json()
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
      <h1 className='text-5xl justify-self-center p-5'>HOME</h1>
      <h2 className='text-3xl justify-self-center p-5'>Popular products: </h2>

      <div>
        <ul className='grid md:grid-cols-2 sm:grid-cols-1 gap-10 md:gap-20 md:m-15 px-20 justify-center'>
            { 
            !!products.length
            ? products.map((product) => (
                <div className='flex flex-col text-sm justify-center' key={product._id}>
                  <div>
                    <Link to={`/products/${product._id}`}>
                      <img className='object-cover rounded-lg' src={product.images[0]} ></img>
                    </Link>
                  </div>

                  <div className='flex flex-row justify-between m-3 flex-wrap'>
                    <div>
                      <li><Link className='md:text-xl' to={`/products/${product._id}`}>{product.name}</Link></li>
                      <p className='pt-2'>Price: {product.price} kr</p>
                    </div>
                    <div className='grid justify-items-center py-2'>
                    <button type="button">Add to cart</button>
                    {/* <SetQuantityButton product={product} /> */}
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

    </div>
  )
}
export default Home