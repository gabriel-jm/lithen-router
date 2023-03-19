# Build Lithen Router
npm run build

# Copy lithen router build to dev app folder
rm -rf ./dev-app/build && cp -r ./build ./dev-app/build

# Build dev app in watch mode
tsc -p ./dev-app/tsconfig.json --outDir ./dev-app/build
