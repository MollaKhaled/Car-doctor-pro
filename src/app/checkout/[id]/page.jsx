"use client"
import { getServicesDetails } from '@/services/getServices';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Checkout = ({ params }) => {
  const {data} = useSession();
  const [service, setService] = useState({})
  const [loading, setLoading] = useState(true);

  const loadService = async () => {
    const details = await getServicesDetails(params.id);
    setService(details.service)
  }
  const { title, description, _id, img, price, facility } = service || {};
  const handleBooking = async (event) => {
    event.preventDefault();
    const newBooking = {
      name : data?.user?.name,
      email: data?.user?.email,
      date:event.target.date.value,
      serviceTitle: title,
      serviceId:_id,
      price: price,
      
    }
    const res = await fetch('http://localhost:3000/checkout/api/new-booking', {
      method:"POST",
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(newBooking),
    
    })
    const response = await res?.json()
    toast.success(response?.message)
    event.target.reset()
  };
  useEffect(() => {
    loadService()
  }, [params])



  return (
    <div>
      <form onSubmit={handleBooking} className="card-body">
        <h2 className="items-center text-center text-5xl text-bold">book Service:{title}</h2>
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
            <input defaultValue={new Date().getDate()} type="date" name="date"  className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Amount</span>
            </label>
            <input type="text" name='price' defaultValue={price} readOnly className="input input-bordered" required />
          </div>
        </div>
        <div className="form-control mt-6">

          <input className="btn btn-primary btn-block " type="submit" value='Order Confirm' />
        </div>
      </form>
    </div>
  );
};

export default Checkout;