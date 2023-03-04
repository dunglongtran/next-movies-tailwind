type Genre = {
  id: number
  name: string
}

export type MovieResult = {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  genres: Array<Genre>
  vote_average: number
  vote_count: number
  release_date: string
  budget: number
  runtime: number
}

export type Person = {
  id: number
  name: string
  profile_path: string
}

export type CreditResult = {
  cast: Array<Person>
}

export type MovieData = {
  data: {
    results: Array<MovieResult>
  }
}
