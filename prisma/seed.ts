import "dotenv/config"
import { prisma } from "../src/lib/prisma"

async function main() {
    const products = [
        {
            name: 'Onyx Vessel',
            slug: 'onyx-vessel',
            description: 'A hand-carved vessel made from a single block of black onyx. Perfect for minimalist settings.',
            price: 450.00,
            stock: 12,
            images: 'https://images.unsplash.com/photo-1578500438901-7fa76fb47509', // Placeholder high-quality URL
            category: 'Ceramics',
            featured: true,
        },
        {
            name: 'Alabaster Lamp',
            slug: 'alabaster-lamp',
            description: 'Soft lighting diffused through genuine Italian alabaster. A statement piece for any lounge.',
            price: 890.00,
            stock: 5,
            images: 'https://images.unsplash.com/photo-1542728928-1413d1894ed1',
            category: 'Lighting',
            featured: true,
        },
        {
            name: 'Bronze Sculpture I',
            slug: 'bronze-sculpture-1',
            description: 'Abstract form cast in heavy bronze with a hand-applied patina.',
            price: 1200.00,
            stock: 3,
            images: 'https://images.unsplash.com/photo-1554188248-986adbb73be4',
            category: 'Art',
            featured: false,
        }
    ]

    console.log('Start seeding...')
    for (const p of products) {
        const product = await prisma.product.upsert({
            where: { slug: p.slug },
            update: {},
            create: p,
        })
        console.log(`Created product with id: ${product.id}`)
    }
    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
