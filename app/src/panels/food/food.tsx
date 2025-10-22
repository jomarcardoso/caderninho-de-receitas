import {
  type FC,
  type LegacyRef,
  forwardRef,
  useContext,
  useState,
} from 'react';
import Layout, { type LayoutProps } from '../../components/layout/layout';
import FoodDetailed from '../../components/food-detailed/food-detailed';
import Header, { type HeaderProps } from '../../components/header/header';
import './food.scss';
import { FoodRegister } from '../../components/food-register/food-register';
import { IoCreateOutline } from 'react-icons/io5';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from 'services/language/language.service';
import type { Food } from 'services/food/food.model';

interface Props extends LayoutProps {
  food?: Food;
  quantity?: number;
  headerProps?: HeaderProps;
}

const FoodPanel: FC<Props> = forwardRef(
  ({ food, quantity = 100, headerProps, ...props }, ref) => {
    const { language } = useContext(LanguageContext);
    const name = food?.name[language] ?? '';
    const [edit, setEdit] = useState(false);
    const editTemplate = <FoodRegister food={food as any} />;

    return (
      <div>
        <Header
          pageName={`${name} (${quantity}${
            food?.type.en === 'liquid' || food?.type.en === 'oil' ? 'ml' : 'g'
          })`}
          {...headerProps}
        />
        <Layout
          ref={ref as LegacyRef<HTMLDivElement>}
          className="food"
          mainProps={{
            style: { marginTop: 0 },
          }}
          {...props}
          footerProps={{
            items: [
              // {
              //   onClick: memoizedhandleNewRecipe,
              //   icon: <IoAddCircleOutline />,
              //   key: 'add',
              // },
              {
                // hidden: (currentRecipe?.id ?? 0) < 10000,
                onClick: () => setEdit(true),
                icon: <IoCreateOutline />,
                key: 'edit',
              },
              // {
              //   hidden: (currentRecipe?.id ?? 0) < 10000,
              //   onClick: handleShare,
              //   icon: <IoShareOutline />,
              //   key: 'share',
              // },
              // {
              //   hidden: (currentRecipe?.id ?? 0) < 10000,
              //   onClick: handleClickRemove,
              //   icon: <IoTrashOutline />,
              //   key: 'remove',
              // },
            ],
          }}
        >
          {edit ? editTemplate : <FoodDetailed food={food} />}
        </Layout>
      </div>
    );
  },
);

export default FoodPanel;

