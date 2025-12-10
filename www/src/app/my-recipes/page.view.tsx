'use client';
import { CiCircleChevLeft, CiCirclePlus, CiSearch } from 'react-icons/ci';
import './page.scss';
// import MyRecipesClient from './ui/MyRecipes.client';
import { Layout2 } from '@/components/layout-2/layout-2';
import { Header2 } from '@/components/header-2/header-2';
import { Navbar } from '@/components/navbar/navbar';
import { Language } from '@/contexts/language';
import { translate } from '@common/services/language/language.service';
import { Button, Card, Field, NotebookTabs } from 'notebook-layout';
import { addRecipeToList } from '@/services/recipe-lists.service';
import Link from 'next/link';
import { NavLink } from '@/components/nav-link/nav-link';
import capitalize from 'lodash/capitalize';
import { Recipe, RecipesData } from '@common/services/recipe';
import {
  createRecipeList,
  deleteRecipeList,
} from '@/services/recipe-lists.service';
import {
  ChangeEventHandler,
  FC,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Image2 } from '@/components/image-2/image';
import { Dialog } from 'notebook-layout';
import { Food } from '@common/services/food/food.model';
import { ListItem } from '@/components/list-item/list-item';
import FoodDialog from '@/components/food-dialog/food-dialog';
import { scrollspy } from 'ovos';
import { searchFoods } from '@/services/food-search.api';

export interface MyRecipesViewProps {
  data: RecipesData;
  showFoodsSection?: boolean;
  isMobile?: boolean;
}

export const MyRecipesView: FC<MyRecipesViewProps> = ({
  data,
  showFoodsSection = false,
  isMobile = false,
}) => {
  // const showFoodsSection = false;
  const language: Language = 'pt';
  const { recipes, recipeLists, foods } = data;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [foodDialogOpen, setFoodDialogOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [foodSearchInput, setFoodSearchInput] = useState('');
  const [foodSearch, setFoodSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [searchingFoods, setSearchingFoods] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const lists = useMemo(() => recipeLists ?? [], [recipeLists]);
  const tabs = useMemo(() => {
    const items = [
      {
        children: 'RECEITAS',
        href: '#recipes',
        id: 'to-recipes',
      },
      {
        children: 'LISTAS',
        href: '#lists',
        id: 'to-lists',
      },
    ];

    if (showFoodsSection) {
      items.push({
        children: 'alimentos',
        href: '#foods',
        id: 'to-foods',
      });
    }

    return items;
  }, [showFoodsSection]);

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

  const handleFoodSearchChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setFoodSearchInput(event.target.value);
  };

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
      <article className="h-100" aria-labelledby={String(recipe.id)}>
        <Card
          className="h-100"
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

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    // Re-initialize scrollspy whenever sections change and clean up old listeners
    const controller = scrollspy({
      list: [
        {
          elMenu: document.querySelector('#to-recipes') as HTMLElement,
          elContent: document.querySelector('#recipes') as HTMLElement,
        },
        {
          elMenu: document.querySelector('#to-lists') as HTMLElement,
          elContent: document.querySelector('#lists') as HTMLElement,
        },
        {
          elMenu: document.querySelector('#to-foods') as HTMLElement,
          elContent: document.querySelector('#foods') as HTMLElement,
        },
      ],
    });

    return () => controller.destroy();
  }, [
    recipes.length,
    recipeLists?.length,
    foods.length,
    showFoodsSection,
    dialogOpen,
    selectedId,
    adding,
    foodDialogOpen,
    selectedFood,
    showFoodsSection,
    tabs,
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => setFoodSearch(foodSearchInput), 300);
    return () => clearTimeout(timeout);
  }, [foodSearchInput]);

  useEffect(() => {
    let cancelled = false;
    setSearchingFoods(true);
    setSearchError(null);

    (async () => {
      try {
        const list = await searchFoods(foodSearch.trim(), 25);
        if (cancelled) return;
        setSearchResults(Array.isArray(list) ? list : []);
      } catch (e: any) {
        if (cancelled) return;
        setSearchError('N�o foi poss�vel buscar alimentos agora.');
        setSearchResults([]);
      } finally {
        if (!cancelled) setSearchingFoods(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [foodSearch]);

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
      <main className="py-5">
        <Dialog
          open={dialogOpen}
          onClose={closeDialog}
          title="Adicionar em uma lista"
          actions={
            <Button
              variant="secondary"
              type="button"
              size="small"
              onClick={closeDialog}
            >
              <CiCircleChevLeft />
              fechar
            </Button>
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
        />

        {isMobile && (
          <div className="mobile-only">
            <NotebookTabs tabs={tabs} />
          </div>
        )}

        <section
          className="pt-2 grid"
          aria-labelledby="my-recipes-title"
          id="recipes"
        >
          <div className="g-col-12">
            <h1 className="h1 text-center" id="my-recipes-title">
              {translate('myRecipesHeading', language)}
            </h1>
          </div>

          <div className="g-col-12">
            {recipes.length ? (
              <ol className="row g-4 g-md-3">
                {recipes.map((recipe) => (
                  <li className="col-12 col-md-6" key={recipe.id}>
                    {renderItem(recipe)}
                  </li>
                ))}
              </ol>
            ) : (
              <div className="d-flex justify-content-center">
                <Image2
                  srcs={['/logo.png']}
                  style={{ maxWidth: 200 }}
                  alt="Ícone do app"
                />
              </div>
            )}
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

        <section className="pt-2 mt-5" id="lists">
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
                    {l.items.map((it) => (
                      <li key={it.recipe.id}>{renderItem(it.recipe)}</li>
                    ))}
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
          <section
            className="pt-2 mt-5"
            id="foods"
            aria-labelledby="foods-title"
          >
            <h2 className="section-title" id="foods-title">
              Alimentos usados em minhas receitas
            </h2>

            <p className="mt-3">Esta seção é para usuários mantenedores.</p>

            {foods.length > 0 && (
              <ol className="list mt-3">{foods.map(renderFood)}</ol>
            )}

            {foods.length === 0 && (
              <p className="mt-3" style={{ opacity: 0.7 }}>
                Nenhum alimento encontrado nas receitas.
              </p>
            )}

            <div className="mt-4">
              <Field
                placeholder={translate('searchPlaceholder', language)}
                label="Buscar alimento (nome ou palavra-chave)"
                value={foodSearchInput}
                onChange={handleFoodSearchChange}
                onErase={() => setFoodSearchInput('')}
                breakline={false}
                type="search"
              />
            </div>

            {searchingFoods && (
              <p className="mt-3" style={{ opacity: 0.7 }}>
                Buscando alimentos...
              </p>
            )}

            {searchError && (
              <p className="mt-3" style={{ color: '#b22' }}>
                {searchError}
              </p>
            )}

            {foodSearch && !searchingFoods && searchResults.length > 0 && (
              <div className="mt-4">
                <h3 className="section-title">Resultados adicionais</h3>
                <ol className="list mt-2">{searchResults.map(renderFood)}</ol>
              </div>
            )}

            {foodSearch && !searchingFoods && searchResults.length === 0 && (
              <p className="mt-3" style={{ opacity: 0.7 }}>
                Nenhum alimento encontrado para esta busca.
              </p>
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
