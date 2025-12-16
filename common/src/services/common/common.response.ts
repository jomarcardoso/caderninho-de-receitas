import type {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';
import type { NutrientDataResponse } from '../nutrient-data/nutrient-data.response';

export interface CommonDataResponse {
  measures: Record<string, LanguageTextAndPlural>;
  foodTypes: Record<string, LanguageText>;
  measurementUnits: Record<string, LanguageTextAndPlural>;
  recipeCategories: Record<
    string,
    LanguageTextAndPlural & { img?: string; url?: string; key?: string; description?: LanguageText; bannerImg?: string }
  >;
  aminoAcids: Record<string, NutrientDataResponse>;
  minerals: Record<string, NutrientDataResponse>;
  vitamins: Record<string, NutrientDataResponse>;
  nutritionalInformation: Record<string, NutrientDataResponse>;
  dietaryRestrictionOptions?: Partial<
    Record<
      import('./common.model').DietaryRestrictionGroup,
      Array<
        import('./common.model').DietaryRestrictionOption & {
          text: LanguageText;
        }
      >
    >
  >;
  userDietaryRestrictions?: Partial<
    import('./common.model').UserDietaryRestrictions
  >;
  foodClassificationOptions?: import('./common.model').FoodClassificationOption[];
}
