import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/routes'
import { useAuthStore } from '@/stores/useAuthStore'

export function SocialButtons() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  const demoLogin = (name: string, email: string) => {
    login(email, name)
    navigate(ROUTES.dashboard)
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={() => demoLogin('Alex Tran', 'alex@nexaflow.io')}
      >
        <GoogleIcon />
        Google
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => demoLogin('Alex Tran', 'alex@nexaflow.io')}
      >
        <GithubIcon />
        GitHub
      </Button>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1A6.2 6.2 0 0 1 12 5.8c1.8 0 3 .76 3.7 1.4l2.5-2.4C16.6 3.3 14.5 2.4 12 2.4A9.6 9.6 0 1 0 12 21.6c5.5 0 9.2-3.9 9.2-9.4 0-.63-.07-1.1-.16-1.6H12Z"
      />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.85c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.33 4.79-4.56 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}
