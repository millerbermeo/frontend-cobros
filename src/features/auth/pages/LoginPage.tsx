import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { motion } from 'framer-motion'
import axios from 'axios'
import {
  MdLockOutline,
  MdPersonOutline,
  MdVisibility,
  MdVisibilityOff,
  MdArrowForward,
} from 'react-icons/md'
import { cn } from '@/shared/utils/cn'
import { useLogin } from '../hooks/useAuth'
import { loginSchema, type LoginFormValues } from '../schemas/auth.schema'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: EASE },
  }),
}

function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? 'Usuario o contraseña incorrectos'
  }
  return 'Error al iniciar sesión. Intenta de nuevo.'
}

export function LoginPage() {
  const [showPwd, setShowPwd] = useState(false)
  const { mutate: login, isPending, error } = useLogin()

  const {
    control,
    handleSubmit,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = (data: LoginFormValues) => {
    login(data)
  }

  return (
    <div className="w-full">
      {/* Card */}
      <motion.div
        className="bg-card rounded-3xl border border-border shadow-xl shadow-black/[0.07] overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {/* Gradient top bar */}
        <div className="h-1.5 w-full bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500" />

        <div className="p-10">
          {/* Icon badge + heading */}
          <motion.div className="mb-8" variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <div
              className="w-13 h-13 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/30"
              style={{ width: '3.25rem', height: '3.25rem' }}
            >
              <MdLockOutline className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-[1.75rem] font-bold text-foreground tracking-tight leading-tight">
              Bienvenido de vuelta
            </h1>
            <p className="text-sm text-foreground/45 mt-1.5">
              Inicia sesión para acceder a tu cuenta
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
            {/* Error banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-danger/10 border border-danger/20 px-4 py-3 text-sm text-danger"
              >
                {getApiErrorMessage(error)}
              </motion.div>
            )}

            {/* Username */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-indigo-500 uppercase tracking-widest">
                      Usuario
                    </label>
                    <div className="relative">
                      <MdPersonOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-foreground/35 pointer-events-none" />
                      <input
                        {...field}
                        type="text"
                        autoComplete="username"
                        placeholder="nombre_usuario"
                        className={cn(
                          'w-full pl-11 pr-4 py-3 rounded-xl border bg-background',
                          'text-sm text-foreground placeholder:text-foreground/25',
                          'outline-none transition-all duration-200',
                          'focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400/70',
                          fieldState.error
                            ? 'border-danger ring-2 ring-danger/20'
                            : 'border-border',
                        )}
                      />
                    </div>
                    {fieldState.error && (
                      <p className="text-xs text-danger">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-indigo-500 uppercase tracking-widest">
                      Contraseña
                    </label>
                    <div className="relative">
                      <MdLockOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-foreground/35 pointer-events-none" />
                      <input
                        {...field}
                        type={showPwd ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className={cn(
                          'w-full pl-11 pr-12 py-3 rounded-xl border bg-background',
                          'text-sm text-foreground placeholder:text-foreground/25',
                          'outline-none transition-all duration-200',
                          'focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400/70',
                          fieldState.error
                            ? 'border-danger ring-2 ring-danger/20'
                            : 'border-border',
                        )}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPwd((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/35 hover:text-indigo-500 transition-colors"
                        aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        {showPwd ? (
                          <MdVisibilityOff className="w-4.5 h-4.5" />
                        ) : (
                          <MdVisibility className="w-4.5 h-4.5" />
                        )}
                      </button>
                    </div>
                    {fieldState.error && (
                      <p className="text-xs text-danger">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isDisabled={isPending}
                className="h-12 font-semibold gap-2 text-base mt-1"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
                }}
              >
                {isPending ? 'Ingresando...' : 'Ingresar'}
                {!isPending && <MdArrowForward className="w-4 h-4" />}
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {/* Help text */}
      <motion.p
        className="mt-5 text-center text-xs text-foreground/35"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={4}
      >
        ¿Problemas para acceder? Contacta al administrador
      </motion.p>
    </div>
  )
}
