export const formatReleaseDate = (releaseDate: Date | string) => {
  const date = new Date(releaseDate)

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  } satisfies Intl.DateTimeFormatOptions

  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export const formatMinutesToHour = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return `${hours}h${mins}min`
}
