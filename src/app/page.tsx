import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CategoryGrid from "@/components/CategoryGrid";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  let products: any[] = [];

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <Hero />

      <div className="container">
        <CategoryGrid />

        {/* Flash Sales Section */}
        <div className="section-card" style={{ padding: '0', overflow: 'hidden' }}>
          <h2 className="section-title">FLASH SALES</h2>
          <div style={{ padding: '1rem' }}>
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <p style={{ textAlign: 'center', padding: '2rem' }}>Loading deals...</p>
            )}
          </div>
        </div>

        {/* Top Picks Section */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>RECOMMENDED FOR YOU</h3>
            <a href="/shop" style={{ color: '#f68b1e', fontSize: '0.9rem', fontWeight: '700' }}>SEE ALL {'>'}</a>
          </div>
          <ProductGrid products={products.slice(0, 4)} />
        </div>
      </div>
    </div >
  );
}
