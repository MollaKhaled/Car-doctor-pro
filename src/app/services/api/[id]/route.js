import connectDb from "@/lib/connectDb"


export const GET = async (request, {params}) =>{
  const carDb = await connectDb();
  const servicesCollection = carDb.collection('services')
  try {

    const service = await servicesCollection.findOne({_id: params.id});
    return Response.json({service})
  }
  catch(error){
    console.log(error);
  }
}