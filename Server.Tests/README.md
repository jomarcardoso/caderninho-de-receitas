# Server tests

```bash
dotnet test

# FoodService
dotnet test --filter FullyQualifiedName~Server.Tests.Services.FoodServiceTests
```

Generate mock of foods:

```bash
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (SELECT json_agg(row_to_json(f)) FROM (SELECT \"Id\", \"NamePt\", \"KeysPt\" FROM \"Foods\") f) TO STDOUT" > mocks/FoodsPt.json
```

## Tests

### RecipeController

file: `Server.Tests/Controllers/RecipeControllerTests.cs`

#### CreateRecipe

- **Create returns a RecipeResponse with persisted data.**
- params: none (Visibility.Private).
- return: RecipeResponse fields match persisted recipe.

- **Create a recipe with multiple steps and ingredients returns a RecipeResponse with persisted data.**
- params: RecipeDto (Visibility.Private, 2 steps, ingredients text).
- return: RecipeResponse has steps/ingredients and matches persisted recipe.

- **Create a recipe with multiple steps and ingredients returns a RecipeResponse with persisted data.**
- params: RecipeDto (Visibility.Private).
- return: RecipeResponse fields match persisted recipe.

- **Private creation keeps Draft and no Published revision.**
- params: none (Visibility.Private).
- return: status Draft, PublishedRevisionId null, Visibility Private.

- **Public creation sets PendingReview and no Published revision.**
- params: none (Visibility.Public).
- return: status PendingReview, PublishedRevisionId null, Visibility Public.

#### GetPendingRecipes

- **Pending endpoint returns only PendingReview items.**
- params: none.
- return: only PendingReview recipes.

#### ApproveRecipe

- **Approve promotes Latest to Published and marks Approved.**
- params: Recipe with PublishedRevisionId = null.
- return: status Approved, PublishedRevisionId = LatestRevisionId.

- **Approving when Published != Latest replaces Published and removes the old revision.**
- params: PublishedRevisionId != null.
- return: status Approved, PublishedRevisionId = LatestRevisionId, old revision removed.

#### UpdateRecipe

- **Private update keeps Published revision and resets status to Draft.**
- params: none (Visibility.Private).
- return: status Draft, PublishedRevisionId unchanged, Visibility Private.

- **Public update without Published revision becomes PendingReview and stays unpublished.**
- params: none (Visibility.Public).
- return: status PendingReview, PublishedRevisionId null, Visibility Public.

- **Public update with Published keeps Published and creates a new Latest.**
- params: none (Visibility.Public).
- return: status PendingReview, PublishedRevisionId preserved, LatestRevisionId new.

### FoodService

file: `Server.Tests/Services/FoodServiceTests.cs`

#### Description

#### hasExactFoodWithThisName

- **Resolves a food by exact name.**
- params: `[TestCase] name, expectedName`.
- return: matched food contains expectedName.

- **Returns null for blank input.**
- params: none.
- return: null.

#### hasExactKeyWithThisName

- **Resolves a food by exact key.**
- params: `[TestCase] name, expectedName`.
- return: matched food contains expectedName.

- **Returns null for blank input.**
- params: none.
- return: null.

#### filterPrefix

- **Removes known leading prefixes.**
- params: `[TestCase] text, expected`.
- return: filtered prefix string.

#### filterName

- **Removes modifiers from food names.**
- params: `[TestCase] name, expectedName`.
- return: filtered name string.

- **Applies PT/EN modifier rules based on language.**
- params: none.
- return: language-specific removals.

#### BestMatch

- **Finds the best match for a fuzzy name.**
- params: `[TestCase] name, expectedName`.
- return: best match contains expectedName.

#### FindFoodByPossibleName

- **Finds a food name from possible input variants.**
- params: `[TestCase] name, expectedName`.
- return: resolved food contains expectedName.

#### GetFoodsFromRecipes

- **Returns empty list when no recipes exist.**
- params: none.
- return: empty list.

