import { ConfiguracionLayout } from '../layouts/ConfiguracionLayout'
import { TasasInteresForm } from '../components/TasasInteresForm'
import { IntegracionEducacionForm } from '../components/IntegracionEducacionForm'
import { UsuariosPage } from '@/features/usuarios/pages/UsuariosPage'

export function ConfiguracionPage() {
  return (
    <ConfiguracionLayout>
      <div>
        <h1 className="text-xl font-bold text-foreground">Configuración</h1>
        <p className="text-sm text-foreground/50 mt-0.5">
          Administra los parámetros globales del sistema
        </p>
      </div>

      <TasasInteresForm />
      <IntegracionEducacionForm />
      <UsuariosPage />
    </ConfiguracionLayout>
  )
}
