import connectDb from "@/lib/connectDb";

export const GET = async (request, {params}) => {
  const carDb = await connectDb()
  const bookingsCollection = carDb.collection('bookings')
  try{
    const myBookings = await bookingsCollection.find({email: params.email}).toArray();
    return Response.json({myBookings})
  }catch(error){
    console.log(error);
  }
}