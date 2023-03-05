import type { MovieResult } from '@/lib/types/data'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  wishList: Array<MovieResult>
  hasMovieBeenAddedToWithList: (id: number) => boolean
  addMovie: (movie: MovieResult) => void
  removeMovie: (id: number) => void
  toggleMoviePresenceInWishList: (movie: MovieResult) => void
  rateMovie: (id: number, rating: number) => void
}

export const useMovieStore = create(
  persist<State>(
    (set, get) => ({
      wishList: [],
      hasMovieBeenAddedToWithList: (id) => {
        const wishList = get().wishList
        return wishList.some((movie) => movie.id === id)
      },
      addMovie: (movie) =>
        set((state) => ({
          wishList: [...state.wishList, movie],
        })),
      removeMovie: (id) =>
        set((state) => ({
          wishList: state.wishList.filter((movie) => movie.id !== id),
        })),
      toggleMoviePresenceInWishList: (movie) => {
        const isAdded = get().hasMovieBeenAddedToWithList(movie.id)
        if (isAdded) {
          get().removeMovie(movie.id)
        } else {
          get().addMovie(movie)
        }
      },
      rateMovie: (id, rating) =>
        set((state) => ({
          wishList: state.wishList.map((movie) =>
            movie.id === id ? { ...movie, rating } : movie
          ),
        })),
    }),
    {
      name: '@movies',
    }
  )
)
