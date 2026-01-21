# Classes

<!-- THIS FILE IS SOURCE OF TRUTH. DO NOT EDIT TO BE LIKE THE CODE! -->

CLASSES.md is the source of truth for model shapes; keep entities aligned.

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

### ThemeColor

Enum:

1. Primary
2. Green
3. Red
4. Purple

### AllergyRestriction

Enum:

1. Peanut
2. TreeNuts
3. Milk
4. Egg
5. Wheat
6. Soy
7. Fish
8. Shellfish
9. Sesame
10. Corn
11. Mustard
12. Celery
13. Sulfite
14. Cocoa
15. Gelatin

### IntoleranceRestriction

Enum:

1. Lactose
2. GlutenSensitive
3. Fructose
4. Histamine
5. FriedFatty
6. SimpleSugars
7. Caffeine

### MedicalRestriction

Enum:

1. Diabetes
2. Prediabetes
3. HighCholesterol
4. HighTriglycerides
5. Hypertension
6. KidneyDisease
7. Celiac
8. Ibs
9. Gerd
10. Gastritis
11. Crohn
12. UlcerativeColitis

### DietStyleRestriction

Enum:

1. Vegetarian
2. Vegan
3. OvoLacto
4. Pescetarian
5. LowCarb
6. Keto
7. Paleo
8. Mediterranean
9. Whole30
10. LowFodmap
11. HighProtein
12. PlantBased

### CulturalRestriction

Enum:

1. Kosher
2. Halal
3. Hindu
4. Buddhist
5. Adventist

### PersonalPreferenceRestriction

Enum:

1. NoSpicy
2. NoVerySweet
3. NoFried
4. NoAlcohol
5. NoRedMeat
6. NoWhiteMeat

### TombstoneStatus

1. Active
2. RemovedByAuthor
3. Merged
4. PolicyRemoved

### Visibility

1. Private
2. Unlisted
3. Public

### Role

1. Keeper
2. Admin
3. Moderator
4. Owner

### RevisionStatus

1. Draft
2. PendingReview
3. Approved
4. Rejected

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

### UserProfileRevision

