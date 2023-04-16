DELIMITER //
CREATE PROCEDURE Result(IN _keyword VARCHAR(30))
BEGIN
	DECLARE varRestaurantID INT;
    	DECLARE varRestaurantName VARCHAR(100);
	DECLARE varGlobalAvg REAL;
	DECLARE varAvgRestPrice REAL;
	DECLARE varDollarSign VARCHAR(10);

	DECLARE loop_exit BOOLEAN DEFAULT FALSE;
    
    	DECLARE curs CURSOR FOR (SELECT RestaurantID, AVG(Rest_Price), 
RestaurantName FROM 
Restaurants NATURAL JOIN Serves
GROUP BY RestaurantID);

DECLARE CONTINUE HANDLER FOR NOT FOUND SET loop_exit = TRUE;

    	DROP TABLE IF EXISTS NewTable; 

    	CREATE TABLE NewTable (
		RestaurantID INT PRIMARY KEY,
		DollarSign VARCHAR(10),
		avgRestPrice REAL,
		RestaurantName VARCHAR(100)
	);
	
	SELECT AVG(Rest_Price) INTO varGlobalAvg FROM Serves;

	OPEN curs;

	REPEAT
		FETCH curs INTO varRestaurantID, varAvgRestPrice, varRestaurantName;
	
		IF (varAvgRestPrice>=1.131*varGlobalAvg) THEN
           			 SET varDollarSign = '$$$';
		ELSEIF ((varAvgRestPrice<1.131*varGlobalAvg) AND (varAvgRestPrice >= 0.869* varGlobalAvg)) THEN
           			 SET varDollarSign = '$$';
		ELSE 
			SET varDollarSign = '$';
		END IF;
	
		INSERT IGNORE INTO NewTable(RestaurantID, DollarSign, avgRestPrice, RestaurantName) VALUES(varRestaurantID, varDollarSign, varAvgRestPrice, varRestaurantName); 
	
	UNTIL loop_exit
	END REPEAT;
	
	CLOSE curs;

	SELECT N.RestaurantID, N.DollarSign, N.avgRestPrice, N.RestaurantName, R.RecipeID, 
R.RecipeName, T1.AvgRecipePrice, S.Rest_Price
	FROM NewTable N NATURAL JOIN Serves S JOIN Recipes R USING (RecipeID) 
JOIN (SELECT AVG(Rest_Price) as AvgRecipePrice, RecipeID FROM Serves GROUP BY RecipeID) T1 USING (RecipeID)
	WHERE RecipeName LIKE CONCAT('%',_keyword,'%');
	
END //
