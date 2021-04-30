import { useStaticQuery, graphql } from 'gatsby';
import { Food } from '../services/food';

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
            juice {
              name
              image
              enName
              gi
              calories
              gl
              carbohydrates
            }
          }
        }
      }
    }
  `);

  return data.file.childDbJson.foods;
};

export default useFoods;
