import type { MovieResult } from '@/lib/types/data'

export const sortByDateDescending = <T extends MovieResult>(data: T[]) =>
  data.sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date))
