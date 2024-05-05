import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
const jwt = require('jsonwebtoken');
import Link from 'next/link';
import { AiFillCheckCircle } from 'react-icons/ai';
import Head from 'next/head';

const Orders = () => {

  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token")
    const userData = jwt.decode(token);


    const fetchOrders = async () => {
      const paymentBody = { userData }
      const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentBody),
      });

      const data = await a.json();

      setOrders(data.order)

    }


    if (!localStorage.getItem("token")) {
      router.push("/")
    }
    else {
      fetchOrders();
    }
  }, [])

  return (

    <>
     <Head><title>My Orders</title></Head>
    <div className=' min-h-[100vh] lg:px-[8vw] md:pt-20 pt-28 px-6 bg-red font-noto'>
      <div className='flex flex-col gap-8 mt-10 max-lg:mt-28'>


        <h2 className='font-semibold text-xl text-white'>My Orders</h2>

        <div className="relative overflow-x-auto  mb-8 border border-gray-600">
          <table className="w-full text-sm text-left bg-black/60 ">
            <thead className="text-xs text-white uppercase p-10  rounded-lg border-b border-gray-600 bg_button1 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  More Details
                </th>
              </tr>
            </thead>
            <tbody>

              {orders.map((item) => {

                return (
                  <tr key={item._id} className=" border-b border-gray-600 rounded-lg text-white font-medium  ">
                    <th scope="row" className="px-6 py-4  whitespace-nowrap font-medium">
                      {item.orderId}
                    </th>
                    <td className="px-6 py-4">
                      ₹ {item.amount}
                    </td>
                    <td className="px-6 py-4 flex gap-2 ">
                      {item.status}
                      <AiFillCheckCircle
                        
                        className='cursor-pointer w-5 h-5 text-green-400 '
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/order?id=${item._id}`} className='text-blue-500 underline'>Details</Link>
                    </td>
                  </tr>
                )
              })}


            </tbody>
          </table>
        </div>
      </div>

    </div>
    </>
  )
}


// export async function getServerSideProps(context) {


//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "teach_wear_products",
//       useNewUrlParser: true,
//       useUnifiedTopology: true,

//     })
//   }


//   let orders = await Order.find({})




//   return { props: { orders: orders } }
// }
export default Orders
