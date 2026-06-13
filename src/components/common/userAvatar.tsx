import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { avatarUrl } from '@/lib/avatar'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
  seed: string
  initials: string
  className?: string
}

export function UserAvatar({ seed, initials, className }: UserAvatarProps) {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatarUrl(seed)} alt="" loading="lazy" />
      <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
    </Avatar>
  )
}
