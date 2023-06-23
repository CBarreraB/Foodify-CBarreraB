CREATE DATABASE food;


CREATE TABLE Recipe (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  healthScore VARCHAR(255) NOT NULL,
  instructions TEXT NOT NULL
);


CREATE TABLE Diets (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL CHECK (name ~ '^[a-zA-Z\s]+$')
);

-- many-to-many relationship:

CREATE TABLE RecipeDiet (
  id SERIAL PRIMARY KEY NOT NULL,
  recipeId SERIAL NOT NULL,
  dietId SERIAL NOT NULL,
  FOREIGN KEY (recipeId) REFERENCES recipe(id),
  FOREIGN KEY (dietId) REFERENCES diet(id)
);