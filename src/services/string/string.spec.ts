import { short, unshort } from './string.service';
import { recipesData } from '../../db/partner-recipes';

describe('StringService', () => {
  it('short 0 partner recipe', () => {
    const recipe = recipesData[0];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 1 partner recipe', () => {
    const recipe = recipesData[1];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 2 partner recipe', () => {
    const recipe = recipesData[2];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 3 partner recipe', () => {
    const recipe = recipesData[3];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 4 partner recipe', () => {
    const recipe = recipesData[4];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 5 partner recipe', () => {
    const recipe = recipesData[5];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 6 partner recipe', () => {
    const recipe = recipesData[6];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 7 partner recipe', () => {
    const recipe = recipesData[7];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 8 partner recipe', () => {
    const recipe = recipesData[8];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 9 partner recipe', () => {
    const recipe = recipesData[9];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 11 partner recipe', () => {
    const recipe = recipesData[11];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 12 partner recipe', () => {
    const recipe = recipesData[12];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 13 partner recipe', () => {
    const recipe = recipesData[13];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 14 partner recipe', () => {
    const recipe = recipesData[14];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 15 partner recipe', () => {
    const recipe = recipesData[15];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 16 partner recipe', () => {
    const recipe = recipesData[16];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 17 partner recipe', () => {
    const recipe = recipesData[17];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 0 lesser than', () => {
    const recipe = recipesData[0];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2398);
  });

  it('short 1 lesser than', () => {
    const recipe = recipesData[1];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(1660);
  });

  it('short 2 lesser than', () => {
    const recipe = recipesData[2];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2394);
  });

  it('short 3 lesser than', () => {
    const recipe = recipesData[3];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(3352);
  });

  it('short 4 lesser than', () => {
    const recipe = recipesData[4];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(1881);
  });

  it('short 5 lesser than', () => {
    const recipe = recipesData[5];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2765);
  });

  it('short 6 lesser than', () => {
    const recipe = recipesData[6];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(1567);
  });

  it('short 7 lesser than', () => {
    const recipe = recipesData[7];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(1525);
  });

  it('short 8 lesser than', () => {
    const recipe = recipesData[8];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2997);
  });

  it('short 9 lesser than', () => {
    const recipe = recipesData[9];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2142);
  });

  it('short 10 lesser than', () => {
    const recipe = recipesData[10];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2876);
  });

  it('short 11 lesser than', () => {
    const recipe = recipesData[11];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(1293);
  });

  it('short 12 lesser than', () => {
    const recipe = recipesData[12];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(5327);
  });

  it('short 13 lesser than', () => {
    const recipe = recipesData[13];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2655);
  });

  it('short 14 lesser than', () => {
    const recipe = recipesData[14];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(3228);
  });

  it('short 15 lesser than', () => {
    const recipe = recipesData[15];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(3433);
  });

  it('short 16 lesser than', () => {
    const recipe = recipesData[16];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2850);
  });

  it('short 17 lesser than', () => {
    const recipe = recipesData[17];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(1716);
  });
});