- `Guid` Id
- `string` DisplayName
- `string` GivenName
- `string` FamilyName
- `string` PictureUrl
- `string` Description (max 280)
- `string` UserProfileId
- [`UserProfile`](#userprofile) UserProfile
- [`RevisionStatus`](#revisionstatus) Status
- `DateTime` CreatedAtUtc
- `DateTime` UpdatedAtUtc
- `string?` ReviewedByUserId
- `DateTime?` ReviewedAtUtc
- `string?` ModerationNotes

### UserProfile

Namespace: [`Server.Models`](#models)

- `string` Id
- [`ThemeColor`](#themecolor) ThemeColor
- `string` Locale
- `Language` Language
- `bool` IsFeatured (There is a daily routine to review this value.)
- `DateTime` FeaturedAt
- `DateTime` FeaturedUntil
- [`AllergyRestriction[]`](#allergyrestriction) Allergies
- [`IntoleranceRestriction[]`](#intolerancerestriction) Intolerances
- [`MedicalRestriction[]`](#medicalrestriction) MedicalRestrictions
- [`DietStyleRestriction[]`](#dietstylerestriction) DietStyles
- [`CulturalRestriction[]`](#culturalrestriction) CulturalRestrictions
- [`PersonalPreferenceRestriction[]`](#personalpreferencerestriction)
- `DateTime` CreatedAtUtc
- `DateTime` UpdatedAtUtc
- `DateTime` LastLoginAtUtc
- `Guid?` PublishedRevisionId
- `UserProfileRevision?` PublishedRevision
- `Guid?` LatestRevisionId
- `UserProfileRevision?` LatestRevision
- [`TombstoneStatus`](#tombstonestatus) TombstoneStatus
- [`Visibility`](#visibility) Visibility
- ShareToken: `string`
- ShareTokenCreatedAt: `DateTime`
- ShareTokenRevokedAt: `DateTime`
- `string[]` emails
- `string` googleId
- `bool` googleEmailVerified
- [`Role[]`](#role) roles

### RecipeRevision

Namespace: [`Server.Models`](#models)

Properties:

- `Guid` Id
- `int` RecipeId; `Recipe` Recipe
- [`RevisionStatus`](#revisionstatus) Status
- Indexable fields: `string` Name, `string` Keys, `Language` Language
- Structured snapshot: `List<RecipeRevisionStep>` Steps
- Audit: `string` CreatedByUserId, `DateTime` CreatedAtUtc, `DateTime` UpdatedAtUtc
- Review/moderation: `string?` ReviewedByUserId, `DateTime?` ReviewedAtUtc, `string?` ModerationNotes

Constructors:

- Implicit default
- Overload `(string name, string keys, Language language, List<RecipeRevisionStep> steps, string createdByUserId)`

Methods:

- `RecomputeAggregates()` — placeholder for future aggregate nutrient logic.

### Recipe

Namespace: [`Server.Models`](#models)

Properties (core/identity):

- `int` Id
- `string` Slug
- `string` OwnerId (same userId from Google and other authentication services)
- `UserProfile` Owner
- `int` SavedByOthersCount
- `bool` IsPublic (legacy flag)
- `DateTime` CreatedAtUtc, `DateTime` UpdatedAtUtc
- [`Visibility`](#visibility) Visibility
- [`TombstoneStatus`](#tombstonestatus) TombstoneStatus
- `Guid?` PublishedRevisionId; `RecipeRevision?` PublishedRevision
- `Guid?` LatestRevisionId; `RecipeRevision?` LatestRevision
- `int?` MergedIntoRecipeId; `Recipe?` MergedIntoRecipe
- `List<RecipeRevision>` Revisions
- `int?` CopiedFromRecipeId

Legacy/indexable proxies (read-only derived from active revision):

- `string` Name, `string` Keys, `Language` Language
- `string?` Description, `string?` Additional
- `List<string>` Imgs, `List<string>` Categories
- `List<RecipeStep>` Steps (converted from active revision steps)
- `Food?` Food (first ingredient of first step, if any)
- Aggregates on-demand: `NutritionalInformationBase` NutritionalInformation, `MineralsBase` Minerals, `VitaminsBase` Vitamins, `AminoAcidsBase` AminoAcids, `EssentialAminoAcidsBase` EssentialAminoAcids
- `double` AminoAcidsScore (returns 0)
- Compatibility flags: `bool` Verified, `DateTime` UpdatedAt, `DateTime` CreatedAt

Constructors:

- Implicit default
- Legacy compatibility ctor `(int? id, string name, string keys, Food? food, string? description, string? additional, List<RecipeStep> steps, string? ownerId = null)`

Methods:

- `RecomputeAggregatesFromRevisions()` — placeholder for future aggregate logic.
- Static helper `ConvertLegacySteps(IEnumerable<RecipeStep>)` used by the legacy ctor.

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

### RecipeItem

- Properties:
  - `int` Id
  - `int` RecipeId { get; set; }
  - `Recipe` Recipe { get; set; }
  - `int` Position { get; set; } = 0;

### RecipeList

- Properties:
  - `int` Id
  - `string` Name
  - `string?` Description
  - `Visibility` Visibility
  - `string` OwnerId
  - `DateTime` CreatedAt
  - `DateTime` UpdatedAt
  - List<RecipeItem> Items

### Icon

- Namespace: [`Server.Models`](#models)
- Implements: `ISearchable`
- Properties:
  - `int` Id
  - `LanguageText` Name (localized display)
  - `string` Url (public URL to the icon)
  - `LanguageText` Keys (search terms)
- ISearchable (explicit): `LanguageTextBase` Name/Keys mapped to `LanguageText`.

## Factories

### UserProfileFactory

#### FromGooglePayload (static)

Arguments:

- `GoogleJsonWebSignature.Payload` payload,
- `DateTime?` nowOverride = null

Return: `UserProfile`

## Services
