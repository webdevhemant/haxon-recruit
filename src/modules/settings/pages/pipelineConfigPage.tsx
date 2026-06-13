import { useState } from 'react'
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Plus, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { DEFAULT_PIPELINE, DISQUALIFY_REASONS } from '@/lib/data/constants'
import type { PipelineStage } from '@/lib/types'
import { SettingsTabs } from '../components/settingsTabs'

const TYPE_VARIANT: Record<
  string,
  'default' | 'secondary' | 'warning' | 'success'
> = {
  screening: 'secondary',
  interview: 'default',
  offer: 'warning',
  hired: 'success',
}

function SortableStage({
  stage,
  index,
}: {
  stage: PipelineStage
  index: number
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stage.id })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        'flex items-center gap-3 rounded-lg border border-border bg-card p-3',
        isDragging && 'z-10 shadow-lg ring-1 ring-primary',
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="size-4" />
      </button>
      <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-xs font-medium">
        {index + 1}
      </span>
      <span className="text-sm font-medium">{stage.name}</span>
      <Badge
        variant={TYPE_VARIANT[stage.type] ?? 'secondary'}
        className="ml-auto capitalize"
      >
        {stage.type}
      </Badge>
    </div>
  )
}

export function PipelineConfigPage() {
  const [stages, setStages] = useState<PipelineStage[]>(DEFAULT_PIPELINE)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  )

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    setStages((items) => {
      const from = items.findIndex((s) => s.id === active.id)
      const to = items.findIndex((s) => s.id === over.id)
      return arrayMove(items, from, to)
    })
  }

  return (
    <div>
      <SettingsTabs />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Default pipeline stages</CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="size-4" />
              Add stage
            </Button>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-muted-foreground">
              Drag the handle to reorder how candidates flow through your
              pipeline.
            </p>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={stages.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-2">
                  {stages.map((stage, i) => (
                    <SortableStage key={stage.id} stage={stage} index={i} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Disqualification reasons
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {DISQUALIFY_REASONS.map((r) => (
              <div
                key={r}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
              >
                {r}
                <X className="size-3.5 cursor-pointer text-muted-foreground hover:text-foreground" />
              </div>
            ))}
            <Button size="sm" variant="ghost" className="mt-1 justify-start">
              <Plus className="size-4" />
              Add reason
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
