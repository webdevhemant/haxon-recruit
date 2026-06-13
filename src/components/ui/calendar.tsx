import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { addMonths, setMonth, setYear } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function HeaderSelect({
  value,
  onChange,
  children,
  className,
}: {
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('relative', className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-full cursor-pointer appearance-none rounded-md border border-input bg-popover pl-2.5 pr-7 text-sm font-medium outline-none transition-colors hover:bg-secondary focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 opacity-50" />
    </div>
  )
}

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const today = new Date()
  const selectedDate =
    'selected' in props && props.selected instanceof Date
      ? props.selected
      : undefined
  const [month, setMonthState] = useState<Date>(
    props.defaultMonth ?? selectedDate ?? today,
  )

  const years = Array.from({ length: 8 }, (_, i) => today.getFullYear() - 2 + i)

  return (
    <div className={cn('p-3', className)}>
      <div className="mb-3 flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="size-8 shrink-0"
          onClick={() => setMonthState((m) => addMonths(m, -1))}
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <HeaderSelect
          className="flex-1"
          value={String(month.getMonth())}
          onChange={(v) => setMonthState((m) => setMonth(m, Number(v)))}
        >
          {MONTHS.map((label, i) => (
            <option key={label} value={i}>
              {label}
            </option>
          ))}
        </HeaderSelect>

        <HeaderSelect
          className="w-[5.25rem]"
          value={String(month.getFullYear())}
          onChange={(v) => setMonthState((m) => setYear(m, Number(v)))}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </HeaderSelect>

        <Button
          variant="outline"
          size="icon"
          className="size-8 shrink-0"
          onClick={() => setMonthState((m) => addMonths(m, 1))}
          aria-label="Next month"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <DayPicker
        month={month}
        onMonthChange={setMonthState}
        showOutsideDays={showOutsideDays}
        hideNavigation
        classNames={{
          months: 'flex flex-col items-center',
          month: 'flex w-full flex-col items-center gap-3',
          month_caption: 'hidden',
          month_grid: 'mx-auto border-collapse',
          weekdays: 'flex',
          weekday: 'w-9 text-[0.8rem] font-normal text-muted-foreground',
          week: 'mt-1.5 flex w-full',
          day: 'relative p-0 text-center text-sm',
          day_button: cn(
            buttonVariants({ variant: 'ghost' }),
            'size-9 p-0 font-normal aria-selected:opacity-100',
          ),
          selected:
            '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary',
          today: '[&>button]:bg-secondary [&>button]:text-foreground',
          outside: 'text-muted-foreground opacity-50',
          disabled: 'text-muted-foreground opacity-40',
          hidden: 'invisible',
          ...classNames,
        }}
        {...props}
      />
    </div>
  )
}
