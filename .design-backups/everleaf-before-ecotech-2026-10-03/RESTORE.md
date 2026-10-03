# EverLeaf design restore point

This folder contains the website view templates, public CSS, JavaScript, and image assets as they were before the EcoTech redesign on 2026-10-03.

To restore those files from PowerShell at the project root, copy these backups back into `resources\views` and `public\css`, `public\js`, and `public\images` with `Copy-Item -Recurse -Force`. This reverts the website appearance without changing routes, database records, user accounts, or portfolio data.
