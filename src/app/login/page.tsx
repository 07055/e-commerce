import { loginUser } from "@/lib/actions";

export default function LoginPage() {
    return (
        <div className="container" style={{ padding: '8rem 0', maxWidth: '400px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h4 className="uppercase text-gold" style={{ marginBottom: '1rem' }}>Access</h4>
                <h1>Admin Login</h1>
            </div>

            <form action={loginUser} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                    <label htmlFor="password" className="uppercase" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Password</label>
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
                    Sign In
                </button>
            </form>
        </div>
    );
}
