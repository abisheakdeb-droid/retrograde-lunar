# Deployment Guide to "Go Live"

Since your code is already on GitHub, "going live" is incredibly easy. The modern standard for Next.js applications is **Vercel** (the creators of Next.js), which offers a seamless "Git-based" workflow.

## Option 1: The "Easy Mode" (Local Script)

I have installed a local helper for you. Authenticate and deploy directly from your terminal:

1.  Run the deploy script:
    ```bash
    ./bin/deploy login
    ```
2.  Follow the instructions to log in via browser.
3.  Once logged in, deploy:
    ```bash
    ./bin/deploy
    ```

## Option 2: Vercel Web Dashboard (Recommended)

Go to [vercel.com](https://vercel.com) and sign up using your **GitHub** account.

### 2. Import Project

1.  Click **"Add New..."** -> **"Project"**.
2.  You will see a list of your GitHub repositories.
3.  Find `retrograde-lunar` and click **"Import"**.

### 3. Configure

Vercel detects `Next.js` automatically.

- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `next build` (default)
- **Install Command**: `npm install` (default)

### 4. Deploy

Click **"Deploy"**. Vercel will:

1.  Clone your repo.
2.  Install dependencies.
3.  Run the build.
4.  Assign a live URL (e.g., `retrograde-lunar.vercel.app`).

### Automatic Updates

Now, whenever you run this workflow locally:

```bash
git add .
git commit -m "update feature"
git push origin main
```

Vercel will detect the push and automatically re-deploy your site.

---

## Option 2: Netlify (Alternative)

Similar workflow if you prefer Netlify.

1.  Log in to Netlify with GitHub.
2.  "Add new site" -> "Import an existing project".
3.  Select GitHub -> `retrograde-lunar`.
4.  Netlify usually auto-detects Next.js.
5.  Click "Deploy Site".

---

## Pre-Deployment Check

Before relying on the cloud build, it's good practice to ensure your app builds locally to avoid errors online.

Run this command in your terminal:

```bash
npm run build
```

If this succeeds, your deployment will succeed.
