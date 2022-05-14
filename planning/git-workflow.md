## git workflow notes

- always work on branch, not on master
- branch naming convention:
  - feature/description-here
  - fix/other-description-here

From terminal:
- git pull origin main
- git status, confirm clean
- git checkout -b <new-branch>
- git status, confirm on new branch

<<do work>>

- git add . (to commit all)
- git add <files> (to commit certain files
- git commit -m "Message here"

<<complete work>>

- from branch, git merge main
  - if conflicts, will show right there & fix in vscode
  - other adv is can run code to confirm conflict 
- this keeps us on existing branch
- fix any conflicts
- run code to confirm it works

- check-in with team
- git push origin <branch-name>

From github:
- if no conflicts, follow instructions to create pull/merge with main
- if conflicts:
  - caution
  - communicate
  - compare

Back to terminal:
- git checkout main
- git pull origin main
- double-check that new work is shown on main
- if needed, delete branch:
  - git branch -d <branch-name>
  - or keep branch & continue working on it

