'use client'

import { useEffect, useState } from 'react'

const UAE_TIME_ZONE = 'Asia/Dubai'
const RESULT_HOUR = 15

function getUaeDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: UAE_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)

  return Object.fromEntries(
    parts
      .filter(({ type }) => type !== 'literal')
      .map(({ type, value }) => [type, Number(value)])
  ) as Record<string, number>
}

function getTimeUntilResults() {
  const now = new Date()
  const current = getUaeDateParts(now)
  const currentAsUaeWallClock = Date.UTC(
    current.year,
    current.month - 1,
    current.day,
    current.hour,
    current.minute,
    current.second
  )
  const resultTimeAsUaeWallClock = Date.UTC(
    current.year,
    current.month - 1,
    current.day,
    RESULT_HOUR
  )

  return resultTimeAsUaeWallClock - currentAsUaeWallClock
}

function formatCountdown(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':')
}

export function UaeSaudiBanner() {
  const [timeUntilResults, setTimeUntilResults] = useState<number | null>(null)

  useEffect(() => {
    const updateCountdown = () => setTimeUntilResults(getTimeUntilResults())
    updateCountdown()
    const interval = window.setInterval(updateCountdown, 1000)

    return () => window.clearInterval(interval)
  }, [])

  const resultsAreLive = timeUntilResults !== null && timeUntilResults <= 0

  return (
    <section
      aria-label="UAE versus Saudi Arabia results"
      className="border-b border-cyan-200/15 bg-gradient-to-r from-[#0b1c35] via-[#102d59] to-[#171a43] px-3 py-3 text-white sm:px-6 sm:py-4"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-center gap-3 sm:justify-start sm:gap-5">
          <div className="flex items-center gap-2">
            <img
              src="/country-flags-main/svg/ae.svg"
              alt="United Arab Emirates flag"
              className="h-8 w-12 rounded object-cover shadow-sm sm:h-10 sm:w-16"
            />
            <span className="text-sm font-semibold sm:text-base">UAE</span>
          </div>
          <span className="text-xs font-black uppercase tracking-[0.25em] text-cyan-200">vs</span>
          <div className="flex items-center gap-2">
            <img
              src="/country-flags-main/svg/sa.svg"
              alt="Saudi Arabia flag"
              className="h-8 w-12 rounded object-cover shadow-sm sm:h-10 sm:w-16"
            />
            <span className="text-sm font-semibold sm:text-base">Saudi Arabia</span>
          </div>
        </div>

        <div className="text-center sm:text-right">
          {resultsAreLive ? (
            <p className="text-lg font-bold text-emerald-300 sm:text-xl">UAE won!</p>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                Results at 3:00 PM UAE time
              </p>
              <p aria-live="polite" className="mt-1 font-mono text-2xl font-bold tabular-nums text-white sm:text-3xl">
                {timeUntilResults === null ? '--:--:--' : formatCountdown(timeUntilResults)}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
