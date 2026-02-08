import Link from 'next/link';
import styles from './Header.module.css';
import { cookies } from 'next/headers';
import { logoutUser } from '@/lib/actions';
import CartCount from './CartCount';

export default async function Header() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_token')?.value;

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>📞 Call us: <strong>+254 700 123 456</strong> | Free delivery on millions of items</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/sell">Sell on JStore</Link>
            <span>Quality Guarantee</span>
          </div>
        </div>
      </div>

      <div className={`container ${styles.mainNav}`}>
        <div className={styles.logo}>
          <Link href="/">J<span>Store</span></Link>
        </div>

        <form className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search products, brands and categories"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn}>SEARCH</button>
        </form>

        <div className={styles.actions}>
          {sessionId ? (
            <div className={styles.actions}>
              <div className={styles.actionItem}>
                <span>Hi, Account</span>
                <form action={logoutUser} style={{ display: 'inline' }}>
                  <button type="submit" className={styles.logoutBtn} style={{ fontSize: '0.7rem', color: 'var(--jumia-orange)' }}>Logout</button>
                </form>
              </div>
            </div>
          ) : (
            <Link href="/login" className={styles.actionItem}>
              <span>Account</span>
            </Link>
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

