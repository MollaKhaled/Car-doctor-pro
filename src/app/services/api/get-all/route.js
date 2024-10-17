import connectDb from "@/lib/connectDb"
import { NextResponse } from "next/server";


export const GET = async () =>{
  const carDb = await connectDb();
  const servicesCollection = carDb.collection('services')
  try {

    const services = await servicesCollection.find().toArray();
    return NextResponse.json({services})
  }
  catch(error){
    console.log(error);
  }
}