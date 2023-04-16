## 1. DATABASE TABLE IMPLEMENTATION

The following tables have been implemented in the Food Wizard database: 
![Page 1](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/545cfdd2bbbd3a0283b442e5a234fc9f48f912e8/doc/Stage%203/Stage%203%20question%201.png)

## 2. DDL COMMANDS 

### 2.1. Creates Recipes Table 
CREATE TABLE Recipes ( 
	<br />RecipeID INT NOT NULL, <br />Instructions VARCHAR(500), <br /> 
	CookingTime REAL, <br />RatingsCount INT,<br /> 
	Rating REAL,<br /> 
	Cuisine VARCHAR(50), 
	<br />ServingSize REAL, 
	<br />RecipeName VARCHAR(100), 
	<br />PRIMARY KEY (RecipeID)  
);                                                                          

### 2.2. Creates Ingredients Table 
CREATE TABLE Ingredients (
	<br />IngredientID INT NOT NULL,
	<br />IngredientName VARCHAR(100),
	<br />PRIMARY KEY(IngredientID)
);

### 2.3. Creates User_Data Table 
CREATE TABLE User_Data (
	<br />UserID VARCHAR(100) NOT NULL,
	<br />Password VARCHAR(100),
	<br />Name VARCHAR(100),
	<br />FavRecipeID INT,
	<br />FavCuisineID VARCHAR(100),
	<br />PRIMARY KEY (UserID)
);

### 2.4. Creates Restaurants Table 
CREATE TABLE Restaurants (
	<br />RestaurantID INT NOT NULL,
	<br />RestaurantName VARCHAR(100),
	<br />Rest_Location VARCHAR(100),
	<br />PRIMARY KEY (RestaurantID)
);

### 2.5. Creates Store Table 
CREATE TABLE Store (
	<br />StoreID INT NOT NULL,
	<br />StoreName VARCHAR(100),
	<br />Store_Location VARCHAR(100),
	<br />PRIMARY KEY (StoreID)
);

### 2.6. Creates Recipe_map Table 
CREATE TABLE Recipe_map (
<br />RecipeID INT NOT NULL,
<br />IngredientID INT NOT NULL,
<br />MeasurementQty INT,
<br />MeasurementUnit VARCHAR(10),
<br />PRIMARY KEY (RecipeID, IngredientID),
<br />FOREIGN KEY (RecipeID) 
<br />REFERENCES Recipes(RecipeID) 
<br />ON DELETE CASCADE,
<br />FOREIGN KEY (IngredientID) 
<br />REFERENCES Ingredients(IngredientID) 
<br />ON DELETE CASCADE
);

### 2.7. Creates Serves Table 
CREATE TABLE Serves (
	<br />RecipeID INT NOT NULL,
	<br />RestaurantID INT NOT NULL,
	<br />Rest_Price REAL,
	<br />PRIMARY KEY (RecipeID, RestaurantID),
	<br />FOREIGN KEY (RecipeID)
		REFERENCES Recipes(RecipeID)
		ON DELETE CASCADE,
	<br />FOREIGN KEY (RestaurantID)
		REFERENCES Restaurants(RestaurantID)
		ON DELETE CASCADE
);

### 2.8. Creates Buy Table 
CREATE TABLE Buy (
	<br />StoreID INT NOT NULL,
<br />IngredientID INT NOT NULL,
	<br />Store_Price REAL,
	<br />PRIMARY KEY (IngredientID, StoreID),
	<br />FOREIGN KEY (IngredientID)
		REFERENCES Ingredients(IngredientID)
		ON DELETE CASCADE,
	<br />FOREIGN KEY (StoreID)
		REFERENCES Store(StoreID)
		ON DELETE CASCADE
);	

## 3. ROW COUNT QUERIES
### 3.1. Row count of Restaurants
![Page 2](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Screenshot%202022-03-11%20at%2012.13.42%20PM.png)

### 3.2. Row count of Store
![Page 3](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Screenshot%202022-03-11%20at%2012.14.07%20PM.png)

### 3.3. Row count of Ingredients
![Page 4](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Screenshot%202022-03-11%20at%2012.14.29%20PM.png)

## 4. ADVANCED QUERIES AND OUTCOMES
## 4.1. Advanced Query 1:
(SELECT RecipeID, RecipeName, CookingTime FROM Recipes WHERE CookingTime< 150 AND Rating>35 AND RatingsCount>50)
UNION
(SELECT RecipeID, RecipeName, CookingTime FROM Recipes NATURAL JOIN
Serves JOIN Restaurants USING (RestaurantID) WHERE Rest_Price < 10) LIMIT 15 \G;

### Outcome: 
![Outcome](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%201.1.PNG)
![Outcome](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%201.2.PNG)
![Outcome](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%201.3.PNG)

