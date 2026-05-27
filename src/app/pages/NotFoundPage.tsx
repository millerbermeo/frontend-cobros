import { useNavigate } from 'react-router-dom'
import { MdArrowBack, MdSearchOff } from 'react-icons/md'
import { Button } from '@heroui/react'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-md gap-6">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
          <MdSearchOff className="w-10 h-10 text-primary" />
        </div>

        <div className="space-y-2">
          <p className="text-6xl font-black text-foreground/10 leading-none select-none">404</p>
          <h1 className="text-xl font-bold text-foreground">Página no encontrada</h1>
          <p className="text-sm text-foreground/50">
            La ruta que buscas no existe o fue movida. Verifica la URL e intenta de nuevo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            variant="bordered"
            onPress={() => navigate(-1)}
            startContent={<MdArrowBack className="w-4 h-4" />}
          >
            Volver atrás
          </Button>
          <Button
            variant="primary"
            onPress={() => navigate('/', { replace: true })}
          >
            Ir al inicio
          </Button>
        </div>
      </div>
    </div>
  )
}
