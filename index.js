const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
//user:job123
//pass:tdSDkWphgUv1ku1k
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://job123:tdSDkWphgUv1ku1k@cluster0.ta7rt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
async function run(){
  try{
    await client.connect();
    const profileCollection =client.db('jobtask').collection('profile');
    console.log('db connected');
    const projectCollection =client.db('jobtask').collection('projects');

    //get profile
  //   app.get('/profile', async (req, res) => {
  //     const query = {};
  //     const cursor = profileCollection.find(query);
  //     const items = await cursor.toArray();
  //     res.send(items);
  // });
//   app.get('/users/:email', async (req, res) => {
//     const email = req.params.email;
//     const query = {email: email};
//     const cursor = userCollection.find(query);
//     const reviews = await cursor.toArray();
//     res.send(reviews);

// });
//get profile by id
app.get('/profile/:email', async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const result = await profileCollection.findOne(query);
  res.send(result);

});

//put profile
app.put('/profile/:email', async (req, res) => {
  const email = req.params.email;
  const user = req.body;
  const filter = { email: email };
  const options = { upsert: true };
  const updateDoc = {
    $set: user,
  };
  const result = await profileCollection.updateOne(filter, updateDoc, options);
  
  res.send( result);
})

//projects get all
app.get('/projects',async(req,res)=>{
  const users = await projectCollection.find().toArray()
  res.send(users)
})
//get by id project
app.get('/projects/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await projectCollection.findOne(query);
  res.send(result);

});
//project post
app.post('/projects', async (req, res) => {
  const newProject = req.body;
  const result = await projectCollection.insertOne(newProject);
  res.send(result);
});
//project delete by id
app.delete('/projects/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await projectCollection.deleteOne(query);
  res.send(result); 
});


  }finally{

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Server Running');
});

app.listen(port, () => {
    console.log('Listening to port', port);
})