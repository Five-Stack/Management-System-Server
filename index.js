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



    // userCollection all api

    // get data all users
    app.get('/api/users', async (req, res) => {
      try {
        const users = await usersCollection.find({}).toArray()
        if (users.length === 0) return res.status(404).json({ message: "User not founds !" })
        res.status(200).send(users)
      } catch (error) {
        res.status(500).json({ message: "Internal server error 500 ⚠" })
        console.log({ message: error });
      }
    })

    // add new user
    app.post('/api/addUser', async (req, res) => {
      try {
        const user = req.body;
        const query = { email: user.email }
        // console.log(user,'user');
        const existingUser = await usersCollection.findOne(query);

        if (existingUser) {
          return res.status(404).send({ message: 'User already exists' })
        }

        const result = await usersCollection.insertOne(user);
        res.status(200).send(result);
      } catch (error) {
        res.status(500).json({ message: "Internal server error 500 ⚠" })
        console.log({ message: error });
      }
    })

    // update any user data
    app.put('/api/updateUser/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const userDataUpdate = req.body;
        const filter = { _id: new ObjectId(id) };

        // Check if the provided id is valid
        if (!ObjectId.isValid(id)) {
          res.status(400).json({ message: "Invalid user ID format" });
          return;
        }

        // Check if the user with the provided ID exists
        const existingUser = await usersCollection.findOne(filter);
        if (!existingUser) {
          res.status(404).json({ message: "User data not found" });
          return;
        }

        const options = { upsert: true };
        const updateUser = {
          $set: {
            userName: userDataUpdate.userName ? userDataUpdate.userName : null,
            email: userDataUpdate.email ? userDataUpdate.email : null,
            phoneNo: userDataUpdate.phoneNo ? userDataUpdate.phoneNo : null,
            userImg: userDataUpdate.userImg ? userDataUpdate.userImg : null,
            role: userDataUpdate.role ? userDataUpdate.role : "student",
          },
        };

        const result = await usersCollection.updateOne(filter, updateUser, options);

        if (result.modifiedCount === 0) {
          res.status(404).json({ message: "User data not found" });
        } else {
          res.status(200).json({ message: "User data updated successfully" });
        }

      } catch (error) {
        res.status(500).json({ message: "Internal server error ⚠" });
        console.log({ message: error });
      }
    });


    // update user role data
    app.patch('/api/updateUserRole/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const newRole = req.body.role;

        // Check if the provided id is in a valid ObjectId format
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Check if the requested role is valid
        const validRoles = ['student', 'teacher', 'admin'];
        if (!validRoles.includes(newRole)) {
          return res.status(400).json({ message: 'Invalid user role' });
        }

        const filter = { _id: new ObjectId(id) };
        const existingUser = await usersCollection.findOne(filter);

        if (!existingUser) {
          return res.status(404).json({ message: 'User not found' });
        }

        const updateData = {
          $set: { role: newRole }
        };

        const result = await usersCollection.updateOne(filter, updateData);

        if (result.modifiedCount === 1) {
          return res.status(200).json({ message: 'User role updated successfully' });
        } else {
          return res.status(500).json({ message: 'Failed to update user role' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Internal server error ⚠' });
        console.log({ message: error });
      }
    });

    // delete user
    app.delete('/api/deleteUser/:id', async (req, res) => {
      try {
        const id = req.params.id;

        // Check if the provided id is in a valid ObjectId format
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const filter = { _id: new ObjectId(id) };
        const existingUser = await usersCollection.findOne(filter);

        if (!existingUser) {
          return res.status(404).json({ message: 'User not found' });
        }

        const result = await usersCollection.deleteOne(filter);

        if (result.deletedCount === 1) {
          return res.status(200).json({ message: 'User deleted successfully' });
        } else {
          return res.status(500).json({ message: 'Failed to delete user' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Internal server error ⚠' });
        console.log({ message: error });
      }
    });



/* ========================================================================================================================= */

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
        const id = req.params.id;
        const updateData = req.body;
        const filter = { _id: new ObjectId(id) };

        // Check if the provided id is valid
        if (!ObjectId.isValid(id)) {
          res.status(400).json({ message: "Invalid department ID format" });
          return;
        }

        // Check if the department with the provided ID exists
        const existingDepartment = await departmentCollection.findOne(filter);
        if (!existingDepartment) {
          res.status(404).json({ message: "Department data not found" });
          return;
        }

        const options = { upsert: true };
        const updateDepartmentData = {
          $set: {
            departmentName: updateData.departmentName ? updateData.departmentName : null,
            departmentImg: updateData.departmentImg ? updateData.departmentImg : null,
            departmentInfo: updateData.departmentInfo ? updateData.departmentInfo : null,
            admissionEligibility: updateData.admissionEligibility ? updateData.admissionEligibility : null,
            Workplaces: updateData.Workplaces ? updateData.Workplaces : null,
          },
        };

        const result = await departmentCollection.updateOne(filter, updateDepartmentData, options);

        if (result.modifiedCount === 0) {
          res.status(404).json({ message: "Department data not found" });
        } else {
          res.status(200).json({ message: "Department data updated successfully" });
        }

      } catch (error) {
        res.status(500).json({ message: "Internal server error ⚠" });
        console.log({ message: error });
      }
    });


    // delete department data
    app.delete('/api/deleteDepartment/:id', async (req, res) => {
      try {
        const id = req.params.id;

        // Check if the provided id is in a valid ObjectId format
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid department ID format' });
        }

        const query = { _id: new ObjectId(id) };
        const existingDepartment = await departmentCollection.findOne(query);

        if (!existingDepartment) {
          return res.status(404).json({ message: 'Department data not found' });
        }

        const deleteDepartment = await departmentCollection.deleteOne(query);

        if (deleteDepartment.deletedCount === 1) {
          return res.status(200).json({ message: 'Department deleted successfully' });
        } else {
          return res.status(500).json({ message: 'Failed to delete department' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Internal server error ⚠' });
        console.log({ message: error });
      }
    });
















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


