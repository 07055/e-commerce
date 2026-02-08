import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={`container ${styles.hero}`}>
            <div className={styles.mainBanner}>
                <img
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000"
                    alt="Main Sale Banner"
                />
                <div className={styles.overlay}>
                    <h2>FLASH DEALS</h2>
                    <button className="btn-primary">SHOP NOW</button>
                </div>
            </div>

            <div className={styles.promoBanners}>
                <div className={styles.promo}>
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
                        alt="Promo 1"
                    />
                </div>
                <div className={styles.promo}>
                    <img
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"
                        alt="Promo 2"
                    />
                </div>
            </div>
        </section>
    );
}
