import connectDb from "@/lib/connectDb"
import { services } from "@/lib/services";

export const GET = async () =>{
  const carDb = await connectDb();
  const servicesCollection = carDb.collection('services')
  try {
    await servicesCollection.deleteMany();
    const res = await servicesCollection.insertMany(services);
    return Response.json({message: "Seeded SuccessFully"})
  }
  catch(error){
    console.log(error);
  }
}