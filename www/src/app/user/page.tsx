import type { Metadata } from 'next';
import Link from 'next/link';
import { Layout2 } from '@/components/layout-2/layout-2';
import { Header2 } from '@/components/header-2/header-2';
import { Navbar } from '@/components/navbar/navbar';
import UserBox from '@/components/user-box/user-box';

export const metadata: Metadata = {
  title: 'Usuário',
};

export default function UserPage() {
  return (
    <Layout2
      header={<Header2 currentPage="user" />}
      navbar={
        <Navbar>
          <Link href="/">
            <ion-icon name="arrow-back-outline" />
          </Link>
          <Link href="/kitchen">
            <ion-icon name="add-circle-outline" />
          </Link>
          <Link href="/user">
            <ion-icon name="person-circle-outline" />
          </Link>
        </Navbar>
      }
    >
      <main className="py-5">
        <section className="grid" aria-labelledby="user-title">
          <div className="g-col-12">
            <h1 className="section-title" id="user-title">Área do usuário</h1>
          </div>
          <div className="g-col-12" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 360 }}>
              <UserBox />
            </div>
          </div>
        </section>
      </main>
    </Layout2>
  );
}

