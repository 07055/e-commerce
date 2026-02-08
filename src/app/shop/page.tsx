import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/prisma";

export default async function ShopPage() {
    let products: any[] = [];

    try {
        products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
        console.log('[ShopPage] Fetched products:', products.length);
    } catch (error) {
        console.error("[ShopPage] Failed to fetch products:", error);
    }

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h4 className="uppercase text-gold" style={{ marginBottom: '1rem' }}>Collection</h4>
                <h1>Shop All Items</h1>
            </div>

            {products.length > 0 ? (
                <ProductGrid products={products} />
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
                    <p>No products available yet.</p>
                </div>
            )}
        </div>
    );
}
