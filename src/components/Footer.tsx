import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{ background: '#313133', color: '#fff', fontSize: '0.8rem' }}>
            {/* Newsletter */}
            <div style={{ background: '#4a4a4b', padding: '2rem 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>NEW TO JSTORE?</h3>
                        <p style={{ color: '#ccc' }}>Subscribe to our newsletter to get updates on our latest offers!</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input type="email" placeholder="Enter E-mail Address" style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', width: '300px' }} />
                        <button style={{ background: '#fff', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', fontWeight: '700' }}>MALE</button>
                        <button style={{ background: '#fff', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', fontWeight: '700' }}>FEMALE</button>
                    </div>
                </div>
            </div>

            {/* Main Footer Links */}
            <div className="container" style={{ padding: '3rem 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
                <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '1rem' }}>NEED HELP?</h4>
                    <ul style={{ color: '#ccc', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li><Link href="/">Help Center</Link></li>
                        <li><Link href="/">Contact Us</Link></li>
                        <li><Link href="/">How to shop on JStore</Link></li>
                        <li><Link href="/">Delivery options</Link></li>
                        <li><Link href="/">Return Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '1rem' }}>ABOUT JSTORE</h4>
                    <ul style={{ color: '#ccc', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li><Link href="/">About us</Link></li>
                        <li><Link href="/">JStore careers</Link></li>
                        <li><Link href="/">Express Shipping</Link></li>
                        <li><Link href="/">Terms and Conditions</Link></li>
                        <li><Link href="/">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '1rem' }}>MAKE MONEY ON JSTORE</h4>
                    <ul style={{ color: '#ccc', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li><Link href="/sell">Sell on JStore</Link></li>
                        <li><Link href="/">Become a Sales Consultant</Link></li>
                        <li><Link href="/">Become a Logistics Service Partner</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '1rem' }}>JSTORE INTERNATIONAL</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', color: '#ccc' }}>
                        <span>Algeria</span>
                        <span>Ivory Coast</span>
                        <span>Egypt</span>
                        <span>Ghana</span>
                        <span>Kenya</span>
                        <span>Morocco</span>
                        <span>Nigeria</span>
                        <span>Senegal</span>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div style={{ borderTop: '1px solid #4a4a4b', padding: '1.5rem 0', textAlign: 'center', color: '#888', fontSize: '0.7rem' }}>
                © 2026 JStore Marketplace. All Rights Reserved.
            </div>
        </footer>
    );
}
