const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());







const uri = "mongodb+srv://husneara:RIVesiMAaD4Rpsao@cluster0.7knelh7.mongodb.net/?retryWrites=true&w=majority";

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
    await client.connect();



    // const roomCollection = client.db('roomData').collection('rooms');
    const detailsDataCollection = client.db("roomData").collection("details");
    const bookingCollection = client.db("roomData").collection("bookings")

    // app.get('/rooms', async(req, res) =>{
    //   const cursor = roomCollection.find();
    //   const result = await cursor.toArray();
    //   res.send(result);
    // })


    app.get('/details', async(req, res) =>{
      const cursor = detailsDataCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await detailsDataCollection.findOne(query);
      res.send(result);
    });



    // bookings

    app.get('/bookings', async(req, res) =>{
      console.log(req.query.email);
      let query = {};
      if(req.query?.email){
        query = {email: req.query.email}
      }
      const result = await bookingCollection.find().toArray();
      res.send(result);
    })


    app.post('/bookings', async (req, res) =>{
      const booking = req.body;
      console.log(booking);
      const result = await bookingCollection.insertOne(booking);
      res.send(result);

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
  res.send('ezystay is running')
})


app.listen(port, () => {
  console.log(`ezystay server is running on port ${port}`)
})