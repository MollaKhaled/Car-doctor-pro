import connectDb from "@/lib/connectDb"


export const POST = async (request) =>{
  const booking = await request.json()
  const carDb = await connectDb();
  const bookingsCollection = carDb.collection('bookings')
  try {

    const newBooking = await bookingsCollection.insertOne(booking);
    return Response.json({message:"Booked successfully"})
  }
  catch(error){
    console.log(error);
  }
}