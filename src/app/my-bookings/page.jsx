"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const session = useSession();
  const [bookings, setBookings] = useState([]);
  const loadData = async () => {
    const res = await fetch(`http://localhost:3000/my-bookings/api/${session?.data?.user?.email}`)
    const data = await res.json();
    setBookings(data?.myBookings)
  } 
   const handleDelete = async(id) => {
    const deleted = await fetch(`http://localhost:3000/my-bookings/api/booking/${id}`, {
      method: "DELETE",
    });
    const res = await deleted.json();
    if(res?.response?.deletedCount > 0){
      toast.success(res?.message)
      loadData();
    }
   }

  useEffect(() => {
     loadData();
  },[session])
  return (
    <div>
    <h2>booking </h2>
    <div className="overflow-x-auto">
      <table className="table font-bold">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th></th>
            <th className="font-bold">Service Name</th>
            <th className="font-bold">Price</th>
            <th className="font-bold">Booking Date</th>
            <th className="font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
         {
           bookings.map(({serviceTitle, _id, date, price,index}) => (
            <tr key={_id}>
              <td>1</td>
              <td>{serviceTitle}</td>
              <td>{price}</td>
              <td>{date}</td>
              <td>
                <div className="flex items-center space-x-3">
                <Link href={`/my-bookings/update/${_id}`}><button className="btn btn-warning">Edit</button></Link>
                <button onClick={() =>handleDelete(_id)} className="btn btn-error">Delete</button>
                </div>
              </td>
            </tr>
           ))
         }
        </tbody>

      </table>
    </div>
  </div>
  );
};

export default Page;