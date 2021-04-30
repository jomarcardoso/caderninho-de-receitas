const path = require('path');

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

    result.data.file.childDbJson.foods.forEach((edge) => {
      createPage({
        path: `food/${edge.enName}`,
        component: foodPage,
        context: edge,
      });
    });
  });
};
