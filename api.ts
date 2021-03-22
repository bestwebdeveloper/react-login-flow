import { LoremIpsum } from 'lorem-ipsum'
import { DateTime } from 'luxon'

import { MESSAGES } from './src/constants'

export interface User {
  id: number
  username: string
}

export interface Comment {
  author: string
  text: string
}

export interface Post {
  id: number
  title: string
  text: string
  likes: number
  comments: Comment[]
  createdAt: DateTime
}

export type AccessToken = string

type UserDB = User & { password: string }

const users: UserDB[] = [
  { id: 1, username: 'alice', password: 'pass' },
  { id: 2, username: 'bob', password: 'pass' },
]

const posts: Post[] = [
  {
    id: 1,
    title: 'First post',
    text: new LoremIpsum().generateParagraphs(2),
    likes: 14,
    comments: [
      { author: 'Anonymous 1', text: new LoremIpsum().generateParagraphs(4) },
      { author: 'Anonymous 2', text: new LoremIpsum().generateParagraphs(5) },
      { author: 'Anonymous 3', text: new LoremIpsum().generateParagraphs(1) },
    ],
    createdAt: DateTime.fromISO('2020-01-31'),
  },
  {
    id: 2,
    title: 'Second post',
    text: new LoremIpsum().generateParagraphs(3),
    likes: 3,
    comments: [],
    createdAt: DateTime.fromISO('2020-03-23'),
  },
  {
    id: 3,
    title: 'Third post',
    text: new LoremIpsum().generateParagraphs(1),
    likes: 23,
    comments: [
      { author: 'Anonymous 4', text: new LoremIpsum().generateParagraphs(4) },
      { author: 'Anonymous 5', text: new LoremIpsum().generateParagraphs(5) },
      { author: 'Anonymous 6', text: new LoremIpsum().generateParagraphs(1) },
      { author: 'Anonymous 7', text: new LoremIpsum().generateParagraphs(8) },
    ],
    createdAt: DateTime.fromISO('2021-01-10'),
  },
  {
    id: 4,
    title: 'Forth post',
    text: new LoremIpsum().generateParagraphs(7),
    likes: 0,
    comments: [{ author: 'Anonymous 8', text: new LoremIpsum().generateParagraphs(3) }],
    createdAt: DateTime.fromISO('2012-02-10'),
  },
]

const accessTokens: { [token: string]: User | undefined } = {}

const generate = (size: number): string =>
  [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')

export async function login(username: string, password: string): Promise<AccessToken> {
  await delay(1000)

  const user = users.find(u => u.username === username && u.password === password)

  if (user) {
    const accessToken = generate(16)

    accessTokens[accessToken] = { id: user.id, username: user.username }

    return accessToken
  } else {
    throw new Error(MESSAGES.INVALID_CREDENTIALS)
  }
}

export async function signUp(username: string, password: string): Promise<AccessToken> {
  await delay(1000)

  const user = users.find(user => user.username === username)

  if (typeof user === 'undefined') {
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1
    const newUser = { id, username, password }
    const accessToken = generate(16)

    accessTokens[accessToken] = { id, username }

    users.push(newUser)

    return accessToken
  } else {
    throw new Error(MESSAGES.USER_EXISTS)
  }
}

export async function restore(username: string, agreement: boolean): Promise<AccessToken> {
  await delay(1000)

  if (!agreement) {
    throw new Error(MESSAGES.AGREEMENT_IS_NOT_CHECKED);
  }

  const user = users.find(user => user.username === username)

  if (typeof user !== 'undefined') {
    return user.password
  } else {
    throw new Error(MESSAGES.USER_DOES_NOT_EXIST)
  }
}

export async function listPosts(accessToken: string): Promise<Post[]> {
  await delay(1000)

  const user = accessTokens[accessToken]

  if (user) {
    return posts.map(post => ({ ...post }))
  } else {
    throw new Error(MESSAGES.INVALID_ACCESS_TOKEN)
  }
}

export async function retrievePost(accessToken: string, postId: number): Promise<Post> {
  await delay(1000)

  const user = accessTokens[accessToken]

  if (user) {
    const post = posts.find(p => p.id === postId)

    if (post) {
      return { ...post }
    } else {
      throw new Error(MESSAGES.INVALID_POST_ID)
    }
  } else {
    throw new Error(MESSAGES.INVALID_ACCESS_TOKEN)
  }
}

function delay(millis: number): Promise<void> {
  if (process.env.NODE_ENV !== 'test') {
    return new Promise(resolve => setInterval(() => resolve(), millis))
  } else {
    return Promise.resolve()
  }
}
