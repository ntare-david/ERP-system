# Git Repository Setup Guide

## ✅ Initial Setup Complete

Your Git repository has been initialized and files have been staged. Here's what to do next:

## Step 1: Make Your First Commit

```bash
git commit -m "Initial commit: ORM Management System with FastAPI backend"
```

## Step 2: Configure Git (if not already done)

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Step 3: Connect to Remote Repository

### Option A: GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it (e.g., `orm-management-system`)
   - Don't initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Add the remote and push:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/orm-management-system.git
   git branch -M main
   git push -u origin main
   ```

### Option B: GitLab

1. **Create a new project on GitLab**
2. **Add the remote and push:**
   ```bash
   git remote add origin https://gitlab.com/YOUR_USERNAME/orm-management-system.git
   git branch -M main
   git push -u origin main
   ```

### Option C: Bitbucket

1. **Create a new repository on Bitbucket**
2. **Add the remote and push:**
   ```bash
   git remote add origin https://bitbucket.org/YOUR_USERNAME/orm-management-system.git
   git branch -M main
   git push -u origin main
   ```

## Step 4: Verify Remote Connection

```bash
git remote -v
```

## Common Git Commands

### Daily Workflow

```bash
# Check status
git status

# Add specific files
git add <filename>

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push

# Pull latest changes
git pull
```

### Branching

```bash
# Create a new branch
git checkout -b feature/your-feature-name

# Switch branches
git checkout main

# Merge branch
git checkout main
git merge feature/your-feature-name
```

### Viewing History

```bash
# View commit history
git log

# View changes
git diff

# View file history
git log --follow <filename>
```

## What's Included in .gitignore

The `.gitignore` file excludes:
- `node_modules/` - Node.js dependencies
- `backend/venv/` - Python virtual environment
- `*.db`, `*.sqlite` - Database files
- `.env` files - Environment variables
- Build outputs (`dist/`, `build/`)
- IDE files (`.vscode/`, `.idea/`)
- OS files (`.DS_Store`, `Thumbs.db`)

## Important Notes

1. **Never commit sensitive data:**
   - API keys
   - Passwords
   - Database credentials
   - `.env` files (already in .gitignore)

2. **Before pushing, make sure:**
   - All sensitive data is in `.env` files (not committed)
   - Database files are excluded
   - Dependencies are listed in `package.json` and `requirements.txt`

3. **If you need to remove a file from Git but keep it locally:**
   ```bash
   git rm --cached <filename>
   ```

## Troubleshooting

### If you get authentication errors:
- Use SSH keys or Personal Access Tokens
- For GitHub: https://docs.github.com/en/authentication

### If you need to change the remote URL:
```bash
git remote set-url origin NEW_URL
```

### If you want to see what will be committed:
```bash
git status
git diff --staged
```

