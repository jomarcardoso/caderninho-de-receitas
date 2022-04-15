import { StringService } from '../string';
import { paramDictionary } from './dictionary';

export function short(param = ''): string {
  const shorString = StringService.short(param, paramDictionary);

  return shorString.replaceAll('%7E', '~');
}

export function unshort(param = ''): string {
  return StringService.unshort(param, paramDictionary);
}
