import type { Metadata } from 'next';
import { KitchenPageClient } from './page.client';

export const metadata: Metadata = {
  title: 'Kitchen',
};

export default async function KitchenPage() {
  return <KitchenPageClient />;
}
