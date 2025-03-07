const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Person = require("./model/Person");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connect to databse"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
  app.use(express.json());

app.post("/add", async (req, res) => {
  const { name, age, favoriteFoods } = req.body;
  try {
    const newPerson = new Person({
      name,
      age,
      favoriteFoods
    });
    await newPerson.save();
    res.status(201).send("Person added successfully");

  } catch (err) {
    console.error("Failed to add person:", err);
    res.status(500).send("Failed to add person");
  }
});

app.get('/get/:name',async(req,res)=>{
    try{
const person=await Person.find({name:req.params.name})
res.json(person)
    }
    catch (err) {
        console.error("Failed to add person:", err);
        res.status(500).send("Failed to add person");
}
})
app.get('/findone/:food',async(req,res)=>{
    try{
const person=await Person.findOne({favoriteFoods:req.params.food})
res.json(person)
    }
    catch (err) {
        console.error("Failed to add person:", err);
        res.status(500).send("Failed to add person");
}
})

app.get('/findby/:id', async (req, res) => {
    try {
      const person = await Person.findById(req.params.id);
      res.status(200).json(person);
    } catch (err) {
      res.status(500).send('Error finding person by ID: ' + err.message);
    }
  });
  app.put('/update/:id', async (req, res) => {
    try {
      const person = await Person.findById(req.params.id);
     if(person){
        person.favoriteFoods.push('Hamburger')
        await person.save()
     }
      res.status(200).json(person);
    } catch (err) {
      res.status(500).send('Error finding person by ID: ' + err.message);
    }
  });
  app.put('/updatename/:id', async (req, res) => {
    try {
      const person = await Person.findByIdAndUpdate(req.params.id,{age:20},{new:true});
      await person.save()
      res.status(200).json(person);
    } catch (err) {
      res.status(500).send('Error finding person by ID: ' + err.message);
    }
  });



app.listen(3000, () => {
  console.log("app connected ");
});
