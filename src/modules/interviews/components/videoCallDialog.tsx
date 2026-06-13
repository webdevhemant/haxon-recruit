import { useEffect, useRef, useState } from 'react'
import { Mic, MicOff, PhoneOff, Video, VideoOff } from 'lucide-react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface VideoCallDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  candidateName: string
  subtitle: string
}

export function VideoCallDialog({
  open,
  onOpenChange,
  candidateName,
  subtitle,
}: VideoCallDialogProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [camOn, setCamOn] = useState(true)
  const [micOn, setMicOn] = useState(true)

  useEffect(() => {
    if (!open) return
    let cancelled = false
    setError(null)

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream
      })
      .catch(() => {
        if (!cancelled) setError('Camera permission was denied or unavailable.')
      })

    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }, [open])

  const toggleCam = () => {
    const track = streamRef.current?.getVideoTracks()[0]
    if (track) {
      track.enabled = !track.enabled
      setCamOn(track.enabled)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <DialogTitle className="sr-only">
          Video call with {candidateName}
        </DialogTitle>

        <div className="relative aspect-video overflow-hidden rounded-t-xl bg-black">
          {error ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-white/70">
              <VideoOff className="size-8" />
              {error}
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={cn(
                'h-full w-full -scale-x-100 object-cover',
                !camOn && 'opacity-0',
              )}
            />
          )}
          {!error && !camOn && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-white">
                {candidateName
                  .split(' ')
                  .map((p) => p[0])
                  .join('')}
              </span>
            </div>
          )}
          <div className="absolute left-4 top-4 rounded-md bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur">
            ● Live · You
          </div>
        </div>

        <div className="flex items-center justify-between p-4">
          <div>
            <p className="font-semibold">{candidateName}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={micOn ? 'outline' : 'secondary'}
              size="icon"
              onClick={() => setMicOn((v) => !v)}
              aria-label="Toggle mic"
            >
              {micOn ? (
                <Mic className="size-4" />
              ) : (
                <MicOff className="size-4" />
              )}
            </Button>
            <Button
              variant={camOn ? 'outline' : 'secondary'}
              size="icon"
              onClick={toggleCam}
              aria-label="Toggle camera"
            >
              {camOn ? (
                <Video className="size-4" />
              ) : (
                <VideoOff className="size-4" />
              )}
            </Button>
            <Button variant="destructive" onClick={() => onOpenChange(false)}>
              <PhoneOff className="size-4" />
              Leave
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
