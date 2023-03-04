import { z } from 'zod'

const schema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  API_KEY: z.string().min(32),
})

const parsed = schema.safeParse(process.env)

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables: ',
    JSON.stringify(parsed.error.format(), null, 2)
  )
  process.exit(1)
}

export const env = parsed.data
