import { User } from '@/plugins/authentication'

export default function userFilter(user: User): string {
  if (!user) return ''
  return `${user.given_name} ${((user.family_name as string) || '').toUpperCase()}`
}
