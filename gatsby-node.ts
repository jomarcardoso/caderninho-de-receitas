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
    `,
    { limit: 1000 },
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    const foodDatas = result.data.file.childDbJson.foods as Array<typeof FoodData>;

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
