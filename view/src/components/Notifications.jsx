import { useShoppingCartContext } from "../contexts/ShoppingCartContext"

const Notifications = () => {

    const { orderProducts } = useShoppingCartContext()

    const notificationNumber = orderProducts.length
    console.log(notificationNumber)

  return (
    <>
        {
            !!notificationNumber &&
            <div className="flex absolute bg-red-500 w-6 h-6 rounded-full right-0 top-1 justify-center text-center">
                <p className="text-xs self-center font-bold">{notificationNumber}</p>
            </div>
        }
    </>
  )
}
export default Notifications