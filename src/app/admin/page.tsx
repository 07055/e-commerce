import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { createProduct, deleteProduct } from '@/lib/actions';
import ProductChart from '@/components/ProductChart';
import Link from 'next/link';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('session_token')?.value;

  if (!userId) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1>Access Denied</h1>
        <p>Please <a href="/login">login</a> to access the admin dashboard.</p>
      </div>
    );
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (user?.role !== 'ADMIN') {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1>Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  let products: any[] = [];
  let orders: any[] = [];
  try {
    products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { items: { include: { product: true } } }
    });
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'PAID')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Admin Dashboard</h1>
        <Link href="/orders" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>View All Orders</Link>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: '#f68b1e', color: 'white', padding: '1.5rem', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>Total Products</p>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>{products.length}</p>
        </div>
        <div style={{ background: '#1a1a1a', color: 'white', padding: '1.5rem', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>Total Orders</p>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>{orders.length}</p>
        </div>
        <div style={{ background: '#4CAF50', color: 'white', padding: '1.5rem', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>Revenue (Paid)</p>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>KSh {totalRevenue.toLocaleString()}</p>
        </div>
        <div style={{ background: '#2196F3', color: 'white', padding: '1.5rem', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>Pending Orders</p>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>{pendingOrders}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Recent Orders</h2>
        {orders.length === 0 ? (
          <p style={{ color: '#666' }}>No orders yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Order ID</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Customer</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Total</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Payment</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const statusColors: Record<string, string> = {
                    PENDING: '#f68b1e',
                    PROCESSING: '#2196F3',
                    SHIPPED: '#9C27B0',
                    DELIVERED: '#4CAF50',
                    CANCELLED: '#f44336',
                  };
                  const paymentColors: Record<string, string> = {
                    UNPAID: '#999',
                    PENDING: '#2196F3',
                    PAID: '#4CAF50',
                    FAILED: '#f44336',
                  };
                  return (
                    <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>{order.id.slice(-8).toUpperCase()}</td>
                      <td style={{ padding: '0.5rem' }}>{order.phone || 'Guest'}</td>
                      <td style={{ padding: '0.5rem', fontWeight: '700' }}>KSh {order.total.toLocaleString()}</td>
                      <td style={{ padding: '0.5rem' }}>
                        <span style={{ color: paymentColors[order.paymentStatus], fontWeight: '600' }}>{order.paymentStatus}</span>
                      </td>
                      <td style={{ padding: '0.5rem' }}>
                        <span style={{ color: statusColors[order.status], fontWeight: '600' }}>{order.status}</span>
                      </td>
                      <td style={{ padding: '0.5rem', color: '#666' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Add Product Form */}
        <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', position: 'sticky', top: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Add New Product</h2>

          <form action={createProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Product Name</label>
              <input type="text" name="name" required style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Description</label>
              <textarea name="description" required rows={3} style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Price (KSh)</label>
                <input type="number" name="price" step="0.01" required style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Stock</label>
                <input type="number" name="stock" defaultValue={0} required style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Category</label>
              <input type="text" name="category" required style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Product Image</label>
              <input type="file" name="imageFile" accept="image/*" required style={{ width: '100%' }} />
            </div>

            <button type="submit" style={{ background: '#f68b1e', color: 'white', padding: '0.8rem', border: 'none', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', marginTop: '0.5rem' }}>
              ADD PRODUCT
            </button>
          </form>
        </div>

        {/* Product List */}
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Your Products ({products.length})</h2>

          {products.length === 0 ? (
            <p style={{ color: '#666', padding: '2rem 0' }}>No products yet. Add your first product above.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {products.map((product) => (
                <div key={product.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#fff', border: '1px solid #eee', borderRadius: '8px', alignItems: 'center' }}>
                  <img src={product.images?.split(',')[0] || '/placeholder.jpg'} alt={product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{product.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>{product.category}</p>
                    <p style={{ fontSize: '1rem', fontWeight: '700', color: '#f68b1e' }}>KSh {product.price.toFixed(2)}</p>
                    <p style={{ fontSize: '0.75rem', color: '#999' }}>Stock: {product.stock}</p>
                  </div>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <button type="submit" style={{ background: '#ff4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem' }}>
                      Delete
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
