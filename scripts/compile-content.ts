import { createHash } from 'node:crypto'
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync
} from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

import { parse as parseYaml } from 'yaml'

import type {
  ContentManifest,
  ManifestEntry
} from '@hollowdark/content-system/manifest/schema'

const HERE = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = join(HERE, '..')
const CONTENT_DIR = join(PROJECT_ROOT, 'content')
const OUT_CONTENT_DIR = join(PROJECT_ROOT, 'static', 'content')
const OUT_MANIFEST_PATH = join(PROJECT_ROOT, 'static', 'content-manifest.json')

function readPackageVersion(): string {
  const pkg = JSON.parse(readFileSync(join(PROJECT_ROOT, 'package.json'), 'utf8')) as {
    version: string
  }
  return pkg.version
}

function walkYaml(dir: string): readonly string[] {
  const out: string[] = []
  const walk = (current: string): void => {
    for (const entry of readdirSync(current)) {
      const full = join(current, entry)
      const stat = statSync(full)
      if (stat.isDirectory()) {
        walk(full)
      } else if (stat.isFile() && entry.endsWith('.yaml')) {
        out.push(full)
      }
    }
  }
  walk(dir)
  return out
}

function toChunkId(absPath: string): string {
  const rel = relative(CONTENT_DIR, absPath)
  const withoutExt = rel.slice(0, -'.yaml'.length)
  return withoutExt.split(sep).join('/')
}

function shortHash(bytes: Buffer | string): string {
  return createHash('sha256').update(bytes).digest('hex').slice(0, 16)
}

function writeChunk(chunkId: string, data: unknown, version: string): ManifestEntry {
  const jsonBody = JSON.stringify(data)
  const hash = shortHash(jsonBody)
  const segments = chunkId.split('/')
  const leaf = segments[segments.length - 1]
  if (leaf === undefined) {
    throw new Error(`Empty chunk id from compilation input`)
  }
  const parentSegments = segments.slice(0, -1)
  const finalName = `${leaf}.v${version}.${hash}.json`
  const outPath = join(OUT_CONTENT_DIR, ...parentSegments, finalName)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, jsonBody, 'utf8')

  const urlPath = [...parentSegments, finalName].join('/')
  return {
    version,
    hash,
    url: `/content/${urlPath}`,
    size_bytes: Buffer.byteLength(jsonBody, 'utf8')
  }
}

function compile(): void {
  const version = readPackageVersion()

  rmSync(OUT_CONTENT_DIR, { recursive: true, force: true })
  mkdirSync(OUT_CONTENT_DIR, { recursive: true })

  const yamlFiles = walkYaml(CONTENT_DIR)
  const chunks: Record<string, ManifestEntry> = {}

  for (const absPath of yamlFiles) {
    const raw = readFileSync(absPath, 'utf8')
    const parsed = parseYaml(raw) as unknown
    const chunkId = toChunkId(absPath)
    chunks[chunkId] = writeChunk(chunkId, parsed, version)
  }

  const manifest: ContentManifest = {
    content_version: version,
    app_version: version,
    generated_at: new Date().toISOString(),
    chunks
  }

  mkdirSync(dirname(OUT_MANIFEST_PATH), { recursive: true })
  writeFileSync(OUT_MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8')

  const chunkCount = Object.keys(chunks).length
  process.stdout.write(`Compiled ${chunkCount} content chunk${chunkCount === 1 ? '' : 's'} to ${OUT_CONTENT_DIR}\n`)
}

compile()
