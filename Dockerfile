# 1. Use the official Node.js image as the base (think of this as the OS)
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json first
# (This is a Docker trick: we do this first to cache dependencies so builds are faster)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your app code
COPY . .

# ADD THIS LINE (The "Dummy" Key)
ENV MONGO_URI="mongodb://mongo:27017/temp_db_for_build"
ENV JWT_SECRET="temp_secret_for_build"

# 6. Build the Next.js application
RUN npm run build

# 7. Expose the port Next.js runs on
EXPOSE 3000

# 8. The command to start the app
CMD ["npm", "start"]
