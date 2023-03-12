# Build Lithen Router
npm run build

# Copy lithen router build to dev app folder
rm -rf ./dev-app/build && cp -r ./build ./dev-app/build

# Concurrently Build dev app in watch mode and start dev server
concurrently \
  "tsc -p ./dev-app/tsconfig.json --watch" \
  "npx http-server -P http://localhost:8080/? ./dev-app"
