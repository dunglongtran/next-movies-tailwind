import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { env } from '@/lib/env'
import { useHasHydrated } from '@/lib/hooks/hydration'
import type { MovieData } from '@/lib/types/data'
import { useMovieStore } from '@/store'
import { cn } from '@/utils/classNames'
import { shimmer, toBase64 } from '@/utils/shimmer'
import { sortByDateDescending } from '@/utils/sort'
import { formatReleaseDate } from '@/utils/time'
import { StarRateRounded } from '@mui/icons-material'
import { Grid, Stack, Typography } from '@mui/material'
import { wrapper } from '@/lib/store'
import { getPokemonByName, getPokemonList, getRunningQueriesThunk, useGetPokemonListQuery } from '@/lib/pokemonApi'
import { useAppSelector } from '../lib/hooks'

const Home = ({ data,value }: MovieData) => {
  const hasHydrated = useHasHydrated()
  const watchList = useMovieStore((state) => state.watchList)
  const sortedMoviesByDate = sortByDateDescending(data.results)
  const state = useAppSelector((state) => state)
  const result = useGetPokemonListQuery()
  console.log('state', state,value, result)
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
      {
       result.isSuccess && result.data.results.map(item=><a key={item.name}>{item.name}</a>)
      }
      <Typography variant="h6" component="h2" gutterBottom mt={4}>
        <span role="img" aria-label="Watch List">
          🎞️
        </span>
        Watch List
      </Typography>
      {hasHydrated && watchList.length ? (
        <Grid container columns={{ xs: 1, md: 6 }} spacing={2}>
          {watchList.map((movie) => (
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
                  variant="body2"
                  noWrap
                  component="h3"
                >
                  {movie.title}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography
                    className="inline-flex items-center space-x-1"
                    variant="body2"
                  >
                    <StarRateRounded
                      className="text-[#D9A931]"
                      sx={{ fontSize: 16 }}
                    />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </Typography>
                  <Typography variant="body2">
                    {formatReleaseDate(movie.release_date)}
                  </Typography>
                </Stack>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" gutterBottom>
          You haven&apos;t added any titles to your list yet.
        </Typography>
      )}
      <Typography variant="h6" component="h2" gutterBottom mt={4}>
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
                variant="body2"
                noWrap
                component="h3"
              >
                {movie.title}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography
                  className="inline-flex items-center space-x-1"
                  variant="body2"
                >
                  <StarRateRounded
                    className="text-[#D9A931]"
                    sx={{ fontSize: 16 }}
                  />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </Typography>
                <Typography variant="body2">
                  {formatReleaseDate(movie.release_date)}
                </Typography>
              </Stack>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

const { NEXT_PUBLIC_API_BASE_URL, API_KEY } = env

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const name = context.query?.name
    // if (typeof name === 'string') {
    //   store.dispatch(getPokemonByName.initiate(name,{forceRefetch:true,subscribe:false}))
    // }
      store.dispatch(getPokemonList.initiate())
    const value= await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const res = await fetch(
      `${NEXT_PUBLIC_API_BASE_URL}/movie/popular?api_key=${API_KEY}`
    )
    const data = await res.json()
    return {
      props: {
        data,
        value,
      },
    }
  })

export default Home
