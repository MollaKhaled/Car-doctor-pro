import connectDb from "@/lib/connectDb";
import bcrypt  from  "bcrypt";

export const POST = async (request) => {
  const newUser = await request.json();
  try {

    const carDb = await connectDb();
   
    const usersCollection = carDb.collection('users')
    const exist = await usersCollection.findOne({ email: newUser.email });
    if (exist) {
      return Response.json({ message: "User Exists" }, { status: 304 });
    }
    const hashedPassword = bcrypt.hashSync(newUser.password, 14)
    const res = await usersCollection.insertOne({...newUser, password:hashedPassword});
    return Response.json({ message: "new user created" }, { status: 200 });

  }
  catch (error) {
    return Response.json({ message: "something is wrong", error }, { status: 500 });
  }
}