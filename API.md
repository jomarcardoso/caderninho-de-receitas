# API endpoints, DTOs & Responses

<!-- THIS FILE IS SOURCE OF TRUTH. DO NOT EDIT TO BE LIKE THE CODE! -->

## Common Types

### MeasurementUnit

`gram` | `liter`

### FoodType

`liquid` | `seed` | `herb` | `temper` | `fruit` | `solid` | `oil` | `legumen` | `flake` | `root` | `meat` | `vegetable` | `cake` | `cheese` | `powder` | `starch` | `recipe`

### Language

`pt` | `en`

### MeasureType

`cup` | `smallCup` | `spoon` | `teaSpoon` | `unity` | `unitySmall` | `unityLarge` | `literal` | `can` | `glass` | `breast` | `clove` | `slice` | `bunch` | `ml` | `liter` | `gram` | `kilo` | `pinch`

### NutritionalInformationType

`acidification` | `ashes` | `calories` | `carbohydrates` | `cholesterol` | `dietaryFiber` | `gi` | `gl` | `monounsaturatedFats` | `polyunsaturatedFats` | `proteins` | `saturedFats` | `sugar` | `totalFat`

### MineralType

`calcium` | `copper` | `fluoride` | `iron` | `magnesium` | `manganese` | `phosphorus` | `potassium` | `selenium` | `sodium` | `zinc`

### VitaminType

`a` | `alphaCarotene` | `b1` | `b11` | `b12` | `b2` | `b3` | `b5` | `b6` | `b7` | `b9` | `betaCarotene` | `c` | `choline` | `cryptoxanthinCarotene` | `d` | `d2` | `d3` | `e` | `k` | `lycopene`

### AminoAcidType

`alanine` | `arginine` | `asparticAcid` | `cystine` | `glutamicAcid` | `glutamine` | `glycine` | `histidine` | `isoleucine` | `leucine` | `lysine` | `methionine` | `phenylalanine` | `proline` | `serine` | `threonine` | `tryptophan` | `tyrosine` | `valine`

### EssentialAminoAcidType

`tryptophan` | `phenylalanine` | `leucine` | `valine` | `isoleucine` | `lysine` | `threonine` | `methionine` | `histidine`

### FoodCategory

Use `categories` as an array of these slugs (may be empty).

- `originAnimal`, `redMeat`, `whiteMeat`, `fish`, `shellfish`, `eggs`, `dairy`, `honey`,
- `originPlant`, `seeds`, `oilseeds`, `grains`, `legumes`, `fruits`, `vegetables`, `roots`, `tubers`, `leafy`, `stalk`, `flowers`, `herbs`, `spices`, `fungi`,
- `originProcessed`, `foodAdditives`, `refinedSugars`, `processedFats`, `fermentedOrigin`, `ultraProcessed`,
- `plantRoot`, `plantTuber`, `plantRhizome`, `plantBulb`, `plantStem`, `plantLeaf`, `plantFlower`, `plantSeed`,
- `fleshyFruit`, `dryFruit`, `podLegume`, `citrus`, `solanaceae`, `cucurbitaceae`, `brassicas`, `legumeFamily`, `nutFamily`, `cereals`, `botanicalFungi`,
- `highLactose`, `lactoseFree`, `highGluten`, `glutenFreeNatural`, `highFiber`, `highGi`, `lowGi`, `highProtein`, `highFat`, `highSodium`, `containsCaffeine`, `fermentedChem`, `highHistamine`,
- `raw`, `minimallyProcessed`, `smoked`, `cured`, `fried`, `baked`, `grilled`, `boiled`, `dehydrated`, `frozen`, `preserved`,
- `baseIngredient`, `condiment`, `seasoning`, `sauce`, `beverage`, `sideDish`, `garnish`, `dessert`, `mainProtein`

### AllergyRestriction

`peanut` | `treeNuts` | `milk` | `egg` | `wheat` | `soy` | `fish` | `shellfish` | `sesame` | `corn` | `mustard` | `celery` | `sulfite` | `cocoa` | `gelatin`

