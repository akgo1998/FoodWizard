# Project Proposal

## Project Title: Food Wizard

## Project Summary: 
A database access system that provides users with recipes based on given ingredients, time limits, budget constraints, dietary constraints, and more. This will be enforced through a web-based user interface where specifications can be given as inputs and results can be viewed. An additional feature of our recipe system is the ability for users to rate the recipes. These ratings will be stored and utilized to sort the recipes based on popularity. 

We will be creating a web app using HTML/CSS/Javascript to interact with our backend Google Cloud Platform MySQL database. Using this web app, users will be able to filter out recipes that they can implement with the available resources. User information will also be stored in separate accounts, where they can keep track of their favorite recipes for easy retrieval. 

## Description: 
Our aim with this project is to provide users with an optimized cooking experience by providing recipes that match their requirements. This solves the problem of never knowing what to make, especially as college students, who don’t have access to a top tier kitchen and pantry. This application will serve as a middle-man with the objective of removing the painstaking process of figuring out what you want to make for dinner today. 

## Usefulness: 
Our project is useful in that it gives a direct and personalized solution to the problem of not knowing what to make or how to make it. We will have a favorites’ system that allows users to maintain recipes that they like.  There are definitely similar applications out there such as Supercook.com, Tasty, etc. Our application will have actual recipes that are right there to view on our user interface instead of linking to other websites like SuperCook.

## Realness: 
We are getting our data from a recipe API (RapidAPI) that has over 365,000 recipes and around 86,000 food products. In particular, the Spoonacular API provides information on recipes, food ingredients and nutrition values. We will go through this data before appending it to our database to make sure it is clean and usable. 

## Functionality: 
Our database will store recipes, ingredients, nutrition and more as defined by the bullet points below. The data is from a recipe API as defined above. Our web application will have a user interface that allows the user to select and sort recipes based on several criteria such as cost, ingredients, cooking time, rating, and more. These will all be options on a filter system on the main page of our app that the user can modify to get what they want. These filters will correlate with the queries made to our database and the result of these will be displayed for the user. More complex functionality will correspond with more complex filters defined by the user. We will also have a rating system where the users can provide a rating for a recipe they tried out and that will be stored and utilized by our app to rank recipes. Two additional entities - Stores and Restaurants have been added as a unique feature to this project. They are connected to Ingredients and Recipes respectively and help the users find stores that sells the ingredients required or restaurants that sell the dishes. Lastly, we will have a simple favorites system tied to our users that can allow them to store recipes that they mark as ‘favorite’. 
The following would be the attributes related to the database:

Recipes (RecipeId, Ingredients, Instructions, Cooking time, Rating, CountRatings, Cuisine, Nutritional value, Price per serving, Serving size)
Recipe_map (RecipeId,IngredientId, MeasurementQtyId, MeasurementUnitId)
Similar_recipes(RecipeId, SimilarRecipesId)
UnitsTable (MeasurementUnitId, MeasurementUnit)
Quantity (MeasurementQtyId,Qty)
Ingredients (IngredientId, Ingredients)
User data (UserId, Password, FavRecipeId, FavCuisines)	


Note: We would be coming up with separate significant entities during Stage 2 which would provide a more detailed structure to the project. 

## UI Fidelity Mockup: 
Filters: Ingredients (Text), Cooking time (Range), Cost (Range), Dietary restrictions (Vegetarian, Vegan, Pescetarian etc.)

#### Page 1

![Page 1](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/UI%20Mock-up_%20CS%20411%20Project_00_00.jpg?raw=true)

#### Page 2

![Page 2](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/UI%20Mock-up_%20CS%20411%20Project_01_00.jpg?raw=true)

#### Page 3

![Page 3](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/UI%20Mock-up_%20CS%20411%20Project_02_00.jpg?raw=true)



## Group Work Split:

Saagar and Taeho - Primarily work on the frontend with intersection to backend. This is because both of us have experience working on websites and our skill sets would be applicable here. Obviously there would be interaction with the backend to implement proper functionality.

Sushama and Akash - The main focus would be on the backend work and consequent integration with the frontend section. We believe this type of work division would ensure that everyone showcases their strengths while also having the opportunity to upskill in the application of full-stack development concepts. 

