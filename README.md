# Wedding Invite

Static wedding invitation site for GitHub Pages.

## Publish To GitHub Pages

1. Create a new empty GitHub repository.
2. In this folder, connect the remote:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

3. Commit the site:

```bash
git add .
git commit -m "Initial wedding invite site"
```

4. Push it:

```bash
git push -u origin main
```

5. In GitHub, open `Settings -> Pages`.
6. Under `Build and deployment`, set:
   `Source: Deploy from a branch`
7. Set:
   `Branch: main`
   `Folder: / (root)`
8. Save.

GitHub will publish the site at:

`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`

## Notes

- This site already uses relative asset paths, so it is safe for GitHub Pages hosting.
- `.nojekyll` is included so GitHub Pages serves the site as plain static files.
- If you update videos or media and do not see changes, do a hard refresh once.
