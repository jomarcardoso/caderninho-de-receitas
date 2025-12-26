export type MeasureType =
  | 'Cup'
  | 'SmallCup'
  | 'Spoon'
  | 'TeaSpoon'
  | 'Unity'
  | 'UnitySmall'
  | 'UnityLarge'
  | 'Literal'
  | 'Can'
  | 'Glass'
  | 'Breast'
  | 'Clove'
  | 'Slice'
  | 'Bunch'
  | 'Ml'
  | 'Liter'
  | 'Gram'
  | 'Kilo'
  | 'Pinch';

// Map of measure unit -> numeric quantity
export type Measures = Partial<Record<MeasureType, number>>;
