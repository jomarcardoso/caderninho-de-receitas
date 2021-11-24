export interface EssencialAminoAcids {
  methionine: number;
  leucine: number;
  isoleucine: number;
  lysine: number;
  phenylalanine: number;
  threonine: number;
  tryptophan: number;
  valine: number;
  histidine: number;
}

export interface NonEssencialAminoAcids {
  arginine: number;
  proline: number;
  glycine: number;
  glutamine: number;
  cystine: number;
  alanine: number;
  asparticAcid: number;
  glutamicAcid: number;
  serine: number;
  tyrosine: number;
}

export type AminoAcids = EssencialAminoAcids & NonEssencialAminoAcids;

export type AminoAcidsData = Partial<AminoAcids>;

export const AMINO_ACIDS: AminoAcids = {
  alanine: 0,
  arginine: 0,
  asparticAcid: 0,
  cystine: 0,
  glutamicAcid: 0,
  glutamine: 0,
  glycine: 0,
  histidine: 0,
  isoleucine: 0,
  leucine: 0,
  lysine: 0,
  methionine: 0,
  phenylalanine: 0,
  proline: 0,
  serine: 0,
  threonine: 0,
  tryptophan: 0,
  tyrosine: 0,
  valine: 0,
};

export const TRANSLATED_AMINO_ACIDS = {
  alanine: 'Alanina',
  arginine: 'Arginina',
  asparticAcid: 'Ácido Aspártico',
  cystine: 'Cistina',
  glutamicAcid: 'Ácido Glutâmico',
  glutamine: 'Glutamina',
  glycine: 'Glicina',
  histidine: 'Histidina',
  isoleucine: 'Isoleucina',
  leucine: 'Leucina',
  lysine: 'Lisina',
  methionine: 'Metionina',
  phenylalanine: 'Fenilalanina',
  proline: 'Prolina',
  serine: 'Serina',
  threonine: 'Treonina',
  tryptophan: 'Triptofano',
  tyrosine: 'Tirosina',
  valine: 'Valina',
};
