import CryptoJS from 'crypto-js'

const SECRET = import.meta.env.VITE_COOKIE_SECRET as string | undefined

if (!SECRET) {
  console.warn('[crypto] VITE_COOKIE_SECRET no definido — cookies sin encriptación real')
}

const KEY = SECRET ?? 'cobros-dev-fallback-key-change-in-prod'

export function encrypt(value: string): string {
  return CryptoJS.AES.encrypt(value, KEY).toString()
}

export function decrypt(ciphertext: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, KEY)
    const plain = bytes.toString(CryptoJS.enc.Utf8)
    return plain.length > 0 ? plain : null
  } catch {
    return null
  }
}
