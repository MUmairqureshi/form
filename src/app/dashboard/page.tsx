 import Image from 'next/image'

 const API_URL = 'http://127.0.0.1:3000/api/applyform';


import { User } from '@/app/components/lib/schema'
 import { useEffect, useState } from 'react';

 const getData = async () => {
    try {
       const res = await fetch("http://127.0.0.1:3000/api/applyform", {
           method: "GET",
           cache: "no-store",
           headers: {
               "Content-Type": "application/json"
           }
       });
       if (!res.ok) {
           throw new Error("Failed to fetch the data")
       };
       const result = await res.json()
       return result
   } catch (err) {
       console.log(err)
   }
}

  async function  Dashbord () {
    const res: { data: User[] } = await getData();
    
    return (
        <div className='bg-white py-20 px-4 w-full h-full'>

            <div className="relative justify-center mx-auto max-w-[1240px] overflow-x-auto shadow-md sm:rounded-lg">
          
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                City
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {res.data.map((data) => (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <th key={data.id} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {data.id}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {data.firstName}
                            </th>
                            <td className="px-6 py-4">
                                {data.lastName}
                            </td>

                            <td className="px-6 py-4">
                                {data.phoneNumber}
                            </td>
                            <td className="px-6 py-4">
                                {data.city}
                            </td>

                            <td className="px-6 py-4">
                                {data.country}
                            </td>
                            <td className="px-6 py-4">
                                {data.email}
                            </td>
                            <td className="px-6 py-4">

                            </td>
                        </tr>))}

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Dashbord












