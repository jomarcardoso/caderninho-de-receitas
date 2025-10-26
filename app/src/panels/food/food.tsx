import {
  type FC,
  type LegacyRef,
  forwardRef,
  useContext,
  useState,
  useEffect,
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
import RoleContext from '../../providers/role/role.context';

interface Props extends LayoutProps {
  food?: Food;
  quantity?: number;
  headerProps?: HeaderProps;
}

const FoodPanel: FC<Props> = forwardRef(
  ({ food, quantity = 100, headerProps, ...props }, ref) => {
    const { language } = useContext(LanguageContext);
    const { canEditFood } = useContext(RoleContext);
    const name = food?.name[language] ?? '';
    const [edit, setEdit] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const editTemplate = <FoodRegister food={food as any} />;

    // Consume permission from RoleContext
    useEffect(() => {
      setCanEdit(!!canEditFood);
    }, [canEditFood]);

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
              ...(canEdit
                ? [
                    {
                      onClick: () => setEdit(true),
                      icon: <IoCreateOutline />,
                      key: 'edit',
                    } as const,
                  ]
                : []),
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

