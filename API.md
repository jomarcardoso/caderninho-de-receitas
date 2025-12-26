# API DTOs & Responses

## Common Types

### MeasurementUnit

`gram` | `liter`

### FoodType

`liquid` | `seed` | `herb` | `temper` | `fruit` | `solid` | `oil` | `legumen` | `flake` | `root` | `meat` | `vegetable` | `cake` | `cheese` | `powder` | `starch` | `recipe`

### Language

`pt` | `en`

### MeasureType

`Cup` | `SmallCup` | `Spoon` | `TeaSpoon` | `Unity` | `UnitySmall` | `UnityLarge` | `Literal` | `Can` | `Glass` | `Breast` | `Clove` | `Slice` | `Bunch` | `Ml` | `Liter` | `Gram` | `Kilo` | `Pinch`

### NutritionalInformationType

`Acidification` | `Ashes` | `Calories` | `Carbohydrates` | `Cholesterol` | `DietaryFiber` | `Gi` | `Gl` | `MonounsaturatedFats` | `PolyunsaturatedFats` | `Proteins` | `SaturedFats` | `Sugar` | `TotalFat`

### MineralType

`Calcium` | `Copper` | `Fluoride` | `Iron` | `Magnesium` | `Manganese` | `Phosphorus` | `Potassium` | `Selenium` | `Sodium` | `Zinc`

### VitaminType

`A` | `AlphaCarotene` | `B1` | `B11` | `B12` | `B2` | `B3` | `B5` | `B6` | `B7` | `B9` | `BetaCarotene` | `C` | `Choline` | `CryptoxanthinCarotene` | `D` | `D2` | `D3` | `E` | `K` | `Lycopene`

### AminoAcidType

`Alanine` | `Arginine` | `AsparticAcid` | `Cystine` | `GlutamicAcid` | `Glutamine` | `Glycine` | `Histidine` | `Isoleucine` | `Leucine` | `Lysine` | `Methionine` | `Phenylalanine` | `Proline` | `Serine` | `Threonine` | `Tryptophan` | `Tyrosine` | `Valine`

### EssentialAminoAcidType

`Tryptophan` | `Phenylalanine` | `Leucine` | `Valine` | `Isoleucine` | `Lysine` | `Threonine` | `Methionine` | `Histidine`

### FoodCategory

Use `categories` as an array of these slugs (may be empty).

- `OriginAnimal`, `RedMeat`, `WhiteMeat`, `Fish`, `Shellfish`, `Eggs`, `Dairy`, `Honey`,
- `OriginPlant`, `Seeds`, `Oilseeds`, `Grains`, `Legumes`, `Fruits`, `Vegetables`, `Roots`, `Tubers`, `Leafy`, `Stalk`, `Flowers`, `Herbs`, `Spices`, `Fungi`,
- `OriginProcessed`, `FoodAdditives`, `RefinedSugars`, `ProcessedFats`, `FermentedOrigin`, `UltraProcessed`,
- `PlantRoot`, `PlantTuber`, `PlantRhizome`, `PlantBulb`, `PlantStem`, `PlantLeaf`, `PlantFlower`, `PlantSeed`,
- `FleshyFruit`, `DryFruit`, `PodLegume`, `Citrus`, `Solanaceae`, `Cucurbitaceae`, `Brassicas`, `LegumeFamily`, `NutFamily`, `Cereals`, `BotanicalFungi`,
- `HighLactose`, `LactoseFree`, `HighGluten`, `GlutenFreeNatural`, `HighFiber`, `HighGI`, `LowGI`, `HighProtein`, `HighFat`, `HighSodium`, `ContainsCaffeine`, `FermentedChem`, `HighHistamine`,
- `Raw`, `MinimallyProcessed`, `Smoked`, `Cured`, `Fried`, `Baked`, `Grilled`, `Boiled`, `Dehydrated`, `Frozen`, `Preserved`,
- `BaseIngredient`, `Condiment`, `Seasoning`, `Sauce`, `Beverage`, `SideDish`, `Garnish`, `Dessert`, `MainProtein`

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

### Icon

