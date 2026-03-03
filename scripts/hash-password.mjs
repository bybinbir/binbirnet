import bcrypt from 'bcryptjs'
import { createInterface } from 'readline'

const rl = createInterface({ input: process.stdin, output: process.stdout })
rl.question('Sifre girin: ', async (password) => {
  const hash = await bcrypt.hash(password, 10)
  console.log(`\nBcrypt hash:\n${hash}\n`)
  console.log(`Bu satiri .env dosyaniza ekleyin:\nNUXT_ADMIN_PASSWORD_HASH=${hash}`)
  rl.close()
})
