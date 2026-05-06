import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{ background: '#313133', color: '#fff', fontSize: '0.8rem' }}>
            <div className="container" style={{ padding: '3rem 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
                <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '1rem', color: '#f68b1e' }}>SSM</h4>
                    <p style={{ color: '#ccc', lineHeight: '1.6' }}>Sam's Suma Mart - Your trusted online store for quality products at the best prices.</p>
                    <div style={{ marginTop: '1rem' }}>
                        <a href="https://wa.me/254796388790" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: '600' }}>💬 WhatsApp: 0796 388 790</a>
                    </div>
                </div>

                <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '1rem' }}>NEED HELP?</h4>
                    <ul style={{ color: '#ccc', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li><Link href="/">Help Center</Link></li>
                        <li><a href="https://wa.me/254796388790" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
                        <li><Link href="/">How to shop on SSM</Link></li>
                        <li><Link href="/">Delivery options</Link></li>
                        <li><Link href="/">Return Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '1rem' }}>PAYMENT METHODS</h4>
                    <ul style={{ color: '#ccc', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li>📱 M-Pesa (via Paystack)</li>
                        <li>💳 Visa / Mastercard</li>
                        <li>🏦 Bank Transfer</li>
                        <li>💵 Cash on Delivery</li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '1rem' }}>MY ACCOUNT</h4>
                    <ul style={{ color: '#ccc', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li><Link href="/login">Sign In</Link></li>
                        <li><Link href="/register">Create Account</Link></li>
                        <li><Link href="/orders">My Orders</Link></li>
                        <li><Link href="/cart">My Cart</Link></li>
                    </ul>
                </div>
            </div>

            <div style={{ borderTop: '1px solid #4a4a4b', padding: '1.5rem 0', textAlign: 'center', color: '#888', fontSize: '0.7rem' }}>
                © 2026 Sam's Suma Mart (SSM). All Rights Reserved.
            </div>
        </footer>
    );
}
