import { User } from "@interfaces/AuthContext"

export interface IUserInfo extends User {
  email?: string
  wordsHistory?: number
  favoritesWords?: number
  imageSrc?: string
}

export interface IUserDetails {}
