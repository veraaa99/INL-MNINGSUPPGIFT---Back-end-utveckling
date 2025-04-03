import axios from "../axios_api/axios"
import { useEffect } from "react"
import { useShoppingCartContext } from "../contexts/ShoppingCartContext"
import { useUserContext } from "../contexts/UserContext"

// Checkout page
const CheckoutPage = () => {

    const { getShoppingCartProducts, orderProducts } = useShoppingCartContext()

    const { token } = useUserContext()

    useEffect(() => {
        getShoppingCartProducts()
      }, [])

    const placeOrder = async( orderProducts ) => {
      console.log(orderProducts)

      const order = []

      orderProducts.forEach(element => {
         order.push(element._id, element.name)
      });

      //Push?
      //FORTSÄTT HÄR

        try {
            const res = await axios.post(`api/orders/`, ({"products": orderProducts, "productId": orderProducts._id}) , {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if(res.status === 201){
                
                console.log('Order succesfully placed!')
            }

        } catch (error) {
            console.log(error)
        }
    }

  // Shopping cart list and order form
  return (
    <div className='px-20 grid md:mx-40 sm:mx-auto my-20 center-items'>
      <h1 className='text-5xl justify-self-center pb-20'>Checkout</h1>

      <div>
        { 
        !!orderProducts.length 
        ? 
            <div className="border-b p-2 w-full space-y-2 max-h-40 overflow-y-auto scrollbar">
                {
                orderProducts.map((product) => (
                    <div key={product._id}>
                        <p>{product.name}</p>
                    </div>
                ))
                }
            </div>
        : 'Your cart is empty'
        }
      </div>

      <div className="pt-20">
        <button onClick={() => placeOrder(orderProducts)}>Place Order</button>
      </div>
    </div>
  )
}

export default CheckoutPage