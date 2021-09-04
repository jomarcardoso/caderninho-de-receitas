import { RecipeService, Recipe, SetRecipe, RecipeData } from './recipe';
import { Food } from './food';

const CURRENT_VERSION = 2;

export interface SetAccount {
  recipe: SetRecipe;
  removeRecipe(id: number): void;
}

export interface Account {
  recipes: Array<Recipe>;
  version: number;
}

export interface AccountData {
  recipes: Array<RecipeData>;
  version: number;
}

/**
 * @deprecated
 */
export interface AccountDataV1 extends AccountData {
  hasReadAdvertise?: boolean;
}

export interface AccountAndSet {
  account: Account;
  setAccount?: SetAccount;
}

const ACCOUNT_LOCAL_STORAGE = 'saude-em-pontos';

export const ACCOUNT: Account = {
  recipes: [],
  version: 0,
};

function format({
  accountData,
  foods,
}: {
  accountData: AccountData;
  foods: Array<Food>;
}): Account {
  return {
    recipes:
      accountData?.recipes?.map((recipeData) =>
        RecipeService.format({ recipeData, foods }),
      ) ?? ACCOUNT.recipes,
    version: CURRENT_VERSION,
  };
}

function get(foods: Array<Food>): Account {
  if (typeof window === 'undefined') return ACCOUNT;

  const accountData: AccountData | AccountDataV1 =
    JSON.parse(localStorage.getItem(ACCOUNT_LOCAL_STORAGE) || 'null') ??
    ACCOUNT;

  const localVersion = accountData.version || 0;

  if (localVersion < 0) {
    accountData.recipes = [];
  }

  const accountDataV1 = accountData as AccountDataV1;

  if (localVersion < 2) {
    delete accountDataV1.hasReadAdvertise;
  }

  return format({
    accountData,
    foods,
  });
}

function unFormat(account: Account): AccountData {
  return {
    recipes: account.recipes.map((recipe) => RecipeService.unFormat(recipe)),
    version: CURRENT_VERSION,
  };
}

function save(account: Account): void {
  if (typeof window === 'undefined') return;

  const accountData = unFormat(account);

  localStorage.setItem(ACCOUNT_LOCAL_STORAGE, JSON.stringify(accountData));
}

const AccountService = {
  get,
  save,
};

export default AccountService;