## 4.2. Advanced Query 2:
SELECT RecipeName, RestaurantName, Rest_Price, STOREPRICE 
FROM Serves 
NATURAL JOIN Recipes 
JOIN Restaurants USING (RestaurantID) 
JOIN (SELECT RecipeID, SUM(Store_Price) as STOREPRICE FROM Recipe_map NATURAL JOIN Buy JOIN Store USING (StoreID) GROUP BY RecipeID) T1 
USING (RecipeID) 
WHERE ABS(Rest_Price-STOREPRICE ) <= 50
LIMIT 15 \G;

### Outcome: 
![Outcome](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%202.1.PNG)
![Outcome](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%202.2.PNG)
![Outcome](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%202.3.PNG)

## 5. INDEX DESIGNS

## 5.1. QUERY 1
### Analyzing before indexing
![Page 3](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%201.png)

### 5.1.1. Index Design 1: Cooking time as the index
#### Index used
![Adding index](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%201%20Adding%20cookingtime%20index.png)

#### Explain Analyze with index design 1
![Index design 1](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%201%20Explain%20Analyze%20with%20CT%20Index.png)

In this index design choice for our first advanced query, we decided to make a BTree index on the CookingTime attribute in our Recipes table. The original EXPLAIN ANALYZE gave us a run time of 0.01 seconds using just the primary key index on RecipeID. With the index on CookingTime we reduced the runtime to what is displayed as 0.00 seconds. This might be because the values of cooking time < 150 are filtered out which might reduce the search time. This is the index design we chose for this advanced query because the other ones result in 0.01 seconds which is no different from the primary key index.

### 5.1.2. Index Design 2: Cooking time and Recipe name indices
#### Index used
![Adding 2 indices](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Q1%20with%20both%20indices.png)

#### Explain Analyze with index design 2
![Index design 2](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Q1%20Explain%20analyze%20with%202%20indices.png)

This index design uses both Cooking time and RecipeName as the indices. It is a BTree index which, along with the primary key RecipeID, gives us a run time of 0.01 seconds. There is no difference in run time as compared to our initial query with only the primary key as the index. The overall run time is very small to begin with and adding multiple indices may have caused the computation to balance out and remain the same. We decided not to move forward with the design because there is no difference in time taken to perform this query.

### 5.1.3. Index Design 3
#### Index used
![Adding index](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Q1%20Recipename%20index.png)

#### Explain Analyze with index design 3
![Index design 3](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Q1%20explain%20analyze%20with%20recipe%20name%20index.png)

Here, we tried dropping the index on CookingTime and preserved the index on RecipeName to measure its performance. It is a BTree index, which along with the primary key index RecipeID gives us a run time of 0.01 secs, which is no different from our initial query having only the primary key as index. The same explanation as the previous one holds here, adding more indices has increased the computational time and balanced out the benefit of adding an index. Hence, we decided not to proceed with this index design. 

## 5.2. QUERY 2
### Analyzing before indexing
![Page 4](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%202%20before%20index%201.png)
![Page 5](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%202%20before%20index%202.png)

### 5.2.1. Index Design 1
#### Index used and Explain Analyze with index design 1
![Adding index](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%202%20index%201.png)

We chose to create a BTree index on the Rest_Price attribute from the Restaurants table because it is one of the attributes we select (display) in our advanced query. After EXPLAIN ANALYZE we can see that the runtime of the query decreased from .17 to .03 seconds. We didn’t choose to use this as our final index design because it is an index created on our Serves relationship. Although this relationship is important, we think there is greater value to the index being applied to our Restaurant entity.


### 5.2.2. Index Design 2
#### Index used and Explain Analyze with index design 2
![Adding index](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%202%20create%20index%202.png)
![Adding index](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%202%20index%202%20explain%20analyze.png)

We chose to create a BTree index on the restaurantName attribute from the Serves table because it is one of the attributes we select (display) in our advanced query. After EXPLAIN ANALYZE we can see that the runtime of the query decreased from .17 to .03 seconds. Despite all three indexing techniques used to improve the run time of our second advanced query resulting in a runtime of 0.03 seconds, we decided to use this index design. This is because it creates an index on one of our larger entity tables and will be referenced more often than the Serves table.

### 5.2.3. Index Design 3
#### Index used and Explain Analyze with index design 3
![Adding index](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%202%20index%203.1.png)
![Adding index](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%202%20index%203.2.png)
![Adding index](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team044-DontDoMasters/blob/main/doc/Stage%203/Query%202%20index%203.3.png)

In this index design we created an index on Rest_Price from the Serves table and restaurantName from the Restaurant table. We chose this since both of those attributes were being accessed and felt like indexing them directly would help improve our runtime. This improved our runtime from 0.17 seconds from our unindexed query to our 0.03. Unfortunately this didn’t have any significant runtime difference from each of those indexes individually. As a result, since having two indexes didn’t make much of a difference, we chose to go with the initial index on our entity.
