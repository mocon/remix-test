[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/mocon/remix-test)

# Remix Test

Trying out a new Remix web application.

- [Remix Docs](https://remix.run/docs)

## Development

Start your app in development mode, rebuilding assets on file changes:

```sh
yarn dev
```

## Deployment

First, build the app for production:

```sh
yarn build
```

Then run the app in production mode:

```sh
yarn start
```

Now pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..

# Create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app

# Remove the new project's app (not the old one!)
rm -rf app

# Copy your app over
cp -R ../my-old-remix-app/app app
```

### Environment variables

```
AUTH0_CLIENT_ID=xxxx
AUTH0_CLIENT_SECRET=xxxx
AUTH0_DOMAIN=xxxx
GITHUB_API_BASE_URL=https://api.github.com # REST
SPACEX_API_BASE_URL=https://api.spacex.land/graphql # GraphQL
```
