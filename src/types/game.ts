import { WAITING_PLAY, FUN_PLAY, REAL_PLAY } from "~/constants"
import type { Asset, ID } from "./base"

export type PlayType = typeof WAITING_PLAY | typeof FUN_PLAY | typeof REAL_PLAY;

export type Game = {
  id: ID
  identifier?: string
  title: string
  image: string
  slug: string
  video: Asset
  gameCategory: GameCategory
  gameProducer: GameProducer
}

export type GameCategory = {
  id: ID
  name: string
  slug: string
  games?: Game[]
}

export type GameProvider = {
  id: ID
  name: string
  slug: string
  image: string
  games?: Game[]
}

export type GameProducer = {
  id: ID
  name: string
  display_name: string
  enabled: boolean
  slug: string
  order: number
  image: string
  games?: Game[]
}
