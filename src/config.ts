export const config = {
  // Siempre /api: en dev lo resuelve el proxy de Vite, en prod el proxy de Vercel
  // (vercel.json). Evita mixed-content al apuntar a un backend http desde https.
  apiUrl: '/api',
  appName: import.meta.env.VITE_APP_NAME as string,
} as const
