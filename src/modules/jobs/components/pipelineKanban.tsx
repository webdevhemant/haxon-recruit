import { useMemo, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'

import { cn } from '@/lib/utils'
import type { Candidate, PipelineStage } from '@/lib/types'
import { useDataStore } from '@/stores/useDataStore'
import { PipelineCard } from './pipelineCard'

function DraggableCard({ candidate }: { candidate: Candidate }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: candidate.id,
  })
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn('touch-none', isDragging && 'opacity-40')}
    >
      <PipelineCard candidate={candidate} />
    </div>
  )
}

function Column({
  stage,
  candidates,
}: {
  stage: PipelineStage
  candidates: Candidate[]
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id })
  return (
    <div className="flex w-72 shrink-0 flex-col">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-sm font-semibold">{stage.name}</span>
        <span className="rounded-full bg-secondary px-2 text-xs text-muted-foreground">
          {candidates.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          'flex min-h-32 flex-1 flex-col gap-2 rounded-xl border border-dashed border-transparent bg-secondary/30 p-2 transition-colors',
          isOver && 'border-primary/50 bg-primary/5',
        )}
      >
        {candidates.map((c) => (
          <DraggableCard key={c.id} candidate={c} />
        ))}
        {candidates.length === 0 && (
          <p className="px-2 py-6 text-center text-xs text-muted-foreground">
            Drop candidates here
          </p>
        )}
      </div>
    </div>
  )
}

export function PipelineKanban({
  jobId,
  stages,
}: {
  jobId: string
  stages: PipelineStage[]
}) {
  const candidates = useDataStore((s) => s.candidates)
  const moveCandidate = useDataStore((s) => s.moveCandidate)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  )

  const byStage = useMemo(() => {
    const map: Record<string, Candidate[]> = {}
    for (const s of stages) map[s.id] = []
    for (const c of candidates) {
      if (c.jobId !== jobId || c.archived) continue
      ;(map[c.stageId] ??= []).push(c)
    }
    return map
  }, [candidates, jobId, stages])

  const active = candidates.find((c) => c.id === activeId)

  const onDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id))
  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null)
    const overId = e.over?.id
    if (!overId) return
    const candidateId = String(e.active.id)
    const stageId = String(overId)
    const candidate = candidates.find((c) => c.id === candidateId)
    if (candidate && candidate.stageId !== stageId) {
      moveCandidate(candidateId, stageId)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="flex gap-4 overflow-x-auto pb-2">
        {stages.map((stage) => (
          <Column key={stage.id} stage={stage} candidates={byStage[stage.id]} />
        ))}
      </div>
      <DragOverlay>
        {active ? (
          <div className="w-64">
            <PipelineCard candidate={active} dragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
