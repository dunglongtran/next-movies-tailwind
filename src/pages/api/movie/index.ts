import type { NextApiResponse, NextApiRequest } from 'next'

import { env } from '@/lib/env'

const { NEXT_PUBLIC_API_BASE_URL, API_KEY } = env

const createGuestSession = async () => {
  const url = `${NEXT_PUBLIC_API_BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`
  const response = await fetch(url)
  const data = (await response.json()) as { guest_session_id: string }
  return data.guest_session_id
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const guestSessionId = await createGuestSession()
      const response = await fetch(
        `${NEXT_PUBLIC_API_BASE_URL}/movie/${req.query.id}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            charset: 'utf-8',
          },
          body: JSON.stringify(req.body),
        }
      )
      const data = await response.json()
      return res.status(201).json(data)
    } catch (error) {
      return res.status(422).json(error)
    }
  } else {
    return res.send('Method not allowed')
  }
}

export default handler
