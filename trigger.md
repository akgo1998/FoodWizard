DROP TRIGGER IF EXISTS RatingAvg;
DELIMITER //
CREATE TRIGGER RatingAvg BEFORE UPDATE ON Recipes FOR EACH ROW
	BEGIN
		SET @oldRating = (SELECT Rating FROM Recipes WHERE RecipeID = NEW.RecipeID);
		SET @ratingCount = (SELECT RatingsCount FROM Recipes WHERE RecipeID = NEW.RecipeID);
		SET @userRating = NEW.Rating;

		IF (@userRating < 0)
THEN	SET @userRating = 0;
		ELSEIF (@userRating > 100)
		THEN  SET @userRating = 100;
		END IF;

		SET new.Rating=ROUND((@userRating + @oldRating*@ratingCount)/(@ratingCount + 1),2);

		
		SET new.RatingsCount = @ratingCount+1;

	END //
DELIMITER ;
