import { MealService, Meal, SetMeal, MealData } from './meal';
import { Food } from './food';

const CURRENT_VERSION = 2;

export interface SetAccount {
  meal: SetMeal;
}

export interface Account {
  meals: Array<Meal>;
  version: number;
}

export interface AccountData {
  meals: Array<MealData>;
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
  meals: [],
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
    meals:
      accountData?.meals?.map((mealData) =>
        MealService.format({ mealData, foods }),
      ) ?? ACCOUNT.meals,
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
    accountData.meals = [];
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
    meals: account.meals.map((meal) => MealService.unFormat(meal)),
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
