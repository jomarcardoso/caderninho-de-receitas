import reverse from 'lodash/reverse';
import { commonDictionary } from './dicionary';

export function unshort(
  shortString = '',
  dictionary: Record<string, string> = commonDictionary,
): string {
  let string = shortString;

  Object.entries(dictionary).forEach(([key, value]) => {
    string = string.replaceAll(key, value);
  });

  return string;
}

export function short(
  longString = '',
  dictionary: Record<string, string> = commonDictionary,
): string {
  let string = longString;

  reverse(Object.entries(dictionary)).forEach(([key, value]) => {
    string = string.replaceAll(value, key);
  });

  return string;
}
