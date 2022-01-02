import React, { FC } from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  AminoAcids,
  AMINO_ACIDS,
  TRANSLATED_AMINO_ACIDS,
} from '../../services/amino-acid';
import './aminoacids-table.scss';

interface Props {
  aminoAcids: AminoAcids;
}

const AminoAcidsTable: FC<Props> = ({ aminoAcids = AMINO_ACIDS }) => {
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
      <TableRow key={name}>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell className="aminoacids-table__cell" align="right">
          {veryLowQuantity ? (
            <Box className="aminoacids-table__bar" bgcolor="primary.main" />
          ) : (
            <Box className="aminoacids-table__bar" />
          )}
        </TableCell>
        <TableCell className="aminoacids-table__cell" align="right">
          {lowQuantity ? (
            <Box className="aminoacids-table__bar" bgcolor="primary.main" />
          ) : (
            <Box className="aminoacids-table__bar" />
          )}
        </TableCell>
        <TableCell className="aminoacids-table__cell" align="right">
          {regularQuantity ? (
            <Box className="aminoacids-table__bar" bgcolor="primary.main" />
          ) : (
            <Box className="aminoacids-table__bar" />
          )}
        </TableCell>
        <TableCell className="aminoacids-table__cell" align="right">
          {highQuantity ? (
            <Box className="aminoacids-table__bar" bgcolor="primary.main" />
          ) : (
            <Box className="aminoacids-table__bar" />
          )}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Paper variant="outlined" className="paper">
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Alimento</TableCell>
              <TableCell align="right">1</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="right">3</TableCell>
              <TableCell align="right">4</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{essentialAminoAcids.map(renderRow)}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AminoAcidsTable;
