const mongoose=require('mongoose')

const Personschema= new  mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String],
})
const Person= mongoose.model('Person',Personschema)

module.exports=Person