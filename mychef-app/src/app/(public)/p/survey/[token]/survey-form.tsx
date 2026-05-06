'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Tables } from '@/types/database'

interface SurveyFormProps {
  bookingId: string
  token: string
  questions: Tables<'survey_questions'>[]
}

export function SurveyForm({ bookingId, token, questions }: SurveyFormProps) {
  const supabase = createClient()
  const [answers, setAnswers] = useState<Record<string, { score?: number; text?: string }>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function setScore(questionId: string, score: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: { ...prev[questionId], score } }))
  }

  function setText(questionId: string, text: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: { ...prev[questionId], text } }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const { data: response, error: respError } = await supabase
      .from('survey_responses')
      .insert({
        booking_id: bookingId,
        token,
        token_used: true,
        submitted_at: new Date().toISOString(),
      } as any)
      .select('id')
      .single() as any

    if (respError || !response) {
      setError('Failed to submit survey. Please try again.')
      setSubmitting(false)
      return
    }

    const payload = Object.entries(answers).map(([questionId, ans]) => ({
      response_id: response.id,
      question_id: questionId,
      score: ans.score ?? null,
      text_answer: ans.text ?? null,
    }))

    const { error: ansError } = await supabase.from('survey_answers').insert(payload as any)

    if (ansError) {
      setError('Failed to save answers. Please try again.')
      setSubmitting(false)
      return
    }

    await (supabase.from('bookings') as any).update({ survey_token: null }).eq('id', bookingId)

    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-xl font-medium text-success">Thank You!</h2>
        <p className="mt-4 text-text-muted">Your feedback helps us create better experiences.</p>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions.map((q) => (
        <Card key={q.id} className="p-5">
          <p className="font-medium text-text-primary">
            {q.question_text}
            {q.is_required && <span className="ml-1 text-error">*</span>}
          </p>

          {q.type === 'score_1_5' && (
            <div className="mt-4 flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <Button
                  key={score}
                  type="button"
                  variant={answers[q.id]?.score === score ? 'primary' : 'secondary'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setScore(q.id, score)}
                >
                  {score}
                </Button>
              ))}
            </div>
          )}

          {q.type === 'open_text' && (
            <div className="mt-4">
              <textarea
                rows={3}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Your answer..."
                value={answers[q.id]?.text || ''}
                onChange={(e) => setText(q.id, e.target.value)}
              />
            </div>
          )}
        </Card>
      ))}

      {error && <p className="text-center text-sm text-error">{error}</p>}

      <Button type="submit" isLoading={submitting} className="w-full">
        Submit Feedback
      </Button>
    </form>
  )
}
