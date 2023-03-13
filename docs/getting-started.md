# Lithen Router - Getting Started

The `Lithen Router` is a simple library that can be used with simple steps.

---

## Vanilla Project

- Create a folder for the project.
- Create a `index.html` file.
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    
  </body>
  </html>
  ```

- In the `index.html` you can work inside the body, but can create a `div` to work on too.
- Link a script in your document.
  ```html
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="module" src="./main.js"></script>
    <title>Document</title>
  </head>
  ```

- In the `main.js`. For more details about each method and classes, search for it in the docs.
  ```js
  import { LithenRouter } from 'https://esm.sh/lithen-router'
  import { home } from './home.js'
  import { notFound } from './not-found.js'

  const router = new LithenRouter({
    '/': home,
    notFound
  })

  window.onload = () => {
    const match = router.matchRoute()

    document.body.replaceChildren(match.value())
  }
  ```

- **(Optional)** You can also create an import map to not use direct urls in the code.
  ```html
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="importmap">
      {
        "imports": {
          "lithen-router": "https://esm.sh/lithen-router"
        }
      }
    </script>
    <script type="module" src="./main.js"></script>
    <title>Document</title>
  </head>
  ```

  ```js
  import { LithenRouter } from 'lithen-router'
  import { home } from './home.js'
  import { notFound } from './not-found.js'

  const router = new LithenRouter({
    '/': home,
    notFound
  })

  window.onload = () => {
    const match = router.matchRoute()

    document.body.replaceChildren(match.value())
  }
  ```

- Finally run the project with some http server, like the [http-server](https://github.com/http-party/http-server). Which can be run in this project with this command (run in the project's folder).
  ```sh
  npx http-server .
  ```

- And you're good to go!!!

> Warn that this vanilla project setup only works with Javascript.

---

## Project with Vite

- Create a folder for the project.
- Init a Vanilla Vite project.
  ```sh
  npm init vite .
  ```
  - Select `Vanilla` framework.
  - Select Javascript or Typescript, we'll use Typescript in this tutorial.

- Install the `lithen-router` package.
  ```sh
  npm i lithen-router
  ```

- Except for the `vite-env.d.ts`, delete all other files inside `src` folder.
- Create a new `main.ts` file.
  ```ts
  import { LithenRouter } from 'lithen-router'
  import { home } from './home'
  import { notFound } from './not-found'

  const router = new LithenRouter({
    '/': home,
    notFound
  })

  window.onload = () => {
    const match = router.matchRoute()

    document.body.replaceChildren(match.value())
  }
  ```

- Run the dev script.
  ```sh
  npm run dev
  ```

- And you're good to go!!!
