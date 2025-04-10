import { fileURLToPath } from 'node:url'
import { Canvas } from 'canvas'
import { JSDOM } from 'jsdom'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  runScripts: 'dangerously',
  resources: 'usable',
})

globalThis.window = dom.window as any
globalThis.document = dom.window.document
globalThis.navigator = dom.window.navigator

const canvasPrototype = Object.getPrototypeOf(dom.window.HTMLCanvasElement.prototype)
canvasPrototype.getContext = function (type: any, attributes: any) {
  const canvas = new Canvas(this.width, this.height)
  return canvas.getContext(type, attributes)
}

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
