import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { env } from '@/lib/env'
import type { Data } from '@/lib/types/data'
import { cn } from '@/utils/classNames'
import { shimmer, toBase64 } from '@/utils/shimmer'
import { sortByDateDescending } from '@/utils/sort'
import { Container, Grid, Typography } from '@mui/material'

const Home = ({ data }: Data) => {
  const sortedMoviesByDate = sortByDateDescending(data.results)

  return (
    <>
      <Head>
        <title>Next Movies</title>
        <meta
          name="description"
          content="Next Movies: The best place to find what you want to watch"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Typography variant="h6" component="h2" gutterBottom>
          <span role="img" aria-label="Trending">
            🔥
          </span>
          Trending Now
        </Typography>
        <Grid
          data-testid="movies"
          container
          columns={{ xs: 1, md: 6 }}
          spacing={2}
        >
          {sortedMoviesByDate.map((movie) => (
            <Grid key={movie.id} item xs={6} md={1} zeroMinWidth>
              <Link data-testid="movie-link" href={`/movie/${movie.id}`}>
                <div className="relative aspect-[9/16] h-full max-h-64 w-full overflow-hidden rounded-2xl md:max-w-[200px]">
                  <Image
                    className={cn(
                      'object-cover',
                      'transition-all duration-500 hover:scale-105 active:scale-100'
                    )}
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(96, 96)
                    )}`}
                  />
                </div>
                <Typography
                  data-testid="movie-title"
                  mt={1}
                  variant="body1"
                  noWrap
                  component="h3"
                >
                  {movie.title}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

const { NEXT_PUBLIC_API_BASE_URL, API_KEY } = env

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}/movie/popular?api_key=${API_KEY}`
  )
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}

export default Home
