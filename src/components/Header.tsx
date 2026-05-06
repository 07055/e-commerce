import Link from 'next/link';
import styles from './Header.module.css';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { logoutUser } from '@/lib/actions';
import CartCount from './CartCount';

export default async function Header() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_token')?.value;

  let user: any = null;
  if (sessionId) {
    user = await prisma.user.findUnique({ where: { id: sessionId } });
  }

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>📞 Call us: <strong>+254 796 388 790</strong> | Free delivery on orders above KSh 5,000</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Quality Guarantee</span>
            <a href="https://wa.me/254796388790" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: '600' }}>💬 WhatsApp</a>
          </div>
        </div>
      </div>

      <div className={`container ${styles.mainNav}`}>
        <div className={styles.logo}>
          <Link href="/">SS<span>M</span></Link>
        </div>

        <form action="/shop" className={styles.searchForm}>
          <input
            type="text"
            name="q"
            placeholder="Search products, brands and categories"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn}>SEARCH</button>
        </form>

        <div className={styles.actions}>
          {user ? (
            <div className={styles.actionItem}>
              <span>Hi, {user.name || user.email}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link href="/orders" style={{ fontSize: '0.7rem', color: 'var(--jumia-orange)' }}>Orders</Link>
                {user.role === 'ADMIN' && (
                  <Link href="/admin" style={{ fontSize: '0.7rem', color: 'var(--jumia-orange)' }}>Dashboard</Link>
                )}
                <form action={logoutUser} style={{ display: 'inline' }}>
                  <button type="submit" className={styles.logoutBtn} style={{ fontSize: '0.7rem', color: 'var(--jumia-orange)' }}>Logout</button>
                </form>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/login" className={styles.actionItem}>
                <span>Sign In</span>
              </Link>
              <Link href="/register" className={styles.actionItem} style={{ color: 'var(--jumia-orange)' }}>
                <span>Register</span>
              </Link>
            </div>
          )}

          <Link href="/cart" className={styles.actionItem}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>Cart</span>
              <CartCount />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
