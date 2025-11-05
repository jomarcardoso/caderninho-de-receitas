import type { Metadata } from 'next';
import { KitchenPageView } from './page.view';

export const metadata: Metadata = {
  title: 'Kitchen',
};

export default async function KitchenPage() {
  return <KitchenPageView />;
}
