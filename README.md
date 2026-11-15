This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Spotify recently played

The home page can display your five most recently played Spotify tracks. Create a Spotify app and add the callback URL below to its Redirect URIs. Set these server-only variables in `.env.local` (never use a `NEXT_PUBLIC_` prefix for the secret):

```env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/callback
```

Start the app and open `http://localhost:3000/api/spotify/auth`. Authorize the Spotify account whose listening you want to display, then copy the refresh token shown on the callback page into `.env.local`:

```env
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

Restart the app. For production, configure the same variables in your hosting provider and use the production callback URL in both `SPOTIFY_REDIRECT_URI` and your Spotify app's Redirect URIs. The album search and recent-track features use these server-side credentials.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
