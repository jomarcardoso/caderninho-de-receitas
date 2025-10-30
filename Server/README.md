# Server

## Install and run

```
dotnet restore
dotnet build
dotnet run
```

## Swagger

- https://localhost:7269/swagger
- http://localhost:5106/swagger

## Entity framework

### Install

dotnet tool install --global dotnet-ef

### Run migrations

dotnet ef migrations add AdicionaDescricao
dotnet ef database update

## Machine Learning

Glossary:

- **NLP (Natural Language Processing):** Field of AI focused on understanding and processing human language (text, speech).
- **NER (Named Entity Recognition):** NLP technique to detect named entities in text, such as people, locations, dates — or in our case, QUANTITY and FOOD. Example: _"2 cups of rice" → QUANTITY = "2 cups", FOOD = "rice"._
- **Annotated Dataset:** A dataset of sentences or texts manually labeled with the entities you want the model to learn to recognize. Example: _marking "rice" as FOOD in several sentences._
- **Fine-tuning:** The process of taking a pre-trained model (like BERT, GPT, spaCy) and adapting it to a specific task (e.g., extracting foods and quantities).
- **spaCy:** A Python NLP library, widely used for NER, tokenization, and text analysis.
- **HuggingFace Transformers:** A library that provides ready-to-use language models (like BERT, GPT, LLaMA) and tools for fine-tuning.
- **Regex (Regular Expression):** A way to define text patterns using rules. Very useful for capturing predictable structures like "3 spoons", "200 g", "1/2 cup".
- **Pipeline:** A sequence of steps that process data in order. Example in our case: _1 - Detect spans with NER. 2 - Normalize food with embeddings/dictionary. 3 - Return structured data._
- **Embeddings:** Mathematical representation of words or sentences as vectors of numbers. They allow semantic comparison → similar words have vectors that are close. Example: _"brown rice" ≈ "whole grain rice"._
- **Cosine Similarity:** A metric for comparing how close two vectors (like embeddings) are. Used to find the most similar word/phrase.
- **Lookup / Synonym Dictionary:** A table that maps a word to its "official" or normalized version. Example: _"aubergine" → "eggplant", "caster sugar" → "refined sugar"._
- **Classification:** A type of ML model that chooses the correct category among several options. Example: _"brown rice" → class "WHOLE GRAIN RICE"._
- **Data Distillation:** A technique where you use a large model (e.g., GPT) to automatically label raw data, and then humans review these annotations to create a clean dataset.

## Architecture

### Partial Normalization

In our API design, we use partial normalization to balance efficiency and usability. Instead of returning fully denormalized data (where each recipe includes full ingredient objects, leading to duplication), or fully normalized data (where the client must perform multiple requests to resolve references), we return a hybrid structure:

- Recipes include ingredient IDs.
- A separate collection contains the unique food objects used across all recipes.

This approach avoids data duplication, keeps the payload compact, and ensures consistency. At the same time, the client can easily resolve ingredient references locally without making additional API calls.

### Backend-driven type values

In this project, the backend exposes a list of objects (`MeasureDto`) representing all possible values of the `MeasureType` enum, including translations and indexes.
The frontend consumes this list and interprets the values without redeclaring the type, ensuring consistency with the backend while avoiding duplication.

## Nutritional information

- FAO/WHO/UNU
- PDCAAS e DIAAS

## API

Order to load the app:

1. RecipesDataResponse - my recipes and data
2. HomeDataResponse

On demand returns:

1. RecipeResponse

RecipesDataResponse

- recipes - my recipes
- foods - related to recipes
- foodIcons - related to foods
- nutrients

RecipeResponse

- recipe
- foods - related to recipe
- foodIcons - related to foods
- relatedRecipes

HomeDataResponse

- partnerRecipes
- mostCopiedRecipes
- newGoodRecipes

## Classes Diagram

### Recipe controller

-
