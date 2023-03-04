type Genre = {
  id: number
  name: string
}

export type Result = {
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

export type Data = {
  data: {
    results: Array<Result>
  }
}
