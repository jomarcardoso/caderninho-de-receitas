import {
  CiCircleChevLeft,
  CiCirclePlus,
  CiSearch,
  CiUser,
  CiViewList,
} from 'react-icons/ci';
import type { Metadata } from 'next';
import Link from 'next/link';
import { NavLink } from '@/components/nav-link/nav-link';
import { Layout2 } from '@/components/layout-2/layout-2';
import { Header2 } from '@/components/header-2/header-2';
import { Navbar } from '@/components/navbar/navbar';
import UserBox from '@/components/user-box/user-box';
import FoodBulkUploader from '@/components/food-bulk/food-bulk';
import AdminPendingRecipes from '@/components/admin-pending-recipes/admin-pending-recipes';

export const metadata: Metadata = {
  title: 'Usuário',
};

export default function UserPage() {
  return (
    <Layout2
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
          <Link href="/my-recipes">
            <CiViewList className="svg-icon" />
            minhas <br /> receitas
          </Link>
          <Link href="/kitchen">
            <CiCirclePlus className="svg-icon" />
            nova <br /> receita
          </Link>
        </Navbar>
      }
    >
      <main className="py-5">
        <section className="grid" aria-labelledby="user-title">
          <div className="g-col-12">
            <h1 className="section-title" id="user-title">
              Área do usuário
            </h1>
          </div>
          <div
            className="g-col-12"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ width: 360 }}>
              <UserBox />
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="grid">
            <div className="g-col-12">
              <FoodBulkUploader />
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="grid">
            <div className="g-col-12">
              <AdminPendingRecipes />
            </div>
          </div>
        </section>
      </main>
    </Layout2>
  );
}
