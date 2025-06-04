import React, { FC, HTMLProps } from 'react';
import {
  AminoAcids,
  AMINO_ACIDS,
  TRANSLATED_AMINO_ACIDS,
} from '../../services/amino-acid';
import './aminoacids-table.scss';

interface Props {
  aminoAcids: AminoAcids;
  contrast?: 'light' | 'dark';
}

export type AminoAcidsTableProps = Props & HTMLProps<HTMLTableElement>;

const AminoAcidsTable: FC<AminoAcidsTableProps> = ({
  aminoAcids = AMINO_ACIDS,
  contrast,
  className = '',
  ...props
}) => {
  let classes = 'aminoacids-table table';

  classes += contrast === 'light' ? ' aminoacids-table--on-light' : '';
  classes += className ? ` ${className}` : '';

  const essentialAminoAcids = [
    {
      name: TRANSLATED_AMINO_ACIDS.tryptophan,
      quantity: aminoAcids.tryptophan / 280,
    },
    {
      name: TRANSLATED_AMINO_ACIDS.phenylalanine,
      quantity: aminoAcids.phenylalanine / 875,
    },
    {
      name: TRANSLATED_AMINO_ACIDS.leucine,
      quantity: aminoAcids.leucine / 2730,
    },
    {
      name: TRANSLATED_AMINO_ACIDS.valine,
      quantity: aminoAcids.valine / 1820,
    },
    {
      name: TRANSLATED_AMINO_ACIDS.isoleucine,
      quantity: aminoAcids.isoleucine / 1400,
    },
    {
      name: TRANSLATED_AMINO_ACIDS.lysine,
      quantity: aminoAcids.lysine / 2100,
    },
    {
      name: TRANSLATED_AMINO_ACIDS.threonine,
      quantity: aminoAcids.threonine / 1050,
    },
    {
      name: TRANSLATED_AMINO_ACIDS.methionine,
      quantity: aminoAcids.methionine / 728,
    },
    {
      name: TRANSLATED_AMINO_ACIDS.histidine,
      quantity: aminoAcids.histidine / 700,
    },
  ];
  const abundantAminoAcidFromIngredient = essentialAminoAcids.reduce(
    (previous, current) => Math.max(previous, current.quantity),
    0,
  );

  function renderRow({ name = '', quantity = 0 }) {
    const veryLowQuantity = quantity >= abundantAminoAcidFromIngredient / 5;
    const lowQuantity = quantity >= (abundantAminoAcidFromIngredient / 5) * 2;
    const regularQuantity =
      quantity >= (abundantAminoAcidFromIngredient / 5) * 3;
    const highQuantity = quantity >= (abundantAminoAcidFromIngredient / 5) * 4;

    return (
      <tr className="table__tr" key={name}>
        <td className="table__td">{name}</td>
        <td className="table__td aminoacids-table__cell" align="right">
          {veryLowQuantity ? (
            <div className="aminoacids-table__bar aminoacids-table__bar--filled" />
          ) : (
            <div className="aminoacids-table__bar" />
          )}
        </td>
        <td className="table__td aminoacids-table__cell" align="right">
          {lowQuantity ? (
            <div className="aminoacids-table__bar aminoacids-table__bar--filled" />
          ) : (
            <div className="aminoacids-table__bar" />
          )}
        </td>
        <td className="table__td aminoacids-table__cell" align="right">
          {regularQuantity ? (
            <div className="aminoacids-table__bar aminoacids-table__bar--filled" />
          ) : (
            <div className="aminoacids-table__bar" />
          )}
        </td>
        <td className="table__td aminoacids-table__cell" align="right">
          {highQuantity ? (
            <div className="aminoacids-table__bar aminoacids-table__bar--filled" />
          ) : (
            <div className="aminoacids-table__bar" />
          )}
        </td>
      </tr>
    );
  }

  return (
    <div
      className={`table-container ${
        contrast === 'light' ? 'table-container--light' : ''
      }`}
    >
      <table className={classes} {...props}>
        <caption className="table__caption">Tabela de aminoácidos</caption>
        <thead>
          <tr className="table__tr">
            <th className="table__th aminoacids-table__name">Alimento</th>
            <th align="center" className="table__th">
              1
            </th>
            <th align="center" className="table__th">
              2
            </th>
            <th align="center" className="table__th">
              3
            </th>
            <th align="center" className="table__th">
              4
            </th>
          </tr>
        </thead>
        <tbody>{essentialAminoAcids.map(renderRow)}</tbody>
      </table>
    </div>
  );
};

export default AminoAcidsTable;
