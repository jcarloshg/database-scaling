# Express.js TypeScript Backend

## Features
- Express server with TypeScript
- Health check endpoint at `/health`
- Uses CORS and Zod
- Jest for testing

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the server:
   ```bash
   npm run start:dev
   ```
3. Run tests:
   ```bash
   npm test
   ```

## Scripts
Add these to your `package.json` for convenience:
```json
"scripts": {
  "start": "ts-node src/index.ts",
  "start:dev": "nodemon src/index.ts",
  "test": "jest"
}
```

## Environment
- Set `PORT=3000` in `.env` (default is 3000)

## Project Structure
- `src/` - Source files
- `tests/` - Test files
