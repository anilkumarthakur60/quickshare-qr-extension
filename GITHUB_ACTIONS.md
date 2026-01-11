# GitHub Actions - Unified CI/CD Pipeline

This project uses a single unified GitHub Actions workflow (`ci-cd.yml`) that combines all validation, quality checks, security scans, and release automation in one place.

## 🎯 Single Unified Workflow: `ci-cd.yml`

All checks run in a single pipeline with multiple jobs visible in one UI.

### 📊 Pipeline Overview

```
┌─────────────────────────────────────────────────────────┐
│           QuickShare CI/CD Pipeline                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1️⃣  📋 Validate Extension Structure                    │
│      ├─ manifest.json validation                        │
│      ├─ Required files check                            │
│      ├─ Icons validation                                │
│      └─ Version check                                   │
│                    ↓                                     │
│  2️⃣  🔍 Code Quality Check                              │
│      ├─ JavaScript syntax                               │
│      ├─ CSS structure                                   │
│      ├─ HTML validity                                   │
│      └─ Debug statements                                │
│                    ↓                                     │
│  3️⃣  🔐 Security Checks                                 │
│      ├─ Secret scanning                                 │
│      ├─ Vulnerable patterns                             │
│      ├─ Dependency verification                         │
│      └─ Permission validation                           │
│                    ↓                                     │
│  4️⃣  📊 Pipeline Summary (Always)                       │
│      └─ Final status report                             │
│                    ↓                                     │
│  5️⃣  🚀 Create Release (On Version Tags Only)           │
│      ├─ Package extension                               │
│      ├─ Create GitHub Release                           │
│      └─ Upload assets                                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔥 Key Features

### ✅ **All-in-One View**

- See all checks in a single workflow UI
- One dashboard for complete pipeline status
- Easy to track all jobs at once

### 📊 **5 Integrated Jobs**

1. **Validate Extension** - Structure & file checks
2. **Code Quality** - Syntax & standards
3. **Security Checks** - Vulnerability scanning
4. **Pipeline Summary** - Final report (always runs)
5. **Create Release** - Only on version tags

### ⚙️ **Smart Triggers**

**When it runs:** `push`, `pull_request`, daily at midnight UTC

---

### 4. **Create Release** (`release.yml`)

Automatically creates a GitHub release when you push a version tag.

**Features:**

- ✅ Extracts version from git tag
- ✅ Creates release notes from commits
- ✅ Packages extension as ZIP file
- ✅ Uploads release assets
- ✅ Creates GitHub Release with details

**When it runs:** When you push a tag like `v1.0.0`, `v1.0.1`, etc.

---

## 🚀 How to Use

### Running Validation Locally

Before pushing, validate locally:

```bash
# Check manifest.json
python3 -m json.tool manifest.json

# Check required files exist
ls manifest.json popup.html popup.js popup.css qrcode.min.js README.md
```

### Creating a Release

To create a new release:

```bash
# Create a version tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push the tag to GitHub
git push origin v1.0.0
```

The GitHub Actions workflow will automatically:

1. Validate the extension
2. Run code quality checks
3. Create a GitHub Release
4. Generate a ZIP file
5. Publish release notes

### Version Format

Use semantic versioning: `v1.2.3`

- `v1.0.0` - Initial release
- `v1.0.1` - Bug fix
- `v1.1.0` - New feature
- `v2.0.0` - Major breaking changes

---

## 📊 Workflow Status

Check workflow status at: `https://github.com/anilkumarthakur60/quickshare-qr-extension/actions`

Each push and pull request will show:

- ✅ Pass (green) - All checks passed
- ❌ Fail (red) - Issues need fixing
- ⚠️ Warning (yellow) - Non-blocking warnings

---

## 🔧 Customizing Workflows

To modify workflows:

1. Edit the YAML file in `.github/workflows/`
2. Commit and push changes
3. Next workflow run will use updated configuration

### Common Customizations

**Change validation branch:**
Edit `validate.yml` line with `branches:`

**Add more security checks:**
Edit `security.yml` to add custom patterns

**Customize release notes:**
Edit `release.yml` body section

---

## 🐛 Troubleshooting Workflows

### Workflow not triggering

- Ensure files are in `.github/workflows/` directory
- Check branch names match trigger conditions
- Wait a few minutes after push

### Workflow failed

- Click on the failing step to see logs
- Check error messages for specific issues
- Fix locally and push again

### Release not creating

- Ensure tag format is correct (`v*.*.*`)
- Verify you have push permissions
- Check Actions tab for error details

---

## 📖 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Action Marketplace](https://github.com/marketplace?type=actions)

---

## 📝 Recommended Workflow

1. **Develop locally**

   ```bash
   git checkout -b feature/new-feature
   # Make changes
   ```

2. **Commit and push**

   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

3. **Workflows run automatically** ✅

   - Validation checks
   - Code quality checks
   - Security checks

4. **When ready to release**

   ```bash
   git tag -a v1.1.0 -m "Release v1.1.0"
   git push origin v1.1.0
   ```

5. **Release workflow creates GitHub Release** 🚀

---

**Last Updated:** January 11, 2026
