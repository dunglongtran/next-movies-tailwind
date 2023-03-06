import type { MovieResult } from '@/lib/types/data'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  watchList: Array<MovieResult>
  hasMovieBeenAddedToWithList: (id: number) => boolean
  addMovie: (movie: MovieResult) => void
  removeMovie: (id: number) => void
  toggleMoviePresenceInWishList: (movie: MovieResult) => void
}

export const useMovieStore = create(
  persist<State>(
    (set, get) => ({
      watchList: [],
      hasMovieBeenAddedToWithList: (id) => {
        const wishList = get().watchList
        return wishList.some((movie) => movie.id === id)
      },
      addMovie: (movie) =>
        set((state) => ({
          watchList: [...state.watchList, movie],
        })),
      removeMovie: (id) =>
        set((state) => ({
          watchList: state.watchList.filter((movie) => movie.id !== id),
        })),
      toggleMoviePresenceInWishList: (movie) => {
        const isAdded = get().hasMovieBeenAddedToWithList(movie.id)
        if (isAdded) {
          get().removeMovie(movie.id)
        } else {
          get().addMovie(movie)
        }
      },
    }),
    {
      name: '@movies',
    }
  )
)