### IngredientService

file: `Server.Tests/Services/IngredientServiceTests.cs`

#### ToEntity

- **Parses a 5-line recipe input with mixed measures.**
- params: none.
- return: 5 ingredients with expected measure types/quantities.

- **Parses a 3-line recipe input with bunch/gram/literal.**
- params: none.
- return: 3 ingredients with expected measure types/quantities.

- **Parses a 9-line recipe input with cups, clove, pinch.**
- params: none.
- return: 9 ingredients with expected measure types/quantities.

- **Uses food measures (can/cup/etc.) to compute quantity.**
- params: `[TestCase] input, expectedType, expectedMeasureQty, expectedQuantity`.
- return: parsed entity matches expected with food measures.

- **Covers common ingredient lines and expected conversions.**
- params: `[TestCase] input, expectedType, expectedMeasureQty, expectedQuantity`.
- return: parsed entity matches expected.

- **Parses fraction variants for parmesan lines.**
- params: `[TestCase] input, expectedQuantity`.
- return: quantity matches expected and food resolves to parmesan.

- **Parses 8-line recipe with grams/cups/literal.**
- params: none.
- return: 8 ingredients with expected measures and matching foods.

- **Resolves "azeite para untar" as olive oil.**
- params: none.
- return: food resolved to Azeite de oliva.

- **Parses "a gosto" as literal measure.**
- params: none.
- return: MeasureType.Literal.

#### SplitTextInMeasureAndRest

- **Splits measure text and rest using known patterns.**
- params: `[TestCase] input, expectedMeasureText, expectedMeasureType, expectedRest`.
- return: parsed tuple matches expected.

- **Keeps "azeite para untar a tigela" as literal.**
- params: none.
- return: literal measure, rest "azeite".

- **Respects language preference for EN/PT patterns.**
- params: none.
- return: EN/PT parsing changes measure type accordingly.

#### ParseMeasureQuantity

- **Parses numeric quantity from measure text.**
- params: `[TestCase] measureText, expected`.
- return: parsed numeric value.

#### FindFoodByPossibleName (coverage in IngredientServiceTests)

- **Finds olive oil with measures dataset.**
- params: none.
- return: food resolved to Azeite de oliva.

### GoogleAuthService

file: `Server.Tests/Services/GoogleAuthServiceTests.cs`

#### ValidateAsync

- **Returns null when token is empty.**
- params: none.
- return: null, validator not called.

- **Returns null when validator fails.**
- params: none.
- return: null.

- **Returns user info when validator succeeds.**
- params: none.
- return: payload mapped to user info.

- **Uses configured audiences for validation.**
- params: none.
- return: validator receives configured client id.

- **Returns null when validator throws.**
- params: none.
- return: null.

### PlainTextRecipeParser

file: `Server.Tests/Serialization/PlainTextRecipeParserTests.cs`

#### Parse

- **Normalizes fields from JSON payload.**
- params: none.
- return: dto with trimmed fields and parsed steps.

- **Extracts sections from structured plain text.**
- params: none.
- return: dto with name/keys/description/steps.

- **Throws when payload is empty.**
- params: none.
- return: PlainTextRecipeParserException.

- **Throws when name cannot be identified.**
- params: none.
- return: PlainTextRecipeParserException.

### PlainTextRecipePreProcessor

file: `Server.Tests/PreProcessing/PlainTextRecipePreProcessorTests.cs`

#### Normalize

- **Keeps already structured text unchanged.**
- params: none.
- return: same structured text.

- **Converts generic text into structured format.**
- params: none.
- return: normalized structure with sections.

- **Extracts keys from tag line.**
- params: none.
- return: Keys set from tags.

- **Throws when name is missing.**
- params: none.
- return: PlainTextRecipePreProcessorException.

### UnitTest1

file: `Server.Tests/UnitTest1.cs`

#### Test1

- **Placeholder test.**
- params: none.
- return: passes.
