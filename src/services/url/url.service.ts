import { StringService } from '../string';
import { paramDictionary } from './dictionary';

function short(param = ''): string {
  const shorString = StringService.short(param, paramDictionary);

  return shorString.replaceAll('%7E', '~');
}

function unshort(param = ''): string {
  return StringService.unshort(param, paramDictionary);
}

export const UrlService = {
  short,
  unshort,
};
