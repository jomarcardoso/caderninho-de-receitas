# Server

## Install and run

```
dotnet restore
dotnet build
dotnet run
```

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
