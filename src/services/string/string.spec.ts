import { short, unshort } from './string.service';
import { recipes } from '../../db/partner-recipes';

describe('StringService', () => {
  it('short 0 partner recipe', () => {
    const recipe = recipes[0];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 1 partner recipe', () => {
    const recipe = recipes[1];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 2 partner recipe', () => {
    const recipe = recipes[2];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 3 partner recipe', () => {
    const recipe = recipes[3];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 4 partner recipe', () => {
    const recipe = recipes[4];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 5 partner recipe', () => {
    const recipe = recipes[5];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 6 partner recipe', () => {
    const recipe = recipes[6];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 7 partner recipe', () => {
    const recipe = recipes[7];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 8 partner recipe', () => {
    const recipe = recipes[8];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 9 partner recipe', () => {
    const recipe = recipes[9];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 11 partner recipe', () => {
    const recipe = recipes[11];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 12 partner recipe', () => {
    const recipe = recipes[12];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 13 partner recipe', () => {
    const recipe = recipes[13];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 14 partner recipe', () => {
    const recipe = recipes[14];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 15 partner recipe', () => {
    const recipe = recipes[15];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 16 partner recipe', () => {
    const recipe = recipes[16];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 17 partner recipe', () => {
    const recipe = recipes[17];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    const longRecipe = unshort(shortRecipe);
    const recoveredRecipe = JSON.parse(longRecipe);

    expect(recipe).toStrictEqual(recoveredRecipe);
  });

  it('short 0 lesser than', () => {
    const recipe = recipes[0];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2399);
  });

  it('short 1 lesser than', () => {
    const recipe = recipes[1];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(1675);
  });

  it('short 2 lesser than', () => {
    const recipe = recipes[2];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2395);
  });

  it('short 3 lesser than', () => {
    const recipe = recipes[3];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(3353);
  });

  it('short 4 lesser than', () => {
    const recipe = recipes[4];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(1882);
  });

  it('short 5 lesser than', () => {
    const recipe = recipes[5];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2766);
  });

  it('short 6 lesser than', () => {
    const recipe = recipes[6];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(1594);
  });

  it('short 7 lesser than', () => {
    const recipe = recipes[7];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(1526);
  });

  it('short 8 lesser than', () => {
    const recipe = recipes[8];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(3024);
  });

  it('short 9 lesser than', () => {
    const recipe = recipes[9];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2143);
  });

  it('short 10 lesser than', () => {
    const recipe = recipes[10];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2903);
  });

  it('short 11 lesser than', () => {
    const recipe = recipes[11];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(1308);
  });

  it('short 12 lesser than', () => {
    const recipe = recipes[12];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(5328);
  });

  it('short 13 lesser than', () => {
    const recipe = recipes[13];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2656);
  });

  it('short 14 lesser than', () => {
    const recipe = recipes[14];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(3229);
  });

  it('short 15 lesser than', () => {
    const recipe = recipes[15];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(3434);
  });

  it('short 16 lesser than', () => {
    const recipe = recipes[16];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(2858);
  });

  it('short 17 lesser than', () => {
    const recipe = recipes[17];
    const json = JSON.stringify(recipe);
    const shortRecipe = short(json);

    expect(shortRecipe.length).toBeLessThan(1743);
  });
});
