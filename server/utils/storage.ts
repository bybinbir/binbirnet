import { promises as fs } from 'node:fs'
import { join, dirname } from 'node:path'

const DATA_DIR = join(process.cwd(), 'server', 'data')

export async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = join(DATA_DIR, filename)
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw) as T
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = join(DATA_DIR, filename)
  await fs.mkdir(dirname(filePath), { recursive: true })
  const tmpPath = `${filePath}.${Date.now()}.tmp`
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), 'utf-8')
  await fs.rename(tmpPath, filePath)
}
