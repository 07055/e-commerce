import { createProduct } from '@/lib/actions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SellPage() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_token')?.value;

    if (!sessionId) {
        redirect('/login');
    }

    return (
        <div className="container" style={{ padding: '6rem 0', maxWidth: '600px' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h4 className="uppercase text-gold" style={{ marginBottom: '1rem' }}>Artisans</h4>
                <h1>List a New Piece</h1>
                <p style={{ color: '#666', marginTop: '1rem' }}>
                    Share your unique creations with our curated community of minimalist enthusiasts.
                </p>
            </div>

            <form action={createProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="name" className="uppercase" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="e.g. Marble Incense Burner"
                        style={{ padding: '1rem', border: '1px solid #eee', background: '#fdfdfd' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="price" className="uppercase" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Price ($)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            step="0.01"
                            required
                            placeholder="0.00"
                            style={{ padding: '1rem', border: '1px solid #eee', background: '#fdfdfd' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="stock" className="uppercase" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Stock</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            required
                            placeholder="1"
                            style={{ padding: '1rem', border: '1px solid #eee', background: '#fdfdfd' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="category" className="uppercase" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Category</label>
                    <select
                        id="category"
                        name="category"
                        required
                        style={{ padding: '1rem', border: '1px solid #eee', background: '#fdfdfd' }}
                    >
                        <option value="Ceramics">Ceramics</option>
                        <option value="Lighting">Lighting</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Glassware">Glassware</option>
                        <option value="Textiles">Textiles</option>
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="imageFile" className="uppercase" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Product Image</label>
                    <input
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        accept="image/*"
                        required
                        style={{ padding: '1rem', border: '1px solid #eee', background: '#fdfdfd' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="description" className="uppercase" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={5}
                        required
                        placeholder="Describe the materials, inspiration, and dimensions..."
                        style={{ padding: '1rem', border: '1px solid #eee', background: '#fdfdfd', resize: 'vertical' }}
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
                    List Product
                </button>
            </form>
        </div>
    );
}
