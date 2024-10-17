"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const Page = ({ params }) => {
  const { data } = useSession();
  const [booking, setBooking] = useState([]);
  const [service, setService] = useState({});
  const { title, description, _id, img, price, facility,date } = service || {};
    const loadBooking = async () => {
    const bookingDetail = await fetch(`http://localhost:3000/my-bookings/api/booking/${params.id}`);

    const data = await bookingDetail.json();
    console.log(data);
    setBooking(data.response)
    console.log(booking);
  };
  useEffect(() => {
    loadBooking();
  }, [params])
  const handleUpdateBooking = async (event) => {
    event.preventDefault();
    const updatedBooking = {
      date: event.target.date.value,
      // phone: event.target.phone.value,
      address: event.target.address.value,
    }
    const res = await fetch(`http://localhost:3000/my-bookings/api/booking/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatedBooking)
    })
    if (res.status === 200) {
      toast.success("Updated successfully")
      
    }
   
  }
 

  
  return (
    <div>
      <form onSubmit={handleUpdateBooking} className="card-body">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" name='name' placeholder="name" defaultValue={data?.user?.name} className="input input-bordered" required />

          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="email" name="email" defaultValue={data?.user?.email} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input  type="date"defaultValue={booking.date}  name="date" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Amount</span>
            </label>
            <input type="text" name='price' defaultValue={booking.price} readOnly className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input type="text" name='address' defaultValue={booking.address} className="input input-bordered" required />
          </div>
        </div>
        <div className="form-control mt-6">

          <input className="btn btn-primary btn-block " type="submit" value='Order Confirm' />
        </div>
      </form>
    </div>
  );
};

export default Page;