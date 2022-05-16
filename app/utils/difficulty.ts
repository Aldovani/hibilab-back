const difficulty = ['Iniciante', 'Intermediário', 'Avançado'] as const

type Difficulty = typeof difficulty[number]

export { difficulty, Difficulty }
