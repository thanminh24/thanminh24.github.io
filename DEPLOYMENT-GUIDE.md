# GitHub Pages Deployment Guide - Step by Step
# Portfolio: thanminh24.github.io

## OPTION 1: Using GitHub Desktop (Easiest - Recommended)

### Step 1: Install GitHub Desktop
1. Download from: https://desktop.github.com/
2. Install and sign in with your GitHub account

### Step 2: Create Repository on GitHub
1. Go to: https://github.com/new
2. **Repository name**: `thanminh24.github.io`
3. **Visibility**: Public
4. **DO NOT** check "Add a README file"
5. Click **Create repository**

### Step 3: Publish with GitHub Desktop
1. Open **GitHub Desktop**
2. Click **File** → **Add Local Repository**
3. Click **Choose...** and select: `d:\Personal\Github_Pages`
4. If prompted "This directory does not appear to be a Git repository":
   - Click **Create a Repository**
   - Name: `thanminh24.github.io`
   - Local Path: `d:\Personal\Github_Pages`
   - Click **Create Repository**
5. In the left sidebar:
   - ✓ All files should be checked
   - Bottom left: Enter commit message: "Initial portfolio website"
   - Click **Commit to main**
6. Click **Publish repository** (top bar)
7. Repository name: `thanminh24.github.io`
8. **Uncheck** "Keep this code private"
9. Click **Publish repository**

### Step 4: Upload Resume to GitHub Releases
1. Go to: https://github.com/thanminh24/thanminh24.github.io/releases/new
2. **Tag version**: `resume-v1`
3. **Release title**: `Resume v1.0`
4. **Description**: `Updated resume - December 2024`
5. Click **Attach binaries by dropping them here**
6. Upload your `resume.pdf` file
7. Click **Publish release**

### Step 5: Enable GitHub Pages
1. Go to: https://github.com/thanminh24/thanminh24.github.io/settings/pages
2. Under **Source**: Select `Deploy from a branch`
3. **Branch**: Select `main` and `/ (root)`
4. Click **Save**
5. Wait 2-3 minutes

### ✅ Done!
Your website will be live at: **https://thanminh24.github.io**

---

## OPTION 2: Using Git Command Line (Advanced)

### Step 1: Install Git
1. Download from: https://git-scm.com/download/win
2. Install with default settings
3. Restart PowerShell/Terminal

### Step 2: Configure Git (First time only)
```powershell
git config --global user.name "Thân Tuệ Minh"
git config --global user.email "minhthan189@gmail.com"
```

### Step 3: Initialize and Push
```powershell
# Navigate to your project
cd "d:\Personal\Github_Pages"

# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial portfolio website - Professional AI/ML portfolio"

# Set default branch to main
git branch -M main

# Add remote (replace with your repo URL if different)
git remote add origin https://github.com/thanminh24/thanminh24.github.io.git

# Push to GitHub
git push -u origin main
```

### Step 4: Create GitHub Release for Resume
```powershell
# If you have GitHub CLI installed
gh release create resume-v1 `
  --title "Resume v1.0" `
  --notes "Updated resume - December 2024" `
  resume.pdf
```

OR manually via web:
1. Go to: https://github.com/thanminh24/thanminh24.github.io/releases/new
2. Follow steps from Option 1, Step 4

### Step 5: Enable GitHub Pages
Same as Option 1, Step 5

---

## OPTION 3: Using VS Code (If you have VS Code)

### Step 1: Open Folder in VS Code
1. Open VS Code
2. File → Open Folder
3. Select: `d:\Personal\Github_Pages`

### Step 2: Initialize Git
1. Click **Source Control** icon (left sidebar)
2. Click **Initialize Repository**
3. Enter commit message: "Initial portfolio website"
4. Click the **✓** (checkmark) to commit

### Step 3: Publish to GitHub
1. Click **Publish to GitHub** (appears in Source Control)
2. Choose **Publish to GitHub public repository**
3. Repository name: `thanminh24.github.io`
4. Select all files
5. Click **OK**

### Step 4: Upload Resume & Enable Pages
Same as Option 1, Steps 4 & 5

---

## 📋 Files That Will Be Deployed

✅ **Included** (will be uploaded):
- index.html
- style.css
- script.js
- resume-config.js
- profile.jpg
- .gitignore
- DEPLOYMENT-GUIDE.md
- WALKTHROUGH.md
- RESUME-UPDATE-GUIDE.md
- agents.md
- cv_text.txt

❌ **Excluded** (won't be uploaded, thanks to .gitignore):
- resume.pdf (will use GitHub Releases instead)
- Any other PDF files

---

## 🔧 Troubleshooting

### Issue: "Repository already exists"
**Solution**: Use a different name or delete the existing repo on GitHub

### Issue: "Permission denied"
**Solution**: 
1. Go to: https://github.com/settings/tokens
2. Generate a personal access token
3. Use token as password when pushing

### Issue: "Failed to push"
**Solution**: Make sure repository name is exactly: `thanminh24.github.io`

### Issue: GitHub Pages not working
**Solution**:
1. Wait 5 minutes (first deployment takes time)
2. Check Settings → Pages shows green checkmark
3. Hard refresh: Ctrl + Shift + R

---

## 🎯 After Deployment

### Update Resume (Future)
1. Upload new PDF to GitHub Releases with new tag (e.g., `resume-v2`)
2. Edit `resume-config.js`: Change `tag: 'resume-v1'` to `tag: 'resume-v2'`
3. Commit and push changes

### Update Portfolio Content
1. Make changes to HTML/CSS/JS files
2. In GitHub Desktop: Write commit message → Commit → Push
3. Changes go live in ~1 minute

---

## ✅ Verification Checklist

After deployment, verify:
- [ ] Website loads at: https://thanminh24.github.io
- [ ] All sections appear correctly
- [ ] Theme toggle works
- [ ] Navigation scroll tracking works
- [ ] Resume button downloads PDF
- [ ] Facebook, GitHub, Email links work
- [ ] Mobile responsive design works
- [ ] Profile picture displays

---

## 🚀 Your Portfolio URLs

**Website**: https://thanminh24.github.io  
**Repository**: https://github.com/thanminh24/thanminh24.github.io  
**Resume**: https://github.com/thanminh24/thanminh24.github.io/releases/download/resume-v1/resume.pdf

---

**Need Help?** If any step fails, let me know which option you're using and what error you see!
