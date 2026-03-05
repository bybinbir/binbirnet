import bcrypt from 'bcryptjs'
import { promises as fs } from 'node:fs'
import { join } from 'node:path'

const password = process.argv[2]
const username = process.argv[3] || 'admin'

if (!password) {
  console.log('Kullanım: npm run hash-password -- <şifre> [kullanıcı]')
  console.log('Örnek:    npm run hash-password -- Mali1001')
  console.log('Örnek:    npm run hash-password -- Mali1001 admin')
  process.exit(1)
}

const hash = await bcrypt.hash(password, 10)
const authFile = join(process.cwd(), 'server', 'data', 'auth.json')
const auth = { user: username, passwordHash: hash }

await fs.writeFile(authFile, JSON.stringify(auth, null, 2) + '\n', 'utf-8')

console.log(`\nKullanıcı: ${username}`)
console.log(`Şifre hash: ${hash}`)
console.log(`\nauth.json güncellendi: ${authFile}`)
