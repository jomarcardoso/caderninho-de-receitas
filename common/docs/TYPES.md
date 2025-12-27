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
- Enum slugs: `MeasureType`, `NutritionalInformationType`, `MineralType`, `VitaminType`, `AminoAcidType`.

## Food

Same as `FoodResponse` from API.

## Recipe

- (Pending) Document recipe types/responses when needed.
