import Link from 'next/link';
import { Header2 } from '@/components/header-2/header-2';
import { Navbar } from '@/components/navbar/navbar';
import { Layout2 } from '@/components/layout-2/layout-2';
import { fetchApiJson } from '@/lib/api-server';

type UserProfile = {
  ownerId: string;
  displayName?: string;
  pictureUrl?: string;
  bio?: string;
};

export const metadata = { title: 'Autor' };

export default async function UserPublicPage({ params }: { params: { id: string } }) {
  const id = params.id;

  let profile: UserProfile | null = null;
  let featured: UserProfile[] = [];

  try {
    profile = await fetchApiJson<UserProfile>(`/api/users/${encodeURIComponent(id)}`);
  } catch {}
  try {
    featured = await fetchApiJson<UserProfile[]>(`/api/users/featured?quantity=6`);
  } catch {}

  return (
    <Layout2
      header={<Header2 />}
      navbar={
        <Navbar>
          <Link href="/">
            <ion-icon name="home-outline" />
          </Link>
        </Navbar>
      }
    >
      <main className="py-5">
        <section className="container" style={{ maxWidth: 920 }}>
          {profile ? (
            <article>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {profile.pictureUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={profile.displayName || profile.ownerId}
                    src={profile.pictureUrl}
                    width={64}
                    height={64}
                    style={{ borderRadius: '50%' }}
                  />
                ) : null}
                <div>
                  <h1 className="h1" style={{ margin: 0 }}>
                    {profile.displayName || 'Autor'}
                  </h1>
                  <div style={{ opacity: 0.7, fontSize: 14 }}>@{profile.ownerId}</div>
                </div>
              </div>
              {profile.bio && (
                <p style={{ marginTop: 12, opacity: 0.9 }}>{profile.bio}</p>
              )}
            </article>
          ) : (
            <p style={{ opacity: 0.7 }}>Autor não encontrado.</p>
          )}

          {featured.length > 0 && (
            <aside style={{ marginTop: 32 }}>
              <h2 className="h2" style={{ marginBottom: 12 }}>
                Autores em destaque
              </h2>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {featured.map((u) => (
                  <Link key={u.ownerId} href={`/user/${encodeURIComponent(u.ownerId)}`} style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {u.pictureUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt={u.displayName || u.ownerId}
                          src={u.pictureUrl}
                          width={36}
                          height={36}
                          style={{ borderRadius: '50%' }}
                        />
                      ) : null}
                      <span>{u.displayName || u.ownerId}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </section>
      </main>
    </Layout2>
  );
}

