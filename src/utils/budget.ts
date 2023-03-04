export const abbreviateBudget = (budget: number) => {
  if (budget === 0) return '0'

  const abbreviations = ['K', 'M', 'B', 'T']
  const magnitude = Math.floor(Math.log10(budget))
  const abbreviationIndex = Math.floor((magnitude - 1) / 3)
  const abbreviation = abbreviations[abbreviationIndex] || ''
  const divisor = Math.pow(10, abbreviationIndex * 3)
  const quotient = Math.floor(budget / divisor)
  const remainder = budget % divisor
  let formattedNum = quotient.toString()
  if (remainder > 0) {
    const decimalPlaces = Math.max(0, 1 - Math.floor(Math.log10(remainder)))
    const decimalString = remainder.toFixed(decimalPlaces).slice(2)
    formattedNum += `.${decimalString}`
  }

  return `${formattedNum}${abbreviation}`
}

