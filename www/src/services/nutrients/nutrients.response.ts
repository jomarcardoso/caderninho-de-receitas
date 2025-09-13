export interface NutrientsResponse {
  nutritionalInformation: Record<string, number>;
  minerals: Record<string, number>;
  vitamins: Record<string, number>;
  aminoAcids: Record<string, number>;
}
