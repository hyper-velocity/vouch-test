export type User = {
  user: {
    id: number,
    username: string,
    tagline: string,
    avatar: string,
    skills: {
      skillId: number,
      name: string,
      level: number
    }[]
  },
  userSubmissionURL: string
}