- `number` id
- [`LanguageText`](#languagetext) name
- `string` url
- [`LanguageText`](#languagetext) keys

### AuthorSummaryResponse

- `string` id
- `string` name
- `string` img

## Food Interfaces

### FoodDto (request/response payload)

Technical contract for create/update food endpoints and detailed responses.

- `number` id
- [`LanguageText`](#languagetext) name
- `number` iconId
- `string[]` imgs
- [`LanguageText`](#languagetext) keys
- [`LanguageText`](#languagetext) description
- [`MeasurementUnit`](#measurementunit) measurementUnit
- [`FoodType`](#foodtype) type
- [`FoodCategory[]`](#foodcategory) `| string` categories (slugs)
- [`Measures`](#measures) measures
- [`NutritionalInformation`](#nutritionalinformation) nutritionalInformation
- [`Minerals`](#minerals) minerals
- [`Vitamins`](#vitamins) vitamins
- [`AminoAcids`](#aminoacids) aminoAcids

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

- `number` id
- `string` name
- `string` icon (url)
- `string[]` imgs

### FoodResponse

- `number` id
- [`LanguageText`](#languagetext) name
- [`LanguageText`](#languagetext) keys
- [`LanguageText`](#languagetext) description
- `string[]` imgs
- [`MeasurementUnit`](#measurementunit) measurementUnit
- [`Measures`](#measures) measures
- [`Icon`](#icon) icon
- [`FoodType`](#foodtype) type
- [`FoodCategory[]`](#foodcategory) categories
- [`NutritionalInformation`](#nutritionalinformation) nutritionalInformation
- [`Minerals`](#minerals) minerals
- [`Vitamins`](#vitamins) vitamins
- [`AminoAcids`](#aminoacids) aminoAcids
- [`EssentialAminoAcids`](#essentialaminoacids) essentialAminoAcids (amino acids multiplied for daily value)
- `number` AminoAcidsScore

## Recipe

### IngredientResponse

- `string` text
- [`FoodSummaryResponse`](#foodsummaryresponse) food
- `number` quantity (in grams)
- [`MeasureType`](#measuretype) measureType
- `number` measureQuantity
- [`NutritionalInformation`](#nutritionalinformation) nutritionalInformation
- [`Minerals`](#minerals) minerals
- [`Vitamins`](#vitamins) vitamins
- [`AminoAcids`](#aminoacids) aminoAcids
- [`EssentialAminoAcids`](#essentialaminoacids) essentialAminoAcids (amino acids multiplied for daily value)

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

### RecipeStepResponse

- `string` title
- `string` preparation
- `string` additional
- `string` ingredientsText
- `RecipeIngredient[]` Ingredients
- [`NutritionalInformation`](#nutritionalinformation) nutritionalInformation
- [`Minerals`](#minerals) minerals
- [`Vitamins`](#vitamins) vitamins
- [`AminoAcids`](#aminoacids) aminoAcids
- [`EssentialAminoAcids`](#essentialaminoacids) essentialAminoAcids (amino acids multiplied for daily value)
- `number` AminoAcidsScore

## RecipeResponse

- `number` id
- `string` name
- `string` keys
- `string` description
- `string` additional
- [`RecipeStepResponse[]`](#recipestepresponse) steps
- [`Language`](#language) language
- [`FoodCategory[]`](#foodcategory) `| string` categories (slugs)
- [`FoodSummaryResponse`](#foodsummaryresponse) food
- `string[]` imgs
- `number` savedByOthersCount
- `number`ownerId
- `string` createdAt (ISO 8601)
- `string` updatedAt (ISO 8601)
- [`NutritionalInformation`](#nutritionalinformation) nutritionalInformation
- [`Minerals`](#minerals) minerals
- [`Vitamins`](#vitamins) vitamins
- [`AminoAcids`](#aminoacids) aminoAcids
- [`EssentialAminoAcids`](#essentialaminoacids) essentialAminoAcids (amino acids multiplied for daily value)
- `number` AminoAcidsScore
- [`AuthorSummaryReponse`](#authorsummaryresponse) author
- `boolean` isOwner
