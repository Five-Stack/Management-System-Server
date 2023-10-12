const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
// const stripe = require("stripe")(process.env.payment_secreat_key);
// const jwt = require('jsonwebtoken');
const port = process.env.PORT || 4000
const cors = require('cors');

app.use(cors())
app.use(express.json())

// mongoDb uri get env file
const uri = process.env.uri

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const usersCollection = client.db('managementSystemDB').collection('users')
    const departmentCollection = client.db("managementSystemDB").collection("allDepartments")



    // departmentCollection all operations

    //get data departmentCollection data
    app.get('/api/departments', async (req, res) => {
      try {
        const departments = await departmentCollection.find({}).toArray()
        if (departments.length === 0) return res.status(404).json({ message: "No Departments Data Found!" })
        res.status(200).send(departments)
      } catch (error) {
        res.status(500).json({ message: "Internal server error 500 ⚠" })
        console.log({ message: error });
      }
    })

    // add new departmentData
    app.post('/api/addDepartment', async (req, res) => {
      try {
        const newDepartment = req.body
        const result = await departmentCollection.insertOne(newDepartment)
        res.status(200).send(result)
      } catch (error) {
        res.status(500).json({ message: "Internal server error 500 ⚠" })
        console.log({ message: error });
      }
    })

    // update department data
    app.put('/api/updateDepartment/:id', async (req, res) => {
      try {
        const id = req.params.id
        const updateData = req.body
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        // const {departmentName,departmentImg,departmentInfo,admissionEligibility,Workplaces} = value
        const updateDepartmentData = {
          $set: {
            departmentName: updateData.departmentName ? updateData.departmentName : null,
            departmentImg: updateData.departmentImg ? updateData.departmentImg : null,
            departmentInfo: updateData.departmentInfo ? updateData.departmentInfo : null,
            admissionEligibility: updateData.admissionEligibility ? updateData.admissionEligibility : null,
            Workplaces: updateData.Workplaces ? updateData.Workplaces : null,
          },
        };
        const result = await departmentCollection.updateOne(filter, updateDepartmentData, options)
        if (result.modifiedCount === 0) return res.status(404).json({ message: "Department data not found!" })
        res.status(200).send(result)

      } catch (error) {
        res.status(500).json({ message: "Internal server error 500 ⚠" })
        console.log({ message: error });
      }
    })

    // delete department data
    app.delete('/api/deleteDepartment/:id', async (req, res) => {
      try {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const deleteDepartment = await departmentCollection.deleteOne(query)
        if (deleteDepartment.deletedCount === 0) return res.status(404).json({ message: "Department data not found!" })
        res.status(200).send(deleteDepartment)
      } catch (error) {
        res.status(500).json({ message: "Internal server error 500 ⚠" })
        console.log({ message: error });
      }
    })















    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('<h1 style="color:#333;text-align:center;font-size:20px;margin:10px 0;">Management System Server Is Running !!!</h1>')
})

app.listen(port, () => {
  console.log(`The Server Is Running On Port:http://localhost:${port}`);
})












//varify jwt
// const varifyJwt = (req, res, next) => {
//   const authorization = req.headers.authorization
//   if (!authorization) {
//     return res.status(401).send({ error: true, message: 'unauthorized access' })
//   }
//   //bearer token
//   const token = authorization.split(' ')[1]
//   jwt.verify(token, process.env.access_token_secreat_key, (err, decoded) => {
//     if (err) {
//       return res.status(403).send({ error: true, message: 'unauthorized access' })
//     }
//     req.decoded = decoded
//     next()
//   })
// }


  //post jwt
  // app.post('/jwt', (req, res) => {
  //   const user = req.body
  //   // console.log('user',user);
  //   const token = jwt.sign(user, process.env.access_token_secreat_key, { expiresIn: '1h' })
  //   res.send({ token })
  // })




  // varifyAdminJwt
    // const varifyAdminJwt = async (req, res, next) => {
    //   const email = req.decoded.email
    //   const query = { email: email }
    //   const user = await usersCollection.findOne(query)
    //   if (user?.role !== 'admin') {
    //     return res.status(403).send({error:true,message:'forbidden message'})
    //   }
    //   next()
    // }



          // create payments intent
      // app.post('/payment',varifyJwt,async (req,res) => {
      //   const { price } = req.body
      //   const amount = parseInt(price * 100)
      //   console.log('price',price,'amount',amount);
      //   const paymentIntent = await stripe.paymentIntents.create({
      //     amount: amount,
      //     currency: 'usd',
      //     payment_method_types:['card']
      //   })
      //   res.send({
      //     clientSecret:paymentIntent.client_secret
      //   })
      // })