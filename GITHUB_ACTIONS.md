# GitHub Actions Workflows

This project includes automated GitHub Actions workflows for validation, quality checks, and releases.

## 📋 Available Workflows

### 1. **Validate Extension** (`validate.yml`)

Runs on every push and pull request to validate the extension structure.

**Checks:**

- ✅ `manifest.json` exists and is valid JSON
- ✅ All required files present (popup.html, popup.js, popup.css, etc.)
- ✅ All required icons present (16x16, 48x48, 128x128)
- ✅ Manifest references are correct
- ✅ Version number is defined

**When it runs:** `push`, `pull_request`

---

### 2. **Code Quality Check** (`code-quality.yml`)

Runs on every push and pull request to check code quality.

**Checks:**

- ✅ JavaScript syntax validation
- ✅ CSS validation
- ✅ ESLint checks
- ✅ Debug statements (console.log)
- ✅ Code structure analysis

**When it runs:** `push`, `pull_request`

---

### 3. **Security Checks** (`security.yml`)

Runs on push, pull request, and daily schedule to check for security issues.

**Checks:**

- ✅ Exposed secrets detection
- ✅ Vulnerable patterns (eval, innerHTML)
- ✅ Dependency verification
- ✅ CSP directive validation
- ✅ Permission verification

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

Check workflow status at: `https://github.com/anilkumarthakur60/browser-extension/actions`

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
