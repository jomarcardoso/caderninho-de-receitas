'use client';
import { Footer2 } from '@/components/footer-2/footer-2';
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
      header={<Header2 currentPage="recipe" />}
      footer={
        <Footer2>
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
        </Footer2>
      }
    >
      <main className="theme-light py-5">
        <RecipeRegister />
      </main>
    </Layout2>
  );
};
