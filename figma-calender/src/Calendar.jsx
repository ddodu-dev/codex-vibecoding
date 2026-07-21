import { useMemo, useState } from 'react'

const DAY_LABELS = ['m', 't', 'w', 't', 'f', 's', 's']

const EVENTS = {
  '2024-01-02': {
    today: [
      ['Daily Standup', '08:00', 'mint'],
      ['Budget Review', '09:00', 'red'],
      ['Sasha Jay 121', '10:00', 'yellow'],
      ['Web Team Progress Update', '11:00', 'green'],
      ['Social team briefing', '12:00', 'soft-green'],
    ],
    tomorrow: [
      ['Daily Standup', '13:00', 'soft-green'],
      ['Tech Standup', '14:00', 'purple'],
      ['Developer Progress', '15:00', 'blue'],
    ],
    vacations: [['Bahamas', '01-02 to 14-02', 'soft-green']],
  },
}

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function monthCells(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const offset = firstDay === 0 ? 6 : firstDay - 1
  const days = new Date(year, month + 1, 0).getDate()
  const previousDays = new Date(year, month, 0).getDate()

  return Array.from({ length: 42 }, (_, index) => {
    const day = index - offset + 1
    if (day < 1) return { day: previousDays + day, monthOffset: -1 }
    if (day > days) return { day: day - days, monthOffset: 1 }
    return { day, monthOffset: 0 }
  })
}

function EventGroup({ icon, title, items }) {
  return (
    <section className="event-group">
      <h2><span aria-hidden="true">{icon}</span>{title}</h2>
      <div className="event-list">
        {items.map(([name, time, color]) => (
          <div className="event-row" key={`${name}-${time}`}>
            <span className={`event-name ${color}`}><i />{name}</span>
            <time>{time}</time>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Calendar({ initialDate = new Date(2024, 0, 2), events = EVENTS }) {
  const [visibleDate, setVisibleDate] = useState(initialDate)
  const [selectedDay, setSelectedDay] = useState(initialDate.getDate())
  const year = visibleDate.getFullYear()
  const month = visibleDate.getMonth()
  const cells = useMemo(() => monthCells(year, month), [year, month])
  const selectedEvents = events[dateKey(year, month, selectedDay)]
  const monthName = new Intl.DateTimeFormat('en', { month: 'long' }).format(visibleDate)

  function moveMonth(amount) {
    const next = new Date(year, month + amount, 1)
    setVisibleDate(next)
    setSelectedDay(1)
  }

  return (
    <aside className="calendar" aria-label="Calendar sidebar">
      <header className="month-header">
        <button onClick={() => moveMonth(-1)} aria-label="Previous month">‹</button>
        <h1>{monthName}</h1>
        <button onClick={() => moveMonth(1)} aria-label="Next month">›</button>
      </header>

      <div className="month-grid" role="grid" aria-label={`${monthName} ${year}`}>
        {DAY_LABELS.map((label, index) => <span className="day-label" key={`${label}-${index}`}>{label}</span>)}
        {cells.map((cell, index) => {
          const selected = cell.monthOffset === 0 && cell.day === selectedDay
          return (
            <button
              className={`day ${cell.monthOffset ? 'muted' : ''} ${selected ? 'selected' : ''}`}
              key={`${cell.monthOffset}-${cell.day}-${index}`}
              disabled={cell.monthOffset !== 0}
              aria-pressed={selected}
              onClick={() => setSelectedDay(cell.day)}
            >
              {String(cell.day).padStart(2, '0')}
            </button>
          )
        })}
      </div>

      {selectedEvents ? (
        <div className="agenda">
          <EventGroup icon="🗓️" title="Today" items={selectedEvents.today} />
          <EventGroup icon="🗓️" title="Tomorrow" items={selectedEvents.tomorrow} />
          <EventGroup icon="✈️" title="Vacations" items={selectedEvents.vacations} />
        </div>
      ) : (
        <section className="empty-state">
          <h2>Upcoming events</h2>
          <div className="empty-message">
            <span aria-hidden="true">🎉</span>
            <p>No upcoming events</p>
          </div>
        </section>
      )}
    </aside>
  )
}
