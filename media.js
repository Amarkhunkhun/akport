/* ============================================================
   media.js — the only file you need to edit to add work.

   1. Export your file into the right folder (see README.md for sizes).
   2. Add one line below. Order here = order on the site.

   ratio = width ÷ height
     3:2 horizontal  1.5      2:3 vertical   0.667
     16:9 video      1.778    9:16 vertical  0.5625
     4:5 vertical    0.8      2.39:1 wide    2.39

   Leave src empty ("") and the site shows a placeholder tile instead.
   "tone" only colors that placeholder; delete it once you add a real file.
   ============================================================ */

window.LINKS = {
  instagram: "https://instagram.com/YOUR_HANDLE",   // ← your Instagram
  tiktok: "https://www.tiktok.com/@YOUR_HANDLE"     // ← your TikTok
};

window.MEDIA = {

  /* PHOTOS — full size in media/photos/full/, thumbnails in media/photos/thumb/
     featured: true → shows in the strip at the end of the Home scroll (first 4 used) */
  photos: [
    // REAL EXAMPLE: { src: "media/photos/full/01.webp", thumb: "media/photos/thumb/01.webp", ratio: 1.5, alt: "Red coupe on an empty road at dusk", featured: true },
    { src: "", thumb: "", ratio: 1.5,   alt: "", tone: "dusk",   featured: true },
    { src: "", thumb: "", ratio: 0.667, alt: "", tone: "forest", featured: true },
    { src: "", thumb: "", ratio: 1.5,   alt: "", tone: "desert", featured: true },
    { src: "", thumb: "", ratio: 1.778, alt: "", tone: "neon",   featured: true },
    { src: "", thumb: "", ratio: 0.8,   alt: "", tone: "snow" },
    { src: "", thumb: "", ratio: 1.5,   alt: "", tone: "ocean" },
    { src: "", thumb: "", ratio: 0.667, alt: "", tone: "night" },
    { src: "", thumb: "", ratio: 1.5,   alt: "", tone: "rust" },
    { src: "", thumb: "", ratio: 2.39,  alt: "", tone: "dusk" },
    { src: "", thumb: "", ratio: 0.667, alt: "", tone: "forest" },
    { src: "", thumb: "", ratio: 1.5,   alt: "", tone: "desert" },
    { src: "", thumb: "", ratio: 1.25,  alt: "", tone: "neon" },
    { src: "", thumb: "", ratio: 0.8,   alt: "", tone: "snow" },
    { src: "", thumb: "", ratio: 1.5,   alt: "", tone: "ocean" },
    { src: "", thumb: "", ratio: 1.778, alt: "", tone: "night" },
    { src: "", thumb: "", ratio: 0.667, alt: "", tone: "rust" },
    { src: "", thumb: "", ratio: 1.5,   alt: "", tone: "dusk" },
    { src: "", thumb: "", ratio: 1.5,   alt: "", tone: "forest" }
  ],

  /* VIDEOS — everything in media/video/
     group: "intro" → Intros section. Anything else → Clips.
     preview = a 3–4 second muted loop that plays on hover (desktop only). */
  videos: [
    // REAL EXAMPLE: { src: "media/video/intro-01.mp4", preview: "media/video/intro-01-preview.mp4", poster: "media/video/intro-01.jpg", ratio: 1.778, duration: "00:00:12", group: "intro" },
    { src: "", preview: "", poster: "", ratio: 1.778,  duration: "00:00:12", group: "intro", tone: "night" },
    { src: "", preview: "", poster: "", ratio: 1.778,  duration: "00:00:09", group: "intro", tone: "rust" },
    { src: "", preview: "", poster: "", ratio: 2.39,   duration: "00:00:15", group: "intro", tone: "neon" },
    { src: "", preview: "", poster: "", ratio: 0.5625, duration: "00:00:21", tone: "ocean" },
    { src: "", preview: "", poster: "", ratio: 1.778,  duration: "00:00:31", tone: "forest" },
    { src: "", preview: "", poster: "", ratio: 0.5625, duration: "00:00:15", tone: "snow" },
    { src: "", preview: "", poster: "", ratio: 1.778,  duration: "00:00:18", tone: "desert" },
    { src: "", preview: "", poster: "", ratio: 0.5625, duration: "00:00:11", tone: "dusk" },
    { src: "", preview: "", poster: "", ratio: 1.778,  duration: "00:00:24", tone: "night" }
  ],

  /* HOME — the looping background video. 1080p H.264 MP4, 6–12 s, no audio, under 8 MB.
     poster is a still from it; phones on data saver get only the poster. */
  hero: { src: "", poster: "" },        // e.g. { src: "media/video/hero.mp4", poster: "media/video/hero.jpg" }

  /* ABOUT — a 4:5 photo of you */
  about: { portrait: "" }               // e.g. { portrait: "media/about/amar.webp" }
};
