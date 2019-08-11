import { User } from '@/plugins/authentication'

export function userFilter(user: User): string {
  if (!user) return ''
  return `${user.given_name} ${((user.family_name as string) || '').toUpperCase()}`
}

export function userListFilter(users: User[]): string {
  if (!users) return ''
  return users.map(u => userFilter(u)).join(', ')
}
