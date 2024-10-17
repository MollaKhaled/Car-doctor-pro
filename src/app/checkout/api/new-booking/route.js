import connectDb from "@/lib/connectDb";

export const POST = async (request) => {
  const newBooking = await request.json();
  const carDb = await connectDb()
  const bookingsCollection = carDb.collection('bookings')

  try{
    const res = await bookingsCollection.insertOne(newBooking);
    return Response.json({message: "Booked successfully "}, {status:200})
  }catch(error){
    return Response.json({message: "something is wrong "}, {status:400})
  }
}