# Classes

<!-- THIS FILE IS SOURCE OF TRUTH. DO NOT EDIT TO BE LIKE THE CODE! -->

## Index

- [Shared](#shared)
  - [INutrientsBase](#inutrientsbase)
  - [IngredientBase<TFood>](#ingredientbasetfood)
  - [INutrients](#inutrients)
- [Models](#models)
  - [Food](#food)
  - [Recipe](#recipe)
  - [RecipeRevision](#reciperevision)
  - [RecipeRevisionStep (owned)](#reciperevisionstep-owned)
  - [RecipeRevisionIngredient (owned)](#reciperevisioningredient-owned)
  - [Icon](#icon)
- [Response](#response)
  - [FoodResponse](#foodresponse)

## Shared

### INutrientsBase

- Namespace: [`Server.Shared`](#shared)
- Interface defining nutrient aggregates
- Properties:
  - `NutritionalInformationBase` NutritionalInformation
  - `MineralsBase` Minerals
  - `VitaminsBase` Vitamins
  - `AminoAcidsBase` AminoAcids
  - `EssentialAminoAcidsBase` EssentialAminoAcids

### IngredientBase<TFood>

- Namespace: [`Server.Shared`](#shared)
- Abstract; Implements: [INutrientsBase](#inutrientsbase)
- Properties:
  - `string` Text
  - `TFood` Food
  - `double` Quantity (literal, liters/grams)
  - `MeasureType` MeasureType (unit descriptor: cups, spoons, etc.)
  - `double` MeasureQuantity
  - `NutritionalInformationBase` NutritionalInformation
  - `MineralsBase` Minerals
  - `VitaminsBase` Vitamins
  - `AminoAcidsBase` AminoAcids
  - `EssentialAminoAcidsBase` EssentialAminoAcids
- Constructors:
  - Protected default
  - Protected `(string text, TFood food, double quantity, MeasureType measureType, double measureQuantity, NutritionalInformationBase nutritionalInformation, MineralsBase minerals, VitaminsBase vitamins, AminoAcidsBase aminoAcids, EssentialAminoAcidsBase essentialAminoAcids)`

### INutrients

- Namespace: [`Server.Shared`](#shared)
- Inherits: [INutrientsBase](#inutrientsbase)
- Properties:
  - `NutritionalInformation` NutritionalInformation
  - `Minerals` Minerals
  - `Vitamins` Vitamins
  - `AminoAcids` AminoAcids
  - `EssentialAminoAcids` EssentialAminoAcids

## Models

### Food

- Namespace: [`Server.Models`](#models)
- Implements: [`INutrients`](#inutrients)
- Constructor: implicit default
- Properties:
  - `int` Id
  - `LanguageText` Name
  - `LanguageText` Keys
  - `LanguageText` Description
  - `List<string>` Imgs
  - `MeasurementUnit` MeasurementUnit
  - `Measure` Measures
  - `List<string>` Categories
  - `int?` IconId
  - [`Icon?`](#icon) Icon
  - `FoodType` Type
  - `NutritionalInformation` NutritionalInformation
  - `Minerals` Minerals
  - `Vitamins` Vitamins
  - `AminoAcids` AminoAcids
  - `EssentialAminoAcids` EssentialAminoAcids
  - `double` AminoAcidsScore
- Constructors:
  - Implicit default
- Methods:
  - `void Process()` — rebuilds `EssentialAminoAcids` from `AminoAcids` and updates `AminoAcidsScore` via `GetScore()`.

### Recipe

- Namespace: [`Server.Models`](#models)
- Properties (core/identity):
  - `int` Id
  - `string` Slug
  - `string` OwnerId; `UserProfile?` Owner
  - `int` SavedByOthersCount
  - `bool` IsPublic (legacy flag)
  - `DateTime` CreatedAtUtc, `DateTime` UpdatedAtUtc
  - `RecipeVisibility` Visibility
  - `RecipeTombstoneStatus` TombstoneStatus
  - `Guid?` PublishedRevisionId; `RecipeRevision?` PublishedRevision
  - `Guid?` LatestRevisionId; `RecipeRevision?` LatestRevision
  - `int?` MergedIntoRecipeId; `Recipe?` MergedIntoRecipe
  - `List<RecipeRevision>` Revisions
  - `int?` CopiedFromRecipeId
- Legacy/indexable proxies (read-only derived from active revision):
  - `string` Name, `string` Keys, `Language` Language
  - `string?` Description, `string?` Additional
  - `List<string>` Imgs, `List<string>` Categories
  - `List<RecipeStep>` Steps (converted from active revision steps)
  - `Food?` Food (first ingredient of first step, if any)
  - Aggregates on-demand: `NutritionalInformationBase` NutritionalInformation, `MineralsBase` Minerals, `VitaminsBase` Vitamins, `AminoAcidsBase` AminoAcids, `EssentialAminoAcidsBase` EssentialAminoAcids
  - `double` AminoAcidsScore (returns 0)
  - Compatibility flags: `bool` Verified, `DateTime` UpdatedAt, `DateTime` CreatedAt
- Constructors:
  - Implicit default
  - Legacy compatibility ctor `(int? id, string name, string keys, Food? food, string? description, string? additional, List<RecipeStep> steps, string? ownerId = null)`
- Methods:
  - `RecomputeAggregatesFromRevisions()` — placeholder for future aggregate logic.
  - Static helper `ConvertLegacySteps(IEnumerable<RecipeStep>)` used by the legacy ctor.

### RecipeRevision

- Namespace: [`Server.Models`](#models)
- Properties:
  - `Guid` Id
  - `int` RecipeId; `Recipe` Recipe
  - `RevisionStatus` Status
  - `Guid?` BaseRevisionId; `RecipeRevision?` BaseRevision
  - Indexable fields: `string` Name, `string` Keys, `Language` Language
  - Structured snapshot: `List<RecipeRevisionStep>` Steps
  - Versioned content: `string` ContentJson
  - Audit: `string` CreatedByUserId, `DateTime` CreatedAtUtc, `DateTime` UpdatedAtUtc
  - Change tracking: `string?` ChangeSummary
  - Review/moderation: `string?` ReviewedByUserId, `DateTime?` ReviewedAtUtc, `string?` ModerationNotes
- Constructors:
  - Implicit default
  - Overload `(string name, string keys, Language language, List<RecipeRevisionStep> steps, string createdByUserId)`
- Methods:
  - `RecomputeAggregates()` — placeholder for future aggregate nutrient logic.

### RecipeRevisionStep (owned)

- Inherits: `RecipeStepBase<RecipeRevisionIngredient>`
- Constructors: default; `(string title, string preparation, string additional, string ingredientsText, List<RecipeRevisionIngredient> ingredients)`
- Properties (from base): `Title`, `Preparation`, `Additional`, `IngredientsText`, `Ingredients` plus nutrient fields (`NutritionalInformation`, `Minerals`, `Vitamins`, `AminoAcids`, `EssentialAminoAcids`) initialized in ctor.
- Methods:
  - `RecomputeAggregates()` — initializes nutrient aggregates and sums from `Ingredients`.

### RecipeRevisionIngredient (owned)

- Inherits: `IngredientBase<Food>`
- Constructors: default; `(string text, Food food, double quantity, MeasureType measureType, double measureQuantity)`
- Sets nutrient bases from the provided Food scaled by quantity: `NutritionalInformation`, `Minerals`, `Vitamins`, `AminoAcids`, `EssentialAminoAcids`.

### Icon

- Namespace: [`Server.Models`](#models)
- Implements: `ISearchable`
- Properties:
  - `int` Id
  - `LanguageText` Name (localized display)
  - `string` Url (public URL to the icon)
  - `LanguageText` Keys (search terms)
- ISearchable (explicit): `LanguageTextBase` Name/Keys mapped to `LanguageText`.

## Services

## Data Transfer Objects (DTOs)

Input objects (request payloads). Not documented yet.

### FoodDto

- Properties:
  - `int` Id
  - `LanguageText` Name
  - `LanguageText` Keys
  - `LanguageText` Description
  - `List<string>` Imgs
  - `MeasurementUnit` MeasurementUnit
  - `Measure` Measures
  - `List<string>` Categories
  - `int?` IconId
  - `FoodType` Type
  - `NutritionalInformation` NutritionalInformation
  - `Minerals` Minerals
  - `Vitamins` Vitamins
  - `AminoAcids` AminoAcids
  - `EssentialAminoAcids` EssentialAminoAcids
  - `double` AminoAcidsScore
- Constructors:
  - Implicit default

## Response

Output objects.

### FoodSummaryResponse

- Namespace: [`Server.Response`](#response)
- Properties:
  - `int` id
  - `LanguageText` name
  - `string` icon (public URL to the icon)
  - `string[]` imgs

### FoodResponse

- Namespace: [`Server.Response`](#response)
- Inherits: `Food` (same shape as the entity)
