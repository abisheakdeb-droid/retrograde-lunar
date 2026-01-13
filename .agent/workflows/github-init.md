---
description: Initialize a new Git repository and prepare for push
---

1. Initialize git using `git init`.
2. Create a `.gitignore` file if one doesn't exist (node_modules, .env, .DS_Store, etc.).
3. Stage all files using `git add .`.
4. Commit the initial state using `git commit -m "feat: initial commit"`.
5. Create and push to a new GitHub repository using:
   `/Users/abisheakshill/.gemini/bin/gh repo create --public --source=. --push`
   _(This creates a public repo. Change to --private if needed)_
