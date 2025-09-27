import React, { FC, HTMLProps, useCallback, useContext } from 'react';
import './aminoacids-table.scss';
import { Nutrient } from '../../services/nutrient/nutrient.model';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from '../../services/language/language.service';

interface Props {
  essentialAminoAcids: Nutrient[];
  contrast?: 'light' | 'dark';
}

export type AminoAcidsTableProps = Props & HTMLProps<HTMLTableElement>;

const AminoAcidsTable: FC<AminoAcidsTableProps> = ({
  essentialAminoAcids = [],
  contrast,
  className = '',
  ...props
}) => {
  const { language } = useContext(LanguageContext);
  let classes = 'aminoacids-table table';

  classes += contrast === 'light' ? ' aminoacids-table--on-light' : '';
  classes += className ? ` ${className}` : '';

  const abundantAminoAcidFromIngredient = essentialAminoAcids.reduce(
    (previous, current) => Math.max(previous, current.quantity),
    0,
  );

  const renderRow = useCallback(({ quantity, name }: Nutrient) => {
    const veryLowQuantity = quantity >= abundantAminoAcidFromIngredient / 5;
    const lowQuantity = quantity >= (abundantAminoAcidFromIngredient / 5) * 2;
    const regularQuantity =
      quantity >= (abundantAminoAcidFromIngredient / 5) * 3;
    const highQuantity = quantity >= (abundantAminoAcidFromIngredient / 5) * 4;

    return (
      <tr className="table__tr" key={name[language]}>
        <td className="table__td">{name[language]}</td>
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
  }, []);

  return (
    <div
      className={`table-container ${
        contrast === 'light' ? 'table-container--light' : ''
      }`}
    >
      <table className={classes} {...props}>
        <caption className="table__caption">{translate('aminoAcidsTableTitle', language)}</caption>
        <thead>
          <tr className="table__tr">
            <th className="table__th aminoacids-table__name">{translate('aminoAcidsFoodColumn', language)}</th>
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
