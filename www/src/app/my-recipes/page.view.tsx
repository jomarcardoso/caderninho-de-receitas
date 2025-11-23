'use client';
import { CiCircleChevLeft, CiCirclePlus, CiSearch } from 'react-icons/ci';
import './page.scss';
// import MyRecipesClient from './ui/MyRecipes.client';
import { Layout2 } from '@/components/layout-2/layout-2';
import { Header2 } from '@/components/header-2/header-2';
import { Navbar } from '@/components/navbar/navbar';
import { Language } from '@/contexts/language';
import { translate } from '@common/services/language/language.service';
import { Button, Card, NotebookTabs } from 'notebook-layout';
import { addRecipeToList } from '@/services/recipe-lists.service';
import Link from 'next/link';
import { NavLink } from '@/components/nav-link/nav-link';
import capitalize from 'lodash/capitalize';
import { Recipe, RecipesData } from '@common/services/recipe';
import {
  createRecipeList,
  deleteRecipeList,
} from '@/services/recipe-lists.service';
import { FC, ReactElement, useMemo, useState } from 'react';
import { Image2 } from '@/components/image-2/image';
import { Dialog } from 'notebook-layout';
import { Food } from '@common/services/food/food.model';
import { ListItem } from '@/components/list-item/list-item';
import FoodDialog from '@/components/food-dialog/food-dialog';

export interface MyRecipesViewProps {
  data: RecipesData;
  showFoodsSection?: boolean;
}

