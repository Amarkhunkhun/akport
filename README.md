# akport

Portfolio site for Amar Khunkhun: photos and video. Plain HTML, CSS and JavaScript with no build step, hosted on GitHub Pages.

## Put it online

1. Create a public repo on GitHub called `akport`.
2. Upload everything in this folder to it, keeping the folders as they are. `.nojekyll` is a hidden file, so make sure it goes up too. Dragging the folder onto the repo's "Add file → Upload files" page works. On a Mac, press Cmd+Shift+. in Finder first so hidden files show.
3. In the repo go to **Settings → Pages**. Under "Build and deployment" pick **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/akport/`.

## Add your work

All photos, videos and links come from **`media.js`**. You never have to touch the HTML.

1. Export the file at the size in the table below and drop it into its folder under `media/`.
2. Open `media.js` and fill in that entry's `src` (plus `thumb`, `poster` or `preview` where it applies) and the `ratio` (width ÷ height).
3. Delete the `tone: "…"` bit from that entry. It only colors the placeholder.
4. Commit. The live site updates within a few minutes.

To add a photo, copy a line and add it where you want it in the order. To remove one, delete its line. Your Instagram and TikTok links are at the top of the same file.

| what | folder | size | format | aim for |
| --- | --- | --- | --- | --- |
| photo | `media/photos/full/` | 2400px long edge | WebP | ~500 KB |
| photo thumbnail | `media/photos/thumb/` | 800px long edge | WebP | ~120 KB |
| home video | `media/video/` | 1920×1080, 6–12 s, no audio | MP4 (H.264) | under 8 MB |
| home video poster | `media/video/` | 1920×1080 still | JPG | ~150 KB |
| video | `media/video/` | up to 1080p | MP4 (H.264) | under 50 MB |
| hover preview | `media/video/` | 480p, 3–4 s, no audio | MP4 (H.264) | under 600 KB |
| video poster | `media/video/` | same shape as the video | JPG | ~150 KB |
| portrait | `media/about/` | 1200×1500 (4:5) | WebP | ~200 KB |

GitHub rejects any file over 100 MB. If a full-length video is bigger than that, upload it to YouTube or Vimeo as unlisted instead.

[Squoosh](https://squoosh.app) is a free, quick way to make WebP files and thumbnails in the browser. HandBrake handles MP4s (use the "Fast 1080p30" preset, then turn the audio off).

## Your own domain

1. Add a file called `CNAME` at the root containing just your domain, e.g. `amarkhunkhun.com`.
2. At your domain registrar, add four `A` records for the bare domain pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, plus a `CNAME` record for `www` pointing to `YOUR-USERNAME.github.io`.
3. In **Settings → Pages**, enter the domain, wait for the check to pass, then tick **Enforce HTTPS**.

The custom 404 page ("Lost frame") only gets its styling once you're on your own domain. At `github.io/akport/` it still shows, just unstyled.

## Files

```
index.html          Home: hero video + name scroll
photos/index.html   Photo grid + lightbox
videos/index.html   Intros, clips + player
about/index.html    Portrait, bio, links  ← your longer paragraph goes here
404.html            Lost frame
media.js            ← all your photos, videos and links
tokens.css          colors, type, spacing, timing (edit to retheme)
styles.css          every component's styles
main.js             behaviour: shutter, grid, lightbox, scroll
media/              your files
```

To test on your computer, run `python3 -m http.server` inside this folder and open `http://localhost:8000`.
