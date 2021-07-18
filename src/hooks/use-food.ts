import { useStaticQuery, graphql } from 'gatsby';
import { Food, FoodData, FoodService } from '../services/food';

const useFoods = (): Array<Food> => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "food.json" }) {
        childDbJson {
          foods {
            name
            enName
            id
            image
            calories
            gi
            gl
            carbohydrates
            unitOfMeasurement
            aminoAcids {
              methionine
              leucine
              isoleucine
              lysine
              phenylalanine
              threonine
              tryptophan
              valine
              arginine
              histidine
              proline
              glycine
              glutamine
              cystine
              alanine
              asparticAcid
              glutamicAcid
              serine
              tyrosine
            }
            keys
            oneMeasures {
              quantity
              type
            }
          }
        }
      }
    }
  `);

  const foodDatas = data.file.childDbJson.foods as Array<FoodData>;

  return foodDatas.map(FoodService.format);
};

export default useFoods;
