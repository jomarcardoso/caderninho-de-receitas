'use client';
import { Navbar } from '@/components/navbar/navbar';
import { Layout2 } from '@/components/layout-2/layout-2';
import { RecipeRegister } from '@/components/recipe-register/recipe-register';
import { NavigationService } from '@/services/navigation.service';
import { translate } from '@common/services/language/language.service';
import { Button } from 'notebook-layout';
import { Language } from '@/contexts/language';
import { Header2 } from '@/components/header-2/header-2';

export const KitchenPageClient = () => {
  const language: Language = 'pt';

  return (
    <Layout2
      header={<Header2 currentPage="kitchen" />}
      navbar={
        <Navbar>
          <Button variant="secondary" onClick={() => NavigationService.pop()}>
            {translate('cancel', language)}
          </Button>
          <Button
            type="submit"
            // disabled={!serverUp}
            // title={!serverUp ? 'Servidor offline' : undefined}
          >
            <ion-icon name="save-outline" />
            {translate('saveRecipe', language)}
          </Button>
        </Navbar>
      }
    >
      <main className="theme-light py-5">
        <RecipeRegister />
      </main>
    </Layout2>
  );
};
