const path = require('path');
const { FoodService, FoodData, Food } = require('./src/services/food');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const foodPage = path.resolve(`src/pages/food.tsx`);

  return graphql(
    `
      query {
        file(relativePath: { eq: "food.json" }) {
          childDbJson {
            foods {
              name
              id
              image
              enName
              gi
              calories
              gl
              carbohydrates
              proteins
              unitOfMeasurement
              minerals {
                sodium
                calcium
                phosphorus
                manganese
                magnesium
                iron
                potassium
                copper
                zinc
                fluoride
              }
              vitamins {
                c
                b1
                b2
                b3
                b5
                b6
                b7
                b9
                folicAcid
                foodFolate
                folateDFE
                choline
                b12
                retinol
                betaCarotene
                alphaCarotene
                cryptoxanthinCarotene
                a
                lycopene
                e
                d
                d2
                d3
                k
                k1
              }
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
    `,
    { limit: 1000 },
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    const foodDatas = result.data.file.childDbJson.foods as Array<
      typeof FoodData
    >;

    const foods: Array<typeof Food> = foodDatas.map(FoodService.format);

    foods.forEach((edge) => {
      createPage({
        path: `food/${edge.enName}`,
        component: foodPage,
        context: edge,
      });
    });
  });
};