### IntoleranceRestriction

`lactose` | `glutenSensitive` | `fructose` | `histamine` | `friedFatty` | `simpleSugars` | `caffeine`

### MedicalRestriction

`diabetes` | `prediabetes` | `highCholesterol` | `highTriglycerides` | `hypertension` | `kidneyDisease` | `celiac` | `ibs` | `gerd` | `gastritis` | `crohn` | `ulcerativeColitis`

### DietStyleRestriction

`vegetarian` | `vegan` | `ovoLacto` | `pescetarian` | `lowCarb` | `keto` | `paleo` | `mediterranean` | `whole30` | `lowFodmap` | `highProtein` | `plantBased`

### CulturalRestriction

`kosher` | `halal` | `hindu` | `buddhist` | `adventist`

### PersonalPreferenceRestriction

`noSpicy` | `noVerySweet` | `noFried` | `noAlcohol` | `noRedMeat` | `noWhiteMeat`

### Role

`keeper` | `moderator` | `admin` | `owner`

### ThemeColor

`primary` | `green` | `red` | `purple`

### TombstoneStatus

`active` | `removedByAuthor` | `policyRemoved`

## Common Interfaces

### LanguageText

Object map:

- Key: [`Language`](#language)
- Value: `string`

### Measures

Object map:

- Key: [`MeasureType`](#measuretype)
- Value: `number`

### NutritionalInformation

Object map:

- Key: [`NutritionalInformationType`](#nutritionalinformationtype)
- Value: `number`

### Minerals

Object map:

- Key: [`MineralType`](#mineraltype)
- Value: `number`

### Vitamins

Object map:

- Key: [`VitaminType`](#vitamintype)
- Value: `number`

### AminoAcids

Object map:

- Key: [`AminoAcidType`](#aminoacidtype)
- Value: `number`

### EssentialAminoAcids

Object map:

- Key: [`EssentialAminoAcidType`](#essentialaminoacidtype)
- Value: `number`

### IconDto

- name: [`LanguageText`](#languagetext)
- url: `string`
- keys: [`LanguageText`](#languagetext)

### Icon

- [`...IconDto`](#icondto)
- id: `number`

## Food Interfaces

### FoodDto (request/response payload)

Technical contract for create/update food endpoints and detailed responses.

- id: `number`
- name: [`LanguageText`](#languagetext)
- iconId: `number`
- imgs: `string[]`
- keys: [`LanguageText`](#languagetext)
- description: [`LanguageText`](#languagetext)
- measurementUnit: [`MeasurementUnit`](#measurementunit)
- type: [`FoodType`](#foodtype)
- [`FoodCategory[]`](#foodcategory) `| string` categories (slugs)
- measures: [`Measures`](#measures)
- nutritionalInformation: [`NutritionalInformation`](#nutritionalinformation)
- minerals: [`Minerals`](#minerals)
- vitamins: [`Vitamins`](#vitamins)
- aminoAcids: [`AminoAcids`](#aminoacids)

<details>
  <summary>Example:</summary>

```json
{
  "id": 0,
  "name": { "pt": "Banana", "en": "Banana" },
  "iconId": 12,
  "imgs": ["https://example.com/imgs/banana.webp"],
  "description": { "pt": "Fruta", "en": "Fruit" },
  "keys": { "pt": "banana, fruta", "en": "banana, fruit" },
  "measurementUnit": "gram",
  "measures": { "unity": 120, "smallCup": 150 },
  "type": "fruit",
  "categories": ["desserts", "healthyEating"],
  "nutritionalInformation": { "calories": 89, "carbohydrates": 23, "...": 0 },
  "minerals": { "potassium": 358, "magnesium": 27, "...": 0 },
  "vitamins": { "a": 3, "c": 8.7, "...": 0 },
  "aminoAcids": { "alanine": 0.049, "arginine": 0.033, "...": 0 }
}
```

</details>

### FoodSummaryResponse

- id: `number`
- name: `string`
- icon: `string` (url)
- imgs: `string[]`

### FoodResponse

- id: `number`
- name: [`LanguageText`](#languagetext)
- keys: [`LanguageText`](#languagetext)
- description: [`LanguageText`](#languagetext)
- imgs: `string[]`
- measurementUnit: [`MeasurementUnit`](#measurementunit)
- measures: [`Measures`](#measures)
- icon: [`Icon`](#icon)
- type: [`FoodType`](#foodtype)
- [`FoodCategory[]`](#foodcategory) categories
- nutritionalInformation: [`NutritionalInformation`](#nutritionalinformation)
- minerals: [`Minerals`](#minerals)
- vitamins: [`Vitamins`](#vitamins)
- aminoAcids: [`AminoAcids`](#aminoacids)
- essentialAminoAcids: [`EssentialAminoAcids`](#essentialaminoacids) (amino acids multiplied for daily value)
- aminoAcidsScore: `number`

## UserProfile Interfaces

### UserProfileDto

- themeColor: [`ThemeColor`](#themecolor)
- locale: `string`
- language: [`Language`](#language)
- isPublic: `boolean`
- displayName: `string`
- pictureUrl: `string`
- description: `string` (max 280)
- givenName: `string` only admins and owners can see this value not empty
- familyName: `string` only admins and owners can see this value not empty
- allergies: [`AllergyRestriction[]`](#allergyrestriction)
- intolerances: [`IntoleranceRestriction[]`](#intolerancerestriction)
- medicalRestrictions: [`MedicalRestriction[]`](#medicalrestriction)
- dietStyles: [`DietStyleRestriction[]`](#dietstylerestriction)
- culturalRestrictions: [`CulturalRestriction[]`](#culturalrestriction)
- personalPreferences: [`PersonalPreferenceRestriction[]`](#personalpreferencerestriction)

### UserProfileAdminDto

**Extends:** [UserProfileOwner](#userprofileowner)

- featuredUntil: `string` (date: ISO 8601)

### UserProfile

- id: `string`
- themeColor: [`ThemeColor`](#themecolor)
- locale: `string`
- language: [`Language`](#language)
- isPublic: `boolean`
- displayName: `string`
- pictureUrl: `string`
- description: `string` (max 280)

### UserProfileOwner

**Extends:** [UserProfile](#userprofile)

- emails: `string[]`
- googleId: `string`
- googleEmailVerified: `boolean`
- roles: [`Role[]`](#role)
- givenName: `string`
- familyName: `string`
- allergies: [`AllergyRestriction[]`](#allergyrestriction)
- intolerances: [`IntoleranceRestriction[]`](#intolerancerestriction)
- medicalRestrictions: [`MedicalRestriction[]`](#medicalrestriction)
- dietStyles: [`DietStyleRestriction[]`](#dietstylerestriction)
- culturalRestrictions: [`CulturalRestriction[]`](#culturalrestriction)
- personalPreferences: [`PersonalPreferenceRestriction[]`](#personalpreferencerestriction)
- shareToken: `string | null`
- moderationNotes: `string`
- isFeatured: `boolean`
- featuredUntil: `string` (date: ISO 8601)

### User

- token: `string`
- profile: [UserProfileOwner](#userprofileowner)

### UserProfileAdmin

**Extends:** [UserProfileOwner](#userprofileowner)

- featuredAt: `string` (date: ISO 8601)

### UserProfileSummary

- id: `string`
- displayName: `string`
- pictureUrl: `string`
- isFeatured: `boolean` only admins and owners can see this option true

## Recipe Interfaces

### IngredientResponse

- text: `string`
- food: [`FoodSummaryResponse`](#foodsummary)
- quantity: `number` (in grams)
- measureType: [`MeasureType`](#measuretype)
- measureQuantity: `number`
- nutritionalInformation: [`NutritionalInformation`](#nutritionalinformation)
- minerals: [`Minerals`](#minerals)
- vitamins: [`Vitamins`](#vitamins)
- aminoAcids: [`AminoAcids`](#aminoacids)
- essentialAminoAcids: [`EssentialAminoAcids`](#essentialaminoacids) (amino acids multiplied for daily value)

<details>
  <summary>Example:</summary>

```json
{
  "text": "3 xícaras de farinha",
  "food": {
    "id": 22,
    "name": "Farinha de trigo",
    "icon": "https://storage.googleapis.com/caderninho-de-receitas.appspot.com/foodicons/flour.webp",
    "imgs": [
      "https://storage.googleapis.com/caderninho-de-receitas.appspot.com/foods/pexels-pixabay-39303-e5e6a83675924510b33224b9782cf785.webp",
      "https://storage.googleapis.com/caderninho-de-receitas.appspot.com/foods/kiwifruit-400143_1280-67d962802a244e4bb7f30fd31cc58cb6.webp",
      "https://storage.googleapis.com/caderninho-de-receitas.appspot.com/foods/640px-pav-c3-aa_de_chocolate_close-up-cfb6414ca12c4ba9aa36e0c78c6941dd.webp"
    ]
  },
  "quantity": 240,
  "measureType": "Cup",
  "measureQuantity": 3,
  "nutritionalInformation": { "calories": 89, "carbohydrates": 23, "...": 0 },
  "minerals": { "potassium": 358, "magnesium": 27, "...": 0 },
  "vitamins": { "a": 3, "c": 8.7, "...": 0 },
  "aminoAcids": { "alanine": 0.049, "arginine": 0.033, "...": 0 }
}
```

</details>

### RecipeStepDto

- title: `string`
- preparation?: `string`
- additional?: `string`
- ingredientsText: `string`

### RecipeStep

- title: `string`
- preparation: `string`
- additional: `string`
- ingredientsText: `string`
- Ingredients: `RecipeIngredient[]`
- nutritionalInformation: [`NutritionalInformation`](#nutritionalinformation)
- minerals: [`Minerals`](#minerals)
- vitamins: [`Vitamins`](#vitamins)
- aminoAcids: [`AminoAcids`](#aminoacids)
- essentialAminoAcids: [`EssentialAminoAcids`](#essentialaminoacids) (amino acids multiplied for daily value)
- AminoAcidsScore: `number`

### RecipeCategory

- id: `number`
- name: [`LanguageText`](#languagetext)
- namePlural: [`LanguageText`](#languagetext)
- description: [`LanguageText`](#languagetext)
- key: `string` (slug/camel) ?category=recipeCategory
- url: `string` (kebab-case)
- img: `string` (url)
- bannerImg: `string` (url)

### RecipeDto

- name: `string`
- keys: `string`
- description: `string`
- additional: `string`
- isPublic: `boolean`
- language: [`Language`](#language)
- categories: [`FoodCategory[]`](#foodcategory) `| string` (slugs)
- imgs: `string[]`
- steps: [`RecipeStepDto`](#recipestepdto)

### RecipeSummary

- id: `number`
- name: `string`
- imgs: `string[]`
- owner: [`UserProfileSummary`](#userprofilesummary)
- savedByOthersCount: `number`
- nutritionalInformation: [`NutritionalInformation`](#nutritionalinformation)
- isOwner: `boolean`

### RecipeItemSummary

- id: `number`
- name: `string`
- imgs: `string[]`
- savedByOthersCount: `number`
- nutritionalInformation: [`NutritionalInformation`](#nutritionalinformation)

### RecipeIndex

- id: `number`
- name: `string`

### Recipe

- id: `number`
- name: `string`
- keys: `string`
- description: `string`
- additional: `string`
- isPublic: `boolean`
- [`RecipeStep[]`](#recipestep) steps
- language: [`Language`](#language)
- categories: [`FoodCategory[]`](#foodcategory) `| string` (slugs)
- food: [`FoodSummaryResponse`](#foodsummary)
- imgs: `string[]`
- savedByOthersCount: `number`
- createdAt: `string` (date: ISO 8601)
- updatedAt: `string` (date: ISO 8601)
- nutritionalInformation: [`NutritionalInformation`](#nutritionalinformation)
- minerals: [`Minerals`](#minerals)
- vitamins: [`Vitamins`](#vitamins)
- aminoAcids: [`AminoAcids`](#aminoacids)
- essentialAminoAcids: [`EssentialAminoAcids`](#essentialaminoacids) (amino acids multiplied for daily value)
- aminoAcidsScore: `number`
- owner: [`UserProfileSummary`](#userprofilesummary)
- isOwner: `boolean`
- shareToken: `string | null` (only for the owner)
- relatedRecipes: [`RecipeSummary[]`](#recipesummary)

## Recipe List Interfaces

### RecipeListDto

- name: `string`
- description: `string | null`
- isPublic: `boolean`

### RecipeList

- id: `number`
- name: `string`
- description: `string | null`
- isPublic: `boolean`
- owner: [`UserProfileSummary`](#userprofilesummary)
- createdAt: `string` (date: ISO 8601)
- updatedAt: `string` (date: ISO 8601)
- items: [`RecipeItemSummary[]`](#recipeitemsummary)

### RecipeListSummary

- id: `number`
- name: `string`
- description: `string | null`
- isPublic: `boolean`
- items: [`RecipeItemSummary[]`](#recipeitemsummary)

### RecipeListIndex

- id: `number`
- name: `string`
- items: [`RecipeIndex[]`](#recipeindex)

## Workspace Interfaces

### Workspace

The lists bring the recipes and "recipes" brings the rest of recipes out of any list.

- userProfile: [`UserProfile`](#userprofile)
- recipeLists: [`RecipeListSummary`](#recipelistsummary)
- recipes: [`RecipeItemSummary[]`](#recipeitemsummary)

### WorkspaceIndex

The lists bring the recipes and "recipes" brings the rest of recipes out of any list.

- userProfile: [`UserProfile`](#userprofile)
- recipeLists: [`RecipeListIndex`](#recipelistindex)
- recipes: [`RecipeIndex[]`](#recipeindex)

## Icon Endpoints

Base route: (`api/icon`)

`GET /api/icon` — icon lookup

- Auth: AdminOrHigher
- Response: [`Icon[]`](#icon)

`GET /api/icon/{id}` — icon lookup

- Auth: AdminOrHigher
- Response: [`Icon[]`](#icon)

`POST /api/icon` — create icon

- Auth: AdminOrHigher
- Body: `IconDto`
- Response: `201 Created`

`POST /api/icon/bulk` — create many icons

- Auth: AdminOrHigher
- Body: `IconDto[]`
- Response: `201 Created`

`PUT /api/icon/{id}` — update icon

- Auth: AdminOrHigher
- Path: `id` (int)
- Body: `IconDto`
- Response: `201 Created | 204 No Content`

`DELETE /api/icon/{id}` — delete icon

- Auth: AdminOrHigher
- Path: `id` (int)
- Response: `200 OK` (empty body)

## Food Endpoints

Base route: (`api/food`)

`GET /api/food` — list foods (summary)

- Auth: KeeperOrHigher
- Query:
  - `text` (string)
  - `categories` (csv)
  - `limit` (int, default 20, max 64)
- Response: [`FoodSummaryResponse[]`](#foodsummary)

`GET /api/food/{id}` — get one food (full)

- Auth: KeeperOrHigher
- Path: `id` (int)
- Response: [`FoodResponse`](#food)

`POST /api/food` — create food

- Auth: AdminOrHigher
- Body: `FoodDto`
- Response: [`FoodResponse`](#food)

`POST /api/food/many` — create a list of food

- Auth: AdminOrHigher
- Body: `FoodDto[]`
- Response: [`FoodResponse[]`](#food)

`PUT /api/food/{id}` — update food

- Auth: AdminOrHigher
- Path: `id` (int)
- Body: `FoodDto`
- Response: [`FoodResponse`](#food)

`DELETE /api/food/{id}` — delete food

- Auth: AdminOrHigher
- Path: `id` (int)
- Response: `200 OK` (empty body)

`GET /api/food/search-images` — search foods images

- Query: `text` (string, required), `limit` (int, default 6, max 18)
- Response: `string[]`

`GET /api/food/categories` — category lookup

- Response: `string[]` (slugs) or `CategoryItem[]`

`GET /api/food/types` — type lookup

- Response: `FoodType[]` (or map with translations)

### FoodEdits

Route: (`api/food-edits`)

`POST /api/food-edits` - create edit request

- Auth: KeeperOrHigher
- Body: `FoodDto`
- Response: `{ id }`

`GET /api/food-edits/{id}` - get one edit request

- Auth: AdminOrHigher
- Path: `id` (int)
- Response: `FoodEditRequest`

`GET /api/food-edits/pending` - list pending edit requests

- Auth: AdminOrHigher
- Query: `foodId` (optional filter)
- Response: `FoodEditRequest[]`

`POST /api/food-edits/{id}/approve` - approve and apply edit

- Auth: AdminOrHigher
- Path: `id` (int)
- Response: `200 OK` (applied) or `404/400`

`POST /api/food-edits/{id}/reject` - reject edit

- Auth: AdminOrHigher
- Path: `id` (int)
- Response: `200 OK` or `404/400`

## User Endpoints

### Auth Endpoints

Base route: (`api/auth`)

`POST /api/auth/google` — login with Google

- Auth: AllowAnonymous
- Body: `{ idToken: string }`
- Response: [`User`](#user)

`POST /api/auth/refresh` — refresh JWT

- Auth: Any authenticated
- Response: `{ token: string }`

`POST /api/auth/logout` — logout

- Auth: Any authenticated
- Response: `204 No Content`

### UserProfile Endpoints

Route: (`api/userprofile`)

`GET /api/userprofile`

Show public profiles for any user and show private profiles only for admin users.

- Auth: AdminOrHigher | (AllowAnonymous; only see public revisions)
- Query:
  - `text` (string)
  - `limit` (int, default 20, max 64)
  - `isFeatured` (boolean)
- Response: [`UserProfileSummary[]`](#userprofilesummary)

`GET /api/userprofile/{id}`

The owner sees the latest version of the UserProfile.
The other users see the public version if available, if not 404.
Users with shareToken `/api/userprofile/{id}?shareToken=…` can also see the latest version.

- Auth: AdminOrHigher | logged user (owner) | (AllowAnonymous; only see public revisions)
- Path: `id` (int)
- Response: (one of)
  - [`UserProfile`](#userprofile) Anonymous
  - [`UserProfileOwner`](#userprofileowner) Owner or user with share token
  - [`UserProfileAdmin`](#userprofileadmin) Admin or higher

`PUT /api/userprofile/{id}`

The owner can edit their own data.
The admin can edit even more data of other user.

- Auth: AdminOrHigher | logged user (owner)
- Path: `id` (int)
- Body:
  - [`UserProfileDto`](#userprofiledto) Owner
  - [`UserProfileAdminDto`](#userprofileadmindto) Admin or higher
- Response:
  - [`UserProfileOwner`](#userprofileowner) Owner or user with share token
  - [`UserProfileAdmin`](#userprofileadmin) Admin or higher

## Recipe Endpoints

Base route: (`api/recipe`)

`GET /api/recipe` — list my recipes

- Auth: required (logged user)
- Response: [`RecipeSummary[]`](#recipesummary)

`GET /api/recipe/{id}` — get one recipe (published-preferred)

The owner sees the latest version of the recipe.
The other users see the public version if available, if not 404.
Users with shareToken `/api/recipe/{id}?shareToken=…` can also see the latest version.

- Auth: optional (AllowAnonymous; owner can see private version)
- Path: `id` (int)
- Query:
  - `relatedRecipesLimit` (int, default 5, max 5) related suggestions
  - `relatedRecipesExcludeSameOwner` (bool, default false)
- Response: [`Recipe`](#recipe)

`GET /api/recipe/search` — search public recipes

- Auth: optional (AllowAnonymous)
- Query:
  - `text` (string)
  - `categories` (csv or repeated)
  - `limit` (int, default 20, max 64)
- Response: [`Recipe[]`](#recipe)

`POST /api/recipe` — create recipe

- Auth: required (logged user)
- Body: [`RecipeDto`](#recipedto)
- Response: [`Recipe`](#recipe)

`POST /api/recipe/many` — bulk create recipes

- Auth: required (logged user)
- Body: [`RecipeDto[]`](#recipedto)
- Response: [`Recipe[]`](#recipe)

`PUT /api/recipe/{id}` — update recipe

- Auth: required (owner)
- Path: `id` (int)
- Body: [`RecipeDto`](#recipedto)
- Response: [`Recipe`](#recipe)

`DELETE /api/recipe/{id}` — delete recipe

- Auth: required (owner)
- Path: `id` (int)
- Response: `200 OK` (empty body)

`GET /api/recipe/categories` — recipe category lookup

- Auth: optional (AllowAnonymous)
- Response: [`RecipeCategory[]`](#recipecategory)

`GET /api/recipe/pending` — list pending recipes

- Auth: AdminOrHigher
- Response: [`RecipeSummary[]`](#recipesummary)

`POST /api/recipe/{id}/approve` — approve/publish recipe

- Auth: AdminOrHigher
- Path: `id` (int)
- Response: `200 OK` (empty body)

`POST /api/recipe/{id}/deny` — reject recipe

- Auth: AdminOrHigher
- Path: `id` (int)
- Response: `200 OK` (empty body)

`POST /api/recipe/relations/rebuild` — rebuild recipe relations (POST alias)

- Auth: AdminOrHigher
- Body/Query: `topPerRecipe` (int, default 10, max 50)
- Response: `200 OK` (empty body)

`GET /api/recipe/most-copied` — list most copied recipes

- Auth: optional (AllowAnonymous)
- Query: `limit` (int, default 6, max 64)
- Response: [`RecipeSummary[]`](#recipesummary)

## Recipe List Endpoints

Base route: (`api/recipelist`)

`GET /api/recipelist` — list my recipe lists

- Auth: required (logged user)
- Response: [`RecipeListSummary[]`](#recipelistsummary)

`GET /api/recipelist/index` — list my recipe lists like index

- Auth: required (logged user)
- Response: [`RecipeListIndex[]`](#recipelistindex)

`GET /api/recipelist/{id}`

This endpoint is going to be evolved. For now only admins can use.

- Auth: AdminOrHigher
- Path: `id` (int)
- Response: [`RecipeList`](#recipelist)

`POST /api/recipelist` — create list

- Auth: required (logged user)
- Body: [`RecipeListDto`](#recipelistdto)
- Response: [`RecipeListSummary[]`](#recipelistsummary)

`PUT /api/recipelist/{id}` — update list

- Auth: required (owner)
- Path: `id` (int)
- Body: [`RecipeListDto`](#recipelistdto)
- Response: [`RecipeListSummary[]`](#recipelistsummary)

`DELETE /api/recipelist/{id}` — delete list

- Auth: required (owner)
- Path: `id` (int)
- Response: `204 No Content`

`POST /api/recipelist/{id}/recipes/{recipeId}` — add recipe to list

- Auth: required (owner)
- Path: `id` (int), `recipeId` (int)
- Response: `201 Created` (false if already present)

`DELETE /api/recipelist/{id}/recipes/{recipeId}` — remove recipe from list

- Auth: required (owner)
- Path: `id` (int), `recipeId` (int)
- Response: `204 No Content`

## Workspace Endpoints

Base route: (`api/workspace`)

`GET /api/workspace` — owner workspace (full summaries)

- Auth: required (logged user)
- Response: [`Workspace`](#workspace)

`GET /api/workspace/index` — owner workspace index (compact for print/export)

- Auth: required (logged user)
- Response: [`WorkspaceIndex`](#workspaceindex)
