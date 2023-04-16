require('dotenv').config()

const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyparser = require("body-parser");
const flash = require('express-flash');
const session = require('express-session');

app.use(bodyparser.urlencoded({extended : true}));
app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'projectdatavase',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}))

app.use(flash());

const port = process.env.PORT || 3005;


// DONEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
// app.post("/api/searchRecipe", (require, response) => {
//   const recipeId = require.body.recipeID;
 
//   const sqlInsert = "SELECT * FROM `Recipes` WHERE `RecipeID` = ?" ;
//   pool.query(sqlInsert, [recipeId], (err, result) => {
//     if (err) {
//       response.status(400).send(err);
//     } else {
//       response.status(200).send(result);
//     }
//   })
// });

app.post("/api/mainSearch", (require, response) => {
  //ALL VARIABLES FOR MAIN SEARCH FUNCTION
  const cuisine = require.body.cuisine;
  const minRating = require.body.minRating;
  const maxCookingTime = require.body.maxCookingTime;
  const servingSize = require.body.servingSize;
  const keyword = require.body.keyword;

  //FUNCTION CALL TO OUR QUERY CRAFTER

  const sqlInsert = createMainQuery(cuisine, minRating, maxCookingTime, servingSize, keyword);
  // console.log(sqlInsert);
  pool.query(sqlInsert, (err, result) => {
    if (err) {
      response.status(400).send(err);
    } else {
      response.status(200).send(result);
    }
  })
});

app.post("/api/getRecipeInformation", (require, response) => {
  const recipeID = require.body.recipeID;

  const sqlInsert = `SELECT * FROM Recipes WHERE RecipeID = ?`;
  pool.query(sqlInsert, [recipeID], (err, result) => {
    if (err) {
      response.status(400).send(err);
    } else {
      response.status(200).send(result);
    }
  })
});

// app.post("/api/adv1", (require, response) => {
//   console.log("BTICH");
//   const cookingTime = require.body.cookingTime;
//   const rating = require.body.rating;
//   const ratingsCount = require.body.ratingsCount;
//   const restPrice = require.body.restPrice;

//   const sqlInsert = "(SELECT RecipeID, RecipeName, CookingTime FROM Recipes WHERE CookingTime < ? AND Rating > ? AND RatingsCount > ?) UNION (SELECT RecipeID, RecipeName, CookingTime FROM Recipes NATURAL JOIN Serves JOIN Restaurants USING (RestaurantID) WHERE Rest_Price < ?) LIMIT 10;" ;
//   pool.query(sqlInsert, [cookingTime, rating, ratingsCount, restPrice], (err, result) => {
//     if (err) {
//       response.send(err);
//     } else {
//       response.status(200).send(result);
//     }
//   });
// });

// app.post("/api/adv2", (require, response) => {
//   console.log("BTICH");
//   const difference = require.body.difference;
//   console.log(difference);
//   const sqlInsert = "SELECT RecipeName, RestaurantName, Rest_Price, Round(STOREPRICE, 2) AS store_Price FROM Serves NATURAL JOIN Recipes JOIN Restaurants USING (RestaurantID) JOIN (SELECT RecipeID, SUM(Store_Price) as STOREPRICE FROM Recipe_map NATURAL JOIN Buy JOIN Store USING (StoreID) GROUP BY RecipeID) T1 USING (RecipeID) WHERE ABS(Rest_Price-STOREPRICE ) <= ? LIMIT 15;" ;
//   pool.query(sqlInsert, [difference], (err, result) => {
//     if (err) {
//       console.log(err);
//       response.send(err);
//     } else {
//       console.log(result);
//       response.status(200).send(result);
//     }
//   });
// });

app.post("/api/restaurantPriceRank", (require, response) => {
  const keyword = require.body.keyword;
 
  const sqlInsert = `CALL Result('${keyword}');`;
  pool.query(sqlInsert, (err, result) => {
    if (err) {
      response.status(400).send(err);
    } else {
      response.status(200).send(result);
    }
  })
});









app.post("/api/createUser", (require, response) => {
  const userId = require.body.userID;
  const userPassword = require.body.userPassword;
  const userName = require.body.name;
  const userFavRec = null;
  const userFavCuis = require.body.userFavCuis;

  const sqlInsert = "INSERT INTO `User_Data` (`UserID`, `Password`, `FavRecipeID`, `Name`, `FavCuisine`) VALUES (?,?,?,?,?)";
  pool.query(sqlInsert, [userId, userPassword, userFavRec, userName, userFavCuis], (err, result) => {
    if (err) {
      response.status(400).send("Sorry that INSERT is invalid.");
    } else {
      response.status(200).send("Insert worked.");
    }
  })
});

//DONEEEEEEEEEEEEEEEEEEEEEEEEEEee
app.post("/api/deleteUser", (require, response) => {
  const userId = require.body.userID;

  const sqlInsert = "DELETE FROM User_Data WHERE `UserID` = ?";
  pool.query(sqlInsert, [userId], (err, result) => {
    if (err) {
      response.status(400).send("Sorry that DELETE is invalid.");
    } else {
      response.status(200).send("That entry has been successfully deleted.");
    }
  })
});

//DONEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
app.post("/api/getUser", (require, response) => {
  const userID = require.body.userID;
  const userPassword = require.body.userPassword;
  console.log(userID);

  const sqlInsert = "SELECT * FROM `User_Data` WHERE `UserID` = ? AND `Password` = ?" ;
  pool.query(sqlInsert, [userID, userPassword], (err, result) => {
    if (err) {
      response.status(400).send(err);
    } else {
      response.status(200).send(result);
    }
  });
});

//DONEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
app.post("/api/updateRating", (require, response) => {
  const recipeId = require.body.recipeID;
  const recipeRating = require.body.rating;
 
  const sqlInsert = "UPDATE `Recipes` SET `Rating` = ? WHERE `RecipeID` = ?;" ;
  pool.query(sqlInsert, [recipeRating, recipeId], (err, result) => {
    if (err) {
      response.status(400).send(err);
    } else {
      response.status(200).send("Updated.");
    }
  })
});

app.post("/api/updatePassword", (require, response) => {
  const userID = require.body.userID;
  const userPassword = require.body.userPassword;
  const newUserPassword = require.body.newUserPassword;
 
  const sqlInsert = "UPDATE `User_Data` SET `Password` = ? WHERE `UserID` = ? AND `Password` = ?;" ;
  pool.query(sqlInsert, [newUserPassword, userID, userPassword], (err, result) => {
    if (err) {
      response.status(400).send(err);
    } else {
      response.status(200).send("Updated.");
    }
  })
});




app.post("/api/updateFavoriteRecipe", (require, response) => {
  const recipeID = require.body.recipeID;
  const userID = require.body.userID;
  const userPassword = require.body.userPassword;
 
  const sqlInsert = "UPDATE `User_Data` SET `FavRecipeID` = ? WHERE `UserID` = ? AND `Password` = ?;" ;
  pool.query(sqlInsert, [recipeID, userID, userPassword], (err, result) => {
    if (err) {
      response.status(400).send(err);
    } else {
      response.status(200).send("Updated.");
    }
  })
});

app.post("/api/updateFavoriteCuisine", (require, response) => {
  const favCuisine = require.body.favCuisine;
  const userID = require.body.userID;
  const userPassword = require.body.userPassword;
 
  const sqlInsert = "UPDATE `User_Data` SET `FavCuisine` = ? WHERE `UserID` = ? AND `Password` = ?;" ;
  pool.query(sqlInsert, [favCuisine, userID, userPassword], (err, result) => {
    if (err) {
      response.status(400).send(err);
    } else {
      response.status(200).send("Updated.");
    }
  })
});


app.post("/api/adv1", (require, response) => {
  const cookingTime = require.body.cookingTime;
  const rating = require.body.rating;
  const ratingsCount = require.body.ratingsCount;
  const restPrice = require.body.restPrice;
  console.log(cookingTime);
  const sqlInsert = "(SELECT RecipeID, RecipeName, CookingTime, Rating, ServingSize FROM Recipes WHERE CookingTime < ? AND Rating > ? AND RatingsCount > ?) UNION (SELECT RecipeID, RecipeName, CookingTime FROM Recipes NATURAL JOIN Serves JOIN Restaurants USING (RestaurantID) WHERE Rest_Price < ?) LIMIT 10;" ;
  pool.query(sqlInsert, [cookingTime, rating, ratingsCount, restPrice], (err, result) => {
    if (err) {
      response.send(err);
    } else {
      response.status(200).send(result);
    }
  });
});

app.post("/api/adv2", (require, response) => {
  console.log("BITCH");
  const difference = require.body.difference;
  const sqlInsert = "SELECT RecipeName, RestaurantName, Rest_Price, Round(STOREPRICE, 2) AS store_Price, Rating, ServingSize FROM Serves NATURAL JOIN Recipes JOIN Restaurants USING (RestaurantID) JOIN (SELECT RecipeID, SUM(Store_Price) as STOREPRICE FROM Recipe_map NATURAL JOIN Buy JOIN Store USING (StoreID) GROUP BY RecipeID) T1 USING (RecipeID) WHERE ABS(Rest_Price-STOREPRICE ) <= ? LIMIT 15;" ;
  pool.query(sqlInsert, [difference], (err, result) => {
    if (err) {
      console.log(err);
      response.send(err);
    } else {
      console.log(result);
      response.status(200).send(result);
    }
  });
});

app.get("/api/allUsers", async(req,res) => {
  const query = "SELECT * FROM User_Data LIMIT 5;";
  pool.query(query, (error, results) => {
    res.json(results);
  });
});

const pool = mysql.createPool({
  user:process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST
});

app.get('/output', (require, response) => {
  response.send(require.flash('L'));
});

app.listen(3005, () => {
 console.log("running on port 3005");
 console.log("BITCH");
});

app.get('/status', (req, res) => res.send('Workingg!'));

// Port 8080 for Google App Engine
app.set('port', 3005);

function createMainQuery(cuisine, minRating, cookingTime, servingSize, keyword) {
  //Logic checks for valid parameters
  if (cuisine === null) {
    cuisine = "";
  }
  if (minRating === null) {
    minRating = 0;
  }
  if (servingSize === null) {
    servingSize = 0;
  }
  if (cookingTime === null) {
    cookingTime = 1000;
  }
  if (keyword === null) {
    keyword = "";
  }

  return `SELECT RecipeID, RecipeName, Rating, ServingSize, CookingTime FROM Recipes WHERE Cuisine LIKE "%${cuisine}%"  AND Rating > ${minRating} AND CookingTime < ${cookingTime} AND ServingSize > ${servingSize} AND RecipeName LIKE "%${keyword}%" ORDER BY Rating DESC LIMIT 10;`
  
}
