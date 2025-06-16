# Use a lightweight Node.js 20 image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install pnpm and project dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the TypeScript project
RUN pnpm build

# Expose the port the app runs on
EXPOSE 3333

# Start the application
CMD ["node", "dist/main/server.js"]
