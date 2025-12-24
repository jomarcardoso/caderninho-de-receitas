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

### MeasuresDto

Object map:

- Key: [`MeasureType`](#measuretype)
- Value: `number`

### NutritionalInformationDto

Object map:

- Key: [`NutritionalInformationType`](#nutritionalinformationtype)
- Value: `number`

### MineralsDto

Object map:

- Key: [`MineralType`](#mineraltype)
- Value: `number`

### VitaminsDto

Object map:

- Key: [`VitaminType`](#vitamintype)
- Value: `number`

### AminoAcidsDto

Object map:

- Key: [`AminoAcidType`](#aminoacidtype)
- Value: `number`

## FoodDto (request/response payload)

Technical contract for create/update food endpoints and detailed responses.

### Interface (conceptual)

- `number` id
- [`LanguageText`](#languagetext) name
- `number` iconId
- `string[]` imgs
- [`LanguageText`](#languagetext) keys
- [`LanguageText`](#languagetext) description
- [`MeasurementUnit`](#measurementunit) measurementUnit
- [`FoodType`](#foodtype) type
- [`FoodCategory[]`](#foodcategory) `| string` categories (slugs)
- [`MeasuresDto`](#measuresdto) measures
- [`NutritionalInformationDto`](#nutritionalinformationdto) nutritionalInformation
- [`MineralsDto`](#mineralsdto) minerals
- [`VitaminsDto`](#vitaminsdto) vitamins
- [`AminoAcidsDto`](#aminoacidsdto) aminoAcids

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

## FoodSummaryResponse

- `number` id
- `string` name
- `string` icon (url)
- `string[]` imgs

## FoodResponse

---

Keep this file as the source of truth for DTOs/responses exposed by the API. Add new DTOs here when endpoints are added or updated.
