import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/ProductGrid";
import { notFound } from "next/navigation";

interface ShopPageProps {
  params: {
    slug: string;
  };
}

export default async function ShopPage({ params }: ShopPageProps) {
  // Ensure we wait for params in Next.js 15+
  const { slug } = await params;

  const seller = await prisma.user.findUnique({
    where: { shopSlug: slug },
    include: { products: true }
  });

  if (!seller) {
    notFound();
  }

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h4 className="uppercase text-gold" style={{ marginBottom: '1rem' }}>Artisan Collective</h4>
        <h1>{seller.shopName || `${seller.name}'s Shop`}</h1>
        <p style={{ color: '#666', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
          Welcome to {seller.shopName}. Explore our unique collection of handcrafted essentials.
        </p>
      </div>

      {seller.products.length > 0 ? (
        <ProductGrid products={seller.products} />
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
          <p>This artisan hasn't listed any pieces yet.</p>
        </div>
      )}
    </div>
  );
}
