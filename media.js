/* ============================================================
   media.js: the only file you need to edit to add your work.

   1. Export your file into the right folder (README.md has the sizes).
   2. Change one line below. Order here = order on the site.

   ratio = width / height
     3:2 horizontal  1.5      2:3 vertical   0.667
     16:9 video      1.778    9:16 vertical  0.5625
     4:5 vertical    0.8      2.39:1 wide    2.39

   PLACEHOLDERS: every picsum.photos link below is a random stock
   photo standing in for your work. Replace each one with your own
   file, e.g. "media/photos/full/01.webp". A video with an empty src
   opens a moving placeholder in the player.
   ============================================================ */

window.LINKS = {
  instagram: "https://instagram.com/YOUR_HANDLE",   // your Instagram
  tiktok: "https://www.tiktok.com/@YOUR_HANDLE"     // your TikTok
};

window.MEDIA = {

  /* PHOTOS: full size in media/photos/full/ (2400px long edge),
     thumbnails in media/photos/thumb/ (800px long edge).
     alt = a short description for screen readers, never shown.
     featured: true puts it in the strip at the end of the Home scroll (first 4). */
  photos: [
    // YOUR FILE LOOKS LIKE: { src: "media/photos/full/01.webp", thumb: "media/photos/thumb/01.webp", ratio: 1.5, alt: "Red coupe on an empty road at dusk", featured: true },
    { src: "https://picsum.photos/seed/ak-coastal-road-dusk/1600/1067", thumb: "https://picsum.photos/seed/ak-coastal-road-dusk/800/533", ratio: 1.5, alt: "", featured: true },
    { src: "https://picsum.photos/seed/ak-redwood-fog/1067/1600", thumb: "https://picsum.photos/seed/ak-redwood-fog/534/800", ratio: 0.667, alt: "", featured: true },
    { src: "https://picsum.photos/seed/ak-desert-highway/1600/1067", thumb: "https://picsum.photos/seed/ak-desert-highway/800/533", ratio: 1.5, alt: "", featured: true },
    { src: "https://picsum.photos/seed/ak-night-garage-lights/1600/900", thumb: "https://picsum.photos/seed/ak-night-garage-lights/800/450", ratio: 1.778, alt: "", featured: true },
    { src: "https://picsum.photos/seed/ak-snow-ridge/1280/1600", thumb: "https://picsum.photos/seed/ak-snow-ridge/640/800", ratio: 0.8, alt: "" },
    { src: "https://picsum.photos/seed/ak-pacific-cliffs/1600/1067", thumb: "https://picsum.photos/seed/ak-pacific-cliffs/800/533", ratio: 1.5, alt: "" },
    { src: "https://picsum.photos/seed/ak-city-alley-night/1067/1600", thumb: "https://picsum.photos/seed/ak-city-alley-night/534/800", ratio: 0.667, alt: "" },
    { src: "https://picsum.photos/seed/ak-canyon-rust/1600/1067", thumb: "https://picsum.photos/seed/ak-canyon-rust/800/533", ratio: 1.5, alt: "" },
    { src: "https://picsum.photos/seed/ak-salt-flats-wide/1600/669", thumb: "https://picsum.photos/seed/ak-salt-flats-wide/800/335", ratio: 2.39, alt: "" },
    { src: "https://picsum.photos/seed/ak-pine-trail/1067/1600", thumb: "https://picsum.photos/seed/ak-pine-trail/534/800", ratio: 0.667, alt: "" },
    { src: "https://picsum.photos/seed/ak-dunes-morning/1600/1067", thumb: "https://picsum.photos/seed/ak-dunes-morning/800/533", ratio: 1.5, alt: "" },
    { src: "https://picsum.photos/seed/ak-parked-classic/1600/1280", thumb: "https://picsum.photos/seed/ak-parked-classic/800/640", ratio: 1.25, alt: "" },
    { src: "https://picsum.photos/seed/ak-mountain-lake/1280/1600", thumb: "https://picsum.photos/seed/ak-mountain-lake/640/800", ratio: 0.8, alt: "" },
    { src: "https://picsum.photos/seed/ak-harbor-blue/1600/1067", thumb: "https://picsum.photos/seed/ak-harbor-blue/800/533", ratio: 1.5, alt: "" },
    { src: "https://picsum.photos/seed/ak-tunnel-headlights/1600/900", thumb: "https://picsum.photos/seed/ak-tunnel-headlights/800/450", ratio: 1.778, alt: "" },
    { src: "https://picsum.photos/seed/ak-rooftop-dusk/1067/1600", thumb: "https://picsum.photos/seed/ak-rooftop-dusk/534/800", ratio: 0.667, alt: "" },
    { src: "https://picsum.photos/seed/ak-valley-sunset/1600/1067", thumb: "https://picsum.photos/seed/ak-valley-sunset/800/533", ratio: 1.5, alt: "" },
    { src: "https://picsum.photos/seed/ak-forest-road/1600/1067", thumb: "https://picsum.photos/seed/ak-forest-road/800/533", ratio: 1.5, alt: "" }
  ],

  /* VIDEOS: everything in media/video/
     group: "intro" puts it in Intros, anything else goes in Clips.
     preview = a 3-4 second muted loop that plays on hover (desktop only). */
  videos: [
    // YOUR FILE LOOKS LIKE: { src: "media/video/intro-01.mp4", preview: "media/video/intro-01-preview.mp4", poster: "media/video/intro-01.jpg", ratio: 1.778, duration: "00:00:12", group: "intro" },
    { src: "", preview: "", poster: "https://picsum.photos/seed/ak-v-night-drive/960/540", ratio: 1.778, duration: "00:00:12", group: "intro" },
    { src: "", preview: "", poster: "https://picsum.photos/seed/ak-v-rust-garage/960/540", ratio: 1.778, duration: "00:00:09", group: "intro" },
    { src: "", preview: "", poster: "https://picsum.photos/seed/ak-v-neon-street/960/402", ratio: 2.39, duration: "00:00:15", group: "intro" },
    { src: "", preview: "", poster: "https://picsum.photos/seed/ak-v-ocean-vertical/540/960", ratio: 0.5625, duration: "00:00:21" },
    { src: "", preview: "", poster: "https://picsum.photos/seed/ak-v-forest-pan/960/540", ratio: 1.778, duration: "00:00:31" },
    { src: "", preview: "", poster: "https://picsum.photos/seed/ak-v-snow-vertical/540/960", ratio: 0.5625, duration: "00:00:15" },
    { src: "", preview: "", poster: "https://picsum.photos/seed/ak-v-desert-run/960/540", ratio: 1.778, duration: "00:00:18" },
    { src: "", preview: "", poster: "https://picsum.photos/seed/ak-v-dusk-vertical/540/960", ratio: 0.5625, duration: "00:00:11" },
    { src: "", preview: "", poster: "https://picsum.photos/seed/ak-v-city-night/960/540", ratio: 1.778, duration: "00:00:24" }
  ],

  /* HOME: the looping background video. 1080p H.264 MP4, 6-12 s, no audio, under 8 MB.
     poster = a still from it. Phones on data saver only get the poster. */
  hero: { src: "", poster: "https://picsum.photos/seed/ak-hero-road/1920/1080" },   // yours: { src: "media/video/hero.mp4", poster: "media/video/hero.jpg" }

  /* ABOUT: a 4:5 photo of you */
  about: { portrait: "https://picsum.photos/seed/ak-portrait/1200/1500" }             // yours: { portrait: "media/about/amar.webp" }
};
