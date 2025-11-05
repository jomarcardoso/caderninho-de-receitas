'use client';
import { useContext } from 'react';
import { DataContext } from './data.context';

export const useData = () => {
  return useContext(DataContext);
};
