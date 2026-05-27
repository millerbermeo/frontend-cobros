import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FormInput } from '@/shared/components/forms'
import { loginSchema, type LoginFormValues } from '../schemas/auth.schema'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: EASE },
  }),
}

// TODO: restore real login when backend ready
export function LoginPage() {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (_data: LoginFormValues) => {
    navigate('/', { replace: true })
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        className="mb-8"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0}
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Bienvenido de vuelta
        </h1>
        <p className="text-sm text-muted mt-1.5">
          Inicia sesión para acceder a tu cuenta
        </p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
          <FormInput<LoginFormValues>
            name="email"
            control={control}
            label="Correo electrónico"
            placeholder="correo@ejemplo.com"
            type="email"
          />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}>
          <FormInput<LoginFormValues>
            name="password"
            control={control}
            label="Contraseña"
            placeholder="••••••••"
            type="password"
          />
        </motion.div>

        <motion.div
          className="flex justify-end"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
        >
          <button
            type="button"
            className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isDisabled={isSubmitting}
            className="mt-1 h-11 font-semibold"
          >
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </motion.div>
      </form>

      <motion.p
        className="mt-8 text-center text-xs text-muted"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={5}
      >
        ¿Problemas para acceder? Contacta al administrador
      </motion.p>
    </div>
  )
}
