const express = require('express');
const cors = require('cors');
// ⚡ import from mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

//🍁 middleware
app.use(express.json());
app.use(cors());

//⚡ mongodb user & pass
// SharePlate-DB
// EYrYQVniThRUXR3o

// ⚡from mongodb cluster --> connection
const uri =
  'mongodb+srv://SharePlate-DB:EYrYQVniThRUXR3o@graphcodeit.1bzo799.mongodb.net/?appName=graphcodeit';

// ⚡ Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect(); // Connect the client to the server

    // 🔰 Database & Collection
    const db = client.db('SharePlate-DB');
    const foodCollection = db.collection('foodData');

    // 🔰 ====== add database related apis here ======= 🔰

    // find -----> get all data
    // findOne ---> get single data

    // 🔰 Use find to get data from the database via get
    app.get('/foods', async (req, res) => {
      const result = await foodCollection.find().toArray();
      res.send(result);
    });

    // 🔰 Get Single Food Details by ID
    app.get('/foods/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await foodCollection.findOne(query);
      res.send(result);
    });

    // post method
    //  insertOne
    //  insertMany

    // 💥 Post and insertOne to put data on the server
    app.post('/foods', async (req, res) => {
      const data = req.body;
      // console.log(data);
      const result = await foodCollection.insertOne(data);
      res.send({
        success: true,
        result,
      });
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// just test part
app.get('/', (req, res) => {
  res.send('Hello World! Simple CRUD Server is running');
});

app.listen(port, () => {
  console.log(`Simple Crud server is running on port ${port}`);
});
