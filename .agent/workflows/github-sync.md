---
description: Sync current changes to GitHub (Add, Commit, Push)
---

1. Check the current git status to see modified files.
2. Stage all changes using `git add .`.
3. Generate a descriptive commit message based on the recent changes.
4. Commit the changes using `git commit -m "your generated message"`.
5. Check if `gh` is installed and authenticated using `gh auth status`.
6. If authenticated, push using `git push`.
7. If not, prompt the user or just `git push` and hope for SSH keys.
