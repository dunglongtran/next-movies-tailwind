import { test, expect } from '@playwright/test'

import { env } from '../../lib/env'

const { NEXT_PUBLIC_API_BASE_URL, API_KEY } = env

test.describe('/', () => {
  test('should have correct title', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Next Movies/)
  })

  test('should return http status 200 on /movies/popular api call', async ({
    page,
    request,
  }) => {
    await page.goto('http://localhost:3000')

    const movies = await request.get(
      `${NEXT_PUBLIC_API_BASE_URL}/movie/popular?api_key=${API_KEY}`
    )
    expect(movies.ok).toBeTruthy()
    expect(movies.status()).toBe(200)
  })

  test('should display correct movie titles', async ({ page, request }) => {
    await page.goto('http://localhost:3000')

    const res = await request.get(
      `${NEXT_PUBLIC_API_BASE_URL}/movie/popular?api_key=${API_KEY}`
    )
    const movies = await res.json()

    const movieList = await page.$('[data-testid="movies"]')
    expect(movieList).not.toBeNull()

    const movieItems = await movieList?.$('[data-testid="movie-link"]')
    if (Array.isArray(movieItems)) {
      expect(movieItems?.length).toEqual(movies.length)
      await Promise.all(
        movieItems.map(async (movieItem: any, i) => {
          const title = await movieItem.$('[data-testid="movie-title"]')
          expect(title).not.toBeNull()
          const titleText = await title.textContent()
          expect(titleText).toEqual(movies[i].title)
        })
      )
    }
  })
})
