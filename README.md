# Next Movies

## Tech Stack 

- Next.js + TypeScript
- Lint
    - ESLint + Prettier
- Design System
    - Material UI
    - Tailwind CSS
- E2E Tests: Playwright
- Type-safety & Validation
    - ts-reset
    - zod

## Setup

1. Clone the repository

```
# gh
gh clone esau-morais/next-movies
# git
git clone https://github.com/esau-morais/next-movies.git
```

2. Install dependencies

```
# npm
npm i

# Yarn
yarn

# pnpm
pnpm i
```

> :warning: Before you proceed to next step,
> please make sure to fill out the required environment variables, 
> by duplicating the `.env.example` file and renaming it to `.env`

3. Run the server

```
# npm
npm run dev

# Yarn
yarn dev

# pnpm
pnpm dev
```

4. Testing

> :warning: Make sure to run the server before run the test commands

```
# npm
npm run playwright test

# Yarn
yarn playwright test

# pnpm
pnpm playwright test
```
