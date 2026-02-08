import { registerUser } from '@/lib/actions';

export default function RegisterPage() {
    return (
        <div className="container" style={{ padding: '6rem 0', maxWidth: '400px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h4 className="uppercase text-gold" style={{ marginBottom: '1rem' }}>Join the Collective</h4>
                <h1>Artisan Registration</h1>
            </div>

            <form action={registerUser} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="name" className="uppercase" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        style={{ padding: '1rem', border: '1px solid #eee', background: '#fdfdfd' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="email" className="uppercase" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        style={{ padding: '1rem', border: '1px solid #eee', background: '#fdfdfd' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="shopName" className="uppercase" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Shop Name (Optional)</label>
                    <input
                        type="text"
                        id="shopName"
                        name="shopName"
                        style={{ padding: '1rem', border: '1px solid #eee', background: '#fdfdfd' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="password" name="password" className="uppercase" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        style={{ padding: '1rem', border: '1px solid #eee', background: '#fdfdfd' }}
                    />
                </div>

                <button
                    type="submit"
                    className="uppercase"
                    style={{
                        marginTop: '1rem',
                        background: '#1a1a1a',
                        color: 'white',
                        padding: '1.25rem',
                        border: 'none',
                        fontWeight: 'bold',
                        letterSpacing: '0.1em',
                        cursor: 'pointer'
                    }}
                >
                    Create Account
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
                    Already an artisan? <a href="/login">Sign In</a>
                </p>
            </form>
        </div>
    );
}
