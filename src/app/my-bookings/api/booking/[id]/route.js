import connectDb from "@/lib/connectDb";
import { ObjectId } from "mongodb";

export const DELETE = async (request, {params}) => {
  const carDb = await connectDb()
  const bookingsCollection = carDb.collection('bookings')
  try{
   const res =  await bookingsCollection.deleteOne({_id: new ObjectId(params.id)});
    return Response.json({message: "Deleted successfully", response:res});
  }catch(error){
    return Response.json({message: "something wrong"});
  }
}
export const PATCH = async (request, { params }) => {
  const carDb = await connectDb();
  const bookingsCollection = carDb.collection('bookings');
  const updateDoc = await request.json();
  try{
   const res =  await bookingsCollection.updateOne(
    {_id: new ObjectId(params.id)},
    {
      $set:{
        ...updateDoc
      }
    },
    {
      upsert : true
    }
  
  );
    return Response.json({message: "Updated successfully", response:res});
  }catch(error){
    return Response.json({message: "something wrong"});
  }
}

export const GET = async (request, {params}) => {
  const carDb = await connectDb();
  const bookingsCollection = carDb.collection('bookings')
  try{
   const res =  await bookingsCollection.findOne({_id: new ObjectId(params.id)});
    return Response.json({message: "Booking Found", response:res});
  }catch(error){
    return Response.json({message: "something wrong"});
  }
}