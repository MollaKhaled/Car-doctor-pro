import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ServiceCard = ({service}) => {
  const {title, img, price, _id} = service || {};
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
    <figure className="px-10 pt-10">
      {/* <img
        src={img}
        alt="Shoes"
        className="rounded-xl" /> */}
        <Image src={img} alt={title} height={120} width={430}></Image>
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{title}</h2>
      <p className='text-xl text-orange-500'>Price:${price}</p>
      <div className="card-actions">
       <Link href={`/services/${_id}`}><button className="btn btn-primary">View Details</button></Link>
      </div>
    </div>
  </div>
  );
};

export default ServiceCard;