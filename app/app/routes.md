# Routes:
### 1. localhost:3002/status
This is a test route which displays a message, primarily used for testing.

<!-- ### 2. localhost:3002/home
This is used to display the result of a test query. This is used to demonstrate the connection made with GCP.
 -->
## CRUD Operations:
### 2. localhost:3002/api/insert
The /insert route is used to perform the create operation on the **User_Data** table. Here, _userId_, _userPassword_, _userName_, _userFavRec_ and _userFavCuis_ are taken as input from the user (shown in localhost: 3000/..) and inserted into the database. 

### 3. localhost:3002/api/searchUser
The /searchUser route is used to perform the read operation on the **User_Data** table. The input is _userId_ (taken from localhost:3000/..) and the output displays the associated _UserID_, _Password_, _Name_, _Favorite recipe ID_ and _Favorite cuisine_.

### 4. localhost:3002/api/updateRating
The /updateRating route is used to perform the update operation on the **Recipes** table. The _Recipe ID_ and _Rating_ are taken as input from the user (from localhost:3000/..) and changing the _Rating_ value for the specified _Recipe ID_.

### 5. localhost:3002/api/delete
The /delete route is used to perform the delete operation on the **User_Data** table. The _userId_ is taken as input and the record is deleted from the table.

### 6. localhost:3002/api/searchRecipebyKeyword
The /searchRecipebyKeyword route is used to perform the read operation on the **Recipe** table. The input is _recipe name keyword_ (taken from localhost:3000/..) and the output displays the associated output.

## Advanced Query routes:
### 7. localhost:3002/api/adv1
The /adv1 route is used to run the first advanced query to find the recipes with constraints on _cooking time_, _Rating_ and _Ratings count_ and log the results.

### 8. localhost:3002/api/adv2
The /adv2 route is used to run the second advanced query to find the price difference between cooking at home and going to a restaurant and log the results.
