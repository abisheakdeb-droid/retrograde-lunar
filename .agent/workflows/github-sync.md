---
description: Sync current changes to GitHub and trigger Deployment (Build, Add, Commit, Push)
---

# GitHub Sync & Deploy Workflow

1.  **Pre-flight Check**:

    - Run `npm run build` to ensure the code is deployable.
    - If the build fails, STOP and notify the user.

2.  **Git Status**:

    - Run `git status` to see what will be committed.

3.  **Approve & Commit**:

    - Stage all changes: `git add .`
    - Commit with a descriptive message: `git commit -m "update: [summary of changes]"`

4.  **Push & Deploy**:
    - Push to main: `git push origin main`
    - This push acts as the trigger for connected CI/CD (Vercel/Netlify) to "update everywhere".

// turbo 5. Notify the user that changes are live (or building).
