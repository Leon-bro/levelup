import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/levelup/',
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        choose_topic: path.resolve(__dirname,"pages", 'choose-topic.html'),
        flash_cards: path.resolve(__dirname,"pages", 'flash_cards.html'),
        test: path.resolve(__dirname,"pages", 'test.html'),
      },
    },
  },
  server: {
    open: '/index.html',
    host:'localhost',
    port: 8080,
    hot: true
  }
})

