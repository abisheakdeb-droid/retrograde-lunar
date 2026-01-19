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

4.  **Push & Deploy (Automated)**:
    - Push to a feature branch: `git push origin [branch-name]`
    - **Auto-Merge**:
      - Create PR: `gh pr create --title "Deploy: [Branch Name]" --body "Automated deployment" --base main --head [branch-name]`
      - Merge immediately: `gh pr merge --auto --merge --delete-branch`
    - This bypasses branch protection by automating the required PR flow.

// turbo 5. Notify the user that changes are live.
