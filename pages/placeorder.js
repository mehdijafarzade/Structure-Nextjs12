import Checkoutwizard from "../../components/Checkoutwizard";
import Layout from "../components/Layout";
import { useContext } from "react";
import { cartContext } from "../components/context/Cart";
import Link from "next/link";
import { useRouter } from "next/router";

function Placeorder(){
    const {state} = useContext(cartContext)
    const {cart} = state
    const {shippingData} = cart
    const {paymentMethod} = cart
    const {cartItems} = cart
    const router = useRouter()

    async function placeOrderHandler() {
        const totalPrice = cartItems.reduce(
          (acc, cur) => acc + cur.qty * cur.price,
          0
        )
    
        await fetch('/api/orders', {
          method: 'POST',
          body: JSON.stringify({
            orderItems: cartItems,
            shippingData: shippingData,
            paymentMethod: paymentMethod,
            totalPrice: totalPrice,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
    
        router.push('/Completed-order')
      }

    return (
        <Layout title='place order'>
            <Checkoutwizard  activeStep={3}></Checkoutwizard>
            <div >
                <div>
                    <ul className="mb-2">
                        <h2 className="text-xl">shippingData</h2>
                        <li>name: {shippingData.namee}</li>
                        <li>postalCode: {shippingData.postalCode}</li>
                        <li>Address: {shippingData.address}</li>
                    </ul>
                    <Link className="bg-blue-400 p-2 rounded-xl " href='/shipping'>Edit</Link>
                </div>
                <div>
                    <h2 className="text-xl mt-2 mb-2">Payment method: {paymentMethod}</h2>
                    <Link className="bg-blue-400 p-2 rounded-xl "  href='/payment'>Edit</Link>

                </div>
                <div className="mt-3">
                    {cart.cartItems.map((item)=>(
                        <div >
                            <img className="w-24" src={item.image}/>
                            <li>price: {item.qty * item.price}</li>
                            <li>total price{cartItems.reduce((acc , cur)=> acc + cur.qty * cur.price  , 0)}</li>
                        </div>
                    ))}
                </div>
                <button className="bg-blue-400 p-2 rounded-xl" onClick={placeOrderHandler}>Placeorder</button>
            </div>
        </Layout>

    ) 
}
export default Placeorder;