export const MyRecipesView: FC<MyRecipesViewProps> = ({
  data,
  showFoodsSection = false,
}) => {
  const language: Language = 'pt';
  const { recipes, recipeLists, foods } = data;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [foodDialogOpen, setFoodDialogOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const lists = useMemo(() => recipeLists ?? [], [recipeLists]);

  function openDialogForRecipe(id: number) {
    setSelectedId(id);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setSelectedId(null);
  }

  function openFoodDialog(food: Food) {
    setSelectedFood(food);
    setFoodDialogOpen(true);
  }

  function closeFoodDialog() {
    setFoodDialogOpen(false);
    setSelectedFood(null);
  }

  async function handleAddNewList() {
    try {
      const name = prompt('Nome da nova lista');
      if (!name) return;
      const trimmed = name.trim();
      if (!trimmed) return;
      await createRecipeList(trimmed);
      // Reload to reflect the newly created list in SSR-provided data
      if (typeof window !== 'undefined') window.location.reload();
    } catch (e) {
      // noop: keep minimal behavior; errors can be surfaced later
      console.error('Falha ao criar lista', e);
    }
  }

  async function handleDeleteList(id: number) {
    try {
      const ok = confirm('Tem certeza que deseja excluir esta lista?');
      if (!ok) return;
      const deleted = await deleteRecipeList(id);
      if (deleted) {
        if (typeof window !== 'undefined') window.location.reload();
      }
    } catch (e) {
      alert('Não foi possível excluir a lista agora.');
      console.error(e);
    }
  }

  async function handleAddRecipeToList(listId: number) {
    if (!selectedId) return;
    try {
      setAdding(true);
      const ok = await addRecipeToList(listId, selectedId);
      if (!ok) throw new Error('Falha ao adicionar');
      if (typeof window !== 'undefined') window.location.reload();
    } catch (e) {
      alert('Não foi possível adicionar a receita nesta lista agora.');
      console.error(e);
    } finally {
      setAdding(false);
    }
  }

  function renderItem(recipe: Recipe) {
    return (
      <li key={recipe.id}>
        <article aria-labelledby={String(recipe.id)}>
          <Card
            title={<h2 id={String(recipe.id)}>{capitalize(recipe.name)}</h2>}
            img={
              <Image2
                srcs={[...(recipe?.imgs ?? []), ...(recipe?.food?.imgs ?? [])]}
              />
            }
            footer={
              <>
                <Button
                  type="button"
                  variant="tertiary"
                  size="small"
                  onClick={() => openDialogForRecipe(recipe.id)}
                >
                  adicionar em uma lista
                </Button>

                <Link
                  className="button button--small button--secondary"
                  href={`/recipe/${recipe.id}`}
                >
                  abrir receita
                </Link>
              </>
            }
          >
            <ul className="row no-gutters g-2">
              <li className="col-6">
                <strong>{translate('foodFormCalories', language)}</strong>
                <br />
                {(
                  (recipe.nutritionalInformation || []).find(
                    (n: any) =>
                      n?.shortName === 'Cal' ||
                      n?.name?.en === 'Calories' ||
                      n?.name?.pt === 'Calorias',
                  )?.quantity ?? 0
                ).toFixed(0)}
                cal
              </li>
              <li className="col-6">
                <strong>{translate('foodFormProteins', language)}</strong>
                <br />
                {(
                  (recipe.nutritionalInformation || []).find(
                    (n: any) =>
                      n?.shortName === 'Prot' ||
                      n?.name?.en === 'Proteins' ||
                      n?.name?.pt === 'Proteínas',
                  )?.quantity ?? 0
                ).toFixed(0)}
                g
              </li>
              <li className="col-6">
                <strong>{translate('foodFormFat', language)}</strong>
                <br />
                {(
                  (recipe.nutritionalInformation || []).find(
                    (n: any) =>
                      n?.shortName === 'Fat' ||
                      n?.name?.en === 'Total Fat' ||
                      n?.name?.pt === 'Gordura Total',
                  )?.quantity ?? 0
                ).toFixed(0)}
                g
              </li>
              <li className="col-6">
                <strong>{translate('foodFormDietaryFiber', language)}</strong>
                <br />
                {(
                  (recipe.nutritionalInformation || []).find(
                    (n: any) =>
                      n?.shortName === 'Fiber' ||
                      n?.name?.en === 'Dietary Fiber' ||
                      n?.name?.pt === 'Fibra Alimentar',
                  )?.quantity ?? 0
                ).toFixed(0)}
                g
              </li>
            </ul>
          </Card>
        </article>
      </li>
    );
  }

  function renderFood(food: Food): ReactElement | null {
    return (
      <ListItem
        key={food.id}
        isAction
        isActive={foodDialogOpen && selectedFood?.id === food.id}
        onClick={() => openFoodDialog(food)}
        icon={
          <Image2
            srcs={[...(food.icon ?? []), ...(food.imgs ?? [])]}
            alt=""
            transparent
          />
        }
      >
        {food.name[language]}
      </ListItem>
    );
  }

  return (
    <Layout2
      className="my-recipes-page"
      header={<Header2 />}
      navbar={
        <Navbar>
          <NavLink action="pop">
            <CiCircleChevLeft className="svg-icon" />
            página <br /> anterior
          </NavLink>
          <Link href="/search">
            <CiSearch className="svg-icon" />
            procurar <br /> receitas
          </Link>
          <Link href="/kitchen">
            <CiCirclePlus className="svg-icon" />
            nova <br /> receita
          </Link>
        </Navbar>
      }
    >
      <main className="py-5" style={{ paddingLeft: 29 }}>
        <Dialog
          open={dialogOpen}
          onClose={closeDialog}
          title="Adicionar em uma lista"
          actions={
            <div
              style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}
            >
              <Button variant="secondary" type="button" onClick={closeDialog}>
                fechar
              </Button>
            </div>
          }
        >
          {lists.length === 0 ? (
            <p>Nenhuma lista disponível.</p>
          ) : (
            <ul className="list">
              {lists.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    className="list-item"
                    onClick={async () => {
                      await handleAddRecipeToList(l.id);
                      closeDialog();
                    }}
                    disabled={adding}
                  >
                    {l.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Dialog>
        <FoodDialog
          open={foodDialogOpen}
          onClose={closeFoodDialog}
          food={selectedFood}
          actions={
            <div
              style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}
            >
              <Button variant="secondary" type="button" onClick={closeFoodDialog}>
                fechar
              </Button>
            </div>
          }
        />

        <NotebookTabs
          tabs={[
            {
              children: 'RECEITAS',
              href: '#recipes',
            },
            {
              children: 'LISTAS',
              href: '#lists',
            },
            {
              children: 'alimentos',
              href: '#foods',
            },
          ]}
        />

        <section
          className="grid"
          ovo-scrollspy-content="1"
          aria-labelledby="my-recipes-title"
          id="recipes"
        >
          <div className="g-col-12">
            <h1 className="h1" id="my-recipes-title">
              {translate('myRecipesHeading', language)}
            </h1>
          </div>

          <div className="g-col-12">
            <ol className="d-grid gap-4">{recipes.map(renderItem)}</ol>
          </div>

          <div className="g-col-12">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button as={Link} href="/kitchen">
                <CiCirclePlus />
                {translate('addNewRecipe', language)}
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-5" id="lists">
          <h2 className="h2 mb-3" style={{ marginBottom: 8 }}>
            Minhas listas
          </h2>

          {(recipeLists?.length ?? 0) === 0 && <p>Nenhuma lista criada.</p>}

          <ul>
            {(recipeLists ?? []).map((l) => (
              <li key={l.id} className="mt-4">
                <h3 className="section-title mb-3">{l.name}</h3>
                {l.description && (
                  <span style={{ opacity: 0.8 }}>{l.description}</span>
                )}

                {l.items?.length ? (
                  <ol className="horizontal-scroll">
                    {l.items.map((it) => renderItem(it.recipe))}
                  </ol>
                ) : null}

                <Button
                  className="mt-3"
                  variant="secondary"
                  type="button"
                  onClick={() => handleDeleteList(l.id)}
                >
                  Excluir lista
                  <br />
                  <small>mantém receitas</small>
                </Button>
              </li>
            ))}
          </ul>

          <div className="mt-4" style={{ display: 'flex', gap: 8 }}>
            <Button type="button" onClick={handleAddNewList}>
              adicionar nova lista
            </Button>
          </div>
        </section>

        {/* <MyRecipesClient initialLists={recipeLists} /> */}

        {/* <ShoppingList /> */}

        {showFoodsSection && (
          <section className="mt-5" id="foods" aria-labelledby="foods-title">
            <h2 className="section-title" id="foods-title">
              Alimentos usados em minhas receitas
            </h2>

            <p className="mt-3">Esta seção é para usuários mantenedores.</p>

            {foods.length > 0 && (
              <ol className="list mt-3">{foods.map(renderFood)}</ol>
            )}
          </section>
        )}

        <div className="d-flex justify-content-center mt-4">
          <NavLink action="pop" className="button button--secondary">
            <CiCircleChevLeft />
            voltar para página anterior
          </NavLink>
        </div>
      </main>
    </Layout2>
  );
};
