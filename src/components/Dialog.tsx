import { Controller, useForm } from 'react-hook-form'

import type { MovieResult } from '@/lib/types/data'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Rating,
  Button,
  DialogActions,
} from '@mui/material'
import { z } from 'zod'

interface DialogWithRatingProps {
  movie: MovieResult
  open: boolean
  onClose: () => void
}

const ratingSchema = z.object({
  value: z.number().min(0.5).max(10),
})

type RatingValue = z.infer<typeof ratingSchema>

export const DialogWithRating = ({
  movie,
  open,
  onClose,
}: DialogWithRatingProps) => {
  const { control, handleSubmit } = useForm<RatingValue>({
    resolver: zodResolver(ratingSchema),
  })

  const rateMovie = async ({ value }: RatingValue) => {
    try {
      await fetch(`/api/movie?id=${movie.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onRate = async (values: RatingValue) => {
    await rateMovie(values)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Rate {movie.title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onRate)}>
          <Controller
            name="value"
            control={control}
            defaultValue={3}
            render={({ field }) => (
              <Rating
                name="value"
                precision={0.5}
                max={10}
                value={field.value}
                onChange={(_, newValue) => field.onChange(newValue)}
              />
            )}
          />
          <DialogActions>
            <Button type="submit">Rate</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}
