import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Wrap Next.js cookies() to match Supabase SSR expected shape
export async function createServerSupabaseClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll: () =>
                    cookieStore.getAll().map(c => ({ name: c.name, value: c.value })),
                setAll: (cookiesArray) => {
                    cookiesArray.forEach(({ name, value, options }) => {
                        cookieStore.set({
                            name,
                            value,
                            path: options?.path,
                            httpOnly: options?.httpOnly,
                            secure: options?.secure,
                            sameSite: options?.sameSite,
                            maxAge: options?.maxAge,
                        })
                    })
                },
            },
        }
    )
}