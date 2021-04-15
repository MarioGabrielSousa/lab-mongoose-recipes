const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

async function updateRecipes() {
  try {
    let recipe = await Recipe.create({
      title: "Seitan grelhado com batatinhas",
    });
    console.log("recipe created", recipe.title);
    let many = await Recipe.insertMany(data);
    many.forEach((recipe) => console.log(recipe.title));
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    console.log("Recipe's duration is updated");
    await Recipe.deleteOne({ title: "Carrot Cake"});
    console.log("Carrot Cake is gone. Gurl bye!")
/*
    //DELETE
    await User.deleteMany({ $or: [{ name: "Lucia" }, { name: "Luis" }] });
    console.log("Users deleted"); */
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    updateRecipes();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
