import type { Metadata } from 'next';
import {
  mapRecipesDataResponseToModel,
  RECIPES_DATA,
} from '@common/services/recipe';
import { fetchApiJson } from '@/lib/api-server';
import { hasKeeperOrHigherServer } from '@/services/auth/user-roles.server';
import { MyRecipesClient } from './page.client';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Minhas listas de receitas',
};

const isMobileUA = (ua: string) =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    ua || '',
  );

export default async function MyRecipesPage() {
  let data = RECIPES_DATA;

  try {
    const json = await fetchApiJson('/api/recipe', {
      next: {
        tags: ['my-recipes'],
      },
    });
    data = mapRecipesDataResponseToModel(json);
  } catch {
    data = RECIPES_DATA;
  }

  const showFoodsSection = await hasKeeperOrHigherServer();
  const userAgent = (await headers()).get('user-agent') ?? '';
  const isMobile = isMobileUA(userAgent);

  return (
    <MyRecipesClient
      data={data}
      showFoodsSection={showFoodsSection}
      isMobile={isMobile}
    />
  );
}
