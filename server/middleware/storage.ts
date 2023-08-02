import type { Storage } from 'unstorage'
import { createStorage } from 'unstorage'
import cloudflareKVBindingDriver from "unstorage/drivers/cloudflare-kv-binding";

import { isDevelopment } from 'std-env'

declare module 'h3' {
  interface H3EventContext {
    profileStorage: Storage
  }
}

export default defineEventHandler(async (event) => {
  if (isDevelopment) {
    event.context.profileStorage = createStorage()
    return
  }

  const { cloudflare } = event.context
  const KV_PAPERLESS = await cloudflare.env.KV_PAPERLESS

  event.context.profileStorage = createStorage({
      driver: cloudflareKVBindingDriver({ binding: KV_PAPERLESS })
    })
})
