# NEST-NEXT.

## Table of Contents

1. [Requirements](#requirements)
2. [Preliminary Work](#preliminary-work)
3. [Project Initialization](#Project-Initialization)
4. [Quick Start](#quick-start)

### Requirements:
Ensure the following prerequisites are met for a smooth setup:
1. Docker must be installed on your system.
2. Node.js should be at version 18, or NVM (Node Version Manager) should be installed.

### Preliminary Work
Follow these steps to prepare your environment:

1. **Docker Setup:**
 - Install and run the latest version of Docker.
 - Start services: Execute `docker-compose up -d`.
 - Adminer will be available at the following URL: `http://localhost:8081`.

2. **Node Version Check and Setup:**
 - Verify Node.js version: Execute `node -v`. The expected version should be `18`.
 - If not installed, use NVM to install and use the correct version:
   ```
   nvm install
   nvm use
   ```

## Project Initialization:
 - Install project dependencies: Execute `npm install`.
 - Start the project: Execute `npm run dev`.
 - Upon successful start, you will have access to the following URLs:
  - Nest.js backend: `http://localhost:3000`
  - Nest.js Swagger documentation: `http://localhost:3000/api`
  - Next.js frontend: `http://localhost:3030`
  - copy .env.example to .env and add your own credentials for root and for backend. 
  - `echo 'NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"' > ./apps/frontend/.env.local`


## Quick Start
For a quick setup, run the following commands in your terminal:

```bash
docker-compose up -d
nvm install
nvm use
npm install
cp .env.example .env
cp ./apps/backend/.env.example ./apps/backend/.env
echo 'NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"' > ./apps/frontend/.env.local
npm run dev
open http://localhost:3030
npm run test
```

This will start all necessary services and open the frontend in your default browser.


## Todo : 
- [ ] Add Storybook
- [ ] Move reusable frontend to packages/design-system
- [ ] Add typedoc auto documentation creation
- [ ] add cypress/playwright e2e and visual regression testing as separate package
- [ ] Integrate Typescript generics for better type safety
- [ ] Share types between frontend and backend using an external package