'use strict'
'use server'

import { prisma } from './prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { writeFile } from 'fs/promises'
import { cookies } from 'next/headers'
import path from 'path'

export async function loginUser(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user || user.password !== password) {
        throw new Error('Invalid credentials')
    }

    // Set a session cookie
    const cookieStore = await cookies()
    cookieStore.set('session_token', user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    })

    redirect('/')
}

export async function logoutUser() {
    const cookieStore = await cookies()
    cookieStore.delete('session_token')
    redirect('/')
}

export async function createProduct(formData: FormData) {
    const cookieStore = await cookies()
    const userId = cookieStore.get('session_token')?.value

    if (!userId) {
        redirect('/login')
    }

    // Checking if user is Admin (simplified for single store)
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (user?.role !== 'ADMIN') {
        throw new Error('Unauthorized')
    }

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const priceValue = formData.get('price') as string
    const stockValue = formData.get('stock') as string
    const category = formData.get('category') as string
    const imageFile = formData.get('imageFile') as File

    const price = parseFloat(priceValue)
    const stock = parseInt(stockValue)

    if (!name || !description || isNaN(price) || !imageFile) {
        throw new Error('Missing required fields')
    }

    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

    let imageUrl = ''
    try {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const filename = `${Date.now()}-${imageFile.name}`
        const uploadPath = path.join(process.cwd(), 'public', 'uploads', filename)
        await writeFile(uploadPath, buffer)
        imageUrl = `/uploads/${filename}`
    } catch (error) {
        console.error('File upload failed:', error)
        throw new Error('Failed to upload image')
    }

    try {
        await prisma.product.create({
            data: {
                name,
                slug,
                description,
                price,
                stock,
                category,
                images: imageUrl,
            }
        })
    } catch (error) {
        console.error('Failed to create product:', error)
        throw new Error('Database error')
    }

    revalidatePath('/shop')
    revalidatePath('/')
    redirect('/shop')
}
