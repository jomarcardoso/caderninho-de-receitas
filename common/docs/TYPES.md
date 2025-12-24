# Types

## Helpers

- **Language/LanguageText**: localized texts keyed by `en`/`pt`.
- **Builders/Normalizers**: `buildFoodPayloadForSave(form, language, foodId?)` flattens `FoodForm` into a `FoodDto`-shaped payload; nutrient fallbacks/normalizers map records to nutrient arrays.

## Auth/User

- **AuthorSummary**: `{ id: string; displayName: string; pictureUrl?: string }`.
- Roles: strings like `Owner`, `Admin`, `Keeper` (enforced in backend; referenced here for UI logic).

## HTTP/Services

- Conventions: JSON camelCase; include `Authorization: Bearer <token>` when required.
- Errors: backend may return `ApiError` with `status`, `title`, `detail`, `code`, `correlationId`.

## Common Models

- **MeasurementUnit**: localized unit text/plural.
- **Measure**: map of unit keys to numeric quantities.
- **Nutrient/NutrientResponse**: name (`LanguageText`), quantity, measurementUnit.
- Nutrient groups: `NutritionalInformation`, `Minerals`, `Vitamins`, `AminoAcids`, `EssentialAminoAcids`.

## Food

### FoodDto

- `int` id
- `LanguageText` name, keys, description
- `string[]` imgs
- `int?` iconId
- `FoodType` type
- `MeasurementUnit` measurementUnit
- `Measure` measures
- `string[]` categories
- Nutrients: `NutritionalInformation`, `Minerals`, `Vitamins`, `AminoAcids`, `EssentialAminoAcids`
- `double` aminoAcidsScore
- **FoodResponse**: same shape as `Food` entity (full), used in GET `/api/food/{id}`.
- **FoodSummaryResponse**: `{ id: int; name: LanguageText; icon: string; imgs: string[] }` for listings/search.
- **Food (model/UI)**: mirrors response but used in frontend domain.
- **FoodForm**: flattened form state (namePt/nameEn, descriptionPt/En, keysPt/En, imgs, icon/iconId, categories, many numeric nutrient fields).
- **FoodService** (common/src/services/food/food.service.ts)
  - `mapFoodResponseToModel(response: FoodResponse): Food`
  - `mapFoodToModelDto(food: Food): FoodDto`
  - `buildFoodPayloadForSave(form: FoodForm, language: Language, foodId?): any`

## Recipe

- (Pending) Document recipe types/responses when needed.
