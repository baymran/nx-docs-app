import {DeepReadonly} from "@documents/core/utils";

type DictionaryNames = 'documentTypes' | 'organizations';
type DictionaryConfig = Record<DictionaryNames, Record<number, string>>

const dictionaryConfig: DeepReadonly<DictionaryConfig> = {
  documentTypes: {
    1: 'Паспорт',
    2: 'Загран.паспорт',
    3: 'Свидетельство о рождении',
  },
  organizations: {
    1: 'ГУ МВД Первого района',
    2: 'ГУ МВД Второго района',
    3: 'ГУ МВД Третьего района',
  },
} as const;

export function getDictionaryValue(dictionaryName: DictionaryNames, key: number): string {
  const dictionary = dictionaryConfig[dictionaryName];
  return Object.prototype.hasOwnProperty.call(dictionary, key) ? dictionary[key] : 'Unknown';
}

export function getKeyFromDictionaryValue(dictionaryName: DictionaryNames, value: string): number {
  const dictionary = dictionaryConfig[dictionaryName];
  for (const key in dictionary) {
    if (Object.prototype.hasOwnProperty.call(dictionary, key) && dictionary[key] === value) {
      return parseInt(key);
    }
  }
  throw new Error('The dictionary does not contain a value referred to in the "key" argument.')
}
