import { Meal } from './meal.service';

export enum Ojective {
  HEALTH = 'Saúde',
  MUSCLE = 'Músculatura',
  LOSE_WEIGHT = 'Perder peso',
}

export interface Account {
  user: {
    name: string;
    age: number;
    objectives: Array<Ojective>;
  };
  meals: Array<Meal>;
}

export enum CurrentPage {
  HOME,
  MEAL,
  EXERCISE,
}

const ACCOUNT_LOCAL_STORAGE = 'saude-em-pontos';

export const SHAPE_ACCOUNT: Account = {
  user: {
    name: '',
    age: 0,
    objectives: [],
  },
  meals: [],
};

function get() {
  return (
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem(ACCOUNT_LOCAL_STORAGE))
  );
}

function save(account) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCOUNT_LOCAL_STORAGE, JSON.stringify(account));
  }
}

const AccountService = {
  get,
  save,
};

export default AccountService;
