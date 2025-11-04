import type { Metadata } from 'next';
import MyRecipesClient from './ui/MyRecipes.client';

export const metadata: Metadata = {
  title: 'Minhas listas de receitas',
};

export default function MyRecipesPage() {
  return (
    <main className="container" style={{ padding: 16 }}>
      <h1 className="h2" style={{ marginBottom: 12 }}>Minhas listas</h1>
      <MyRecipesClient />
    </main>
  );
}

