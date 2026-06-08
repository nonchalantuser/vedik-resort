// Generate room pages script
const fs = require('fs');
const path = require('path');

const rooms = [
  { file: 'deluxe-room.html', name: 'Deluxe Room', roomId: '151976', bgColor: '#8B7355,#5C3D1E', desc: 'Classic comfort with nature-facing views and all modern conveniences. A warm sanctuary within the natural landscape of Vedik Resort.' },
  { file: 'deluxe-room-pool-view.html', name: 'Deluxe Room Pool View', roomId: '151979', bgColor: '#5C7B8B,#1E4C5C', desc: 'Wake up to shimmering pool vistas from this beautifully appointed room, combining classic Deluxe comfort with captivating water views.' },
  { file: 'loft-room.html', name: 'Loft Room', roomId: '151982', bgColor: '#7B6B55,#4C3D1E', desc: 'A signature Vedik offering — the double-level Loft Room creates a sense of dramatic space with sleeping loft above and living area below.' },
  { file: 'loft-room-with-pool-view.html', name: 'Loft Room with Pool View', roomId: '151985', bgColor: '#4B7B8B,#1E3C5C', desc: 'Elevated loft living combined with the beauty of resort pool views — double-level grandeur with a calming aquatic panorama.' },
  { file: 'suite.html', name: 'Suite', roomId: '151988', bgColor: '#8B6B3D,#5C3D0A', desc: 'The pinnacle of luxury at Vedik Resort — spacious, bespoke, and entirely private. A separate living room, premium amenities, and unmatched elegance.' }
];

rooms.forEach(room => {
  const bookingUrl = `https://www.swiftbook.io/inst/#home?propertyId=961MBc8zjq5WkDVLb3w9icviuqKVIHLVCbcgvCYAZqHXhlj9KsOETA4OTQ=&RoomID=${room.roomId}`;
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="description" content="${room.name} at Vedik Resort — ${room.desc} Located near Bharuch, Gujarat."/>
  <title>${room.name} — Vedik Resort | Bharuch, Gujarat</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Jost:wght@300;400;500;600&family=Great+Vibes&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="css/style.css"/>
  <link rel="stylesheet" href="css/nav.css"/>
  <link rel="stylesheet" href="css/hero.css"/>
  <link rel="stylesheet" href="css/sections.css"/>
  <link rel="stylesheet" href="css/footer.css"/>
  <link rel="stylesheet" href="css/responsive.css"/>
</head>
<body>
  <nav class="site-nav scrolled" id="siteNav">
    <div class="nav-inner">
      <div class="nav-logo"><a href="index.html" class="logo-link"><img src="logo.png" alt="Vedik Resort" class="logo-img" /></a></div>
      <ul class="nav-links">
        <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
        <li class="nav-item"><a href="accommodation.html" class="nav-link active">Accommodation <span class="nav-chevron">&#9662;</span></a><div class="nav-dropdown"><a href="deluxe-room.html">Deluxe Room</a><a href="deluxe-room-pool-view.html">Deluxe Room Pool View</a><a href="loft-room.html">Loft Room</a><a href="loft-room-with-pool-view.html">Loft Room with Pool View</a><a href="suite.html">Suite</a></div></li>
        <li class="nav-item"><a href="index.html#facilities" class="nav-link">Facilities</a></li>
        <li class="nav-item"><a href="pure-veg-restaurant-namak.html" class="nav-link">Dining</a></li>
        <li class="nav-item"><a href="eventswedding.html" class="nav-link">Events &amp; Weddings</a></li>
        <li class="nav-item"><a href="gallery.html" class="nav-link">Gallery</a></li>
        <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
      </ul>
      <div class="nav-right"><a href="tel:+70480333000" class="nav-phone">+70480333000</a><div class="nav-divider"></div><a href="${bookingUrl}" class="btn btn-primary" target="_blank" rel="noopener">BOOK NOW</a></div>
      <button class="nav-hamburger" id="navHamburger" aria-label="Toggle Menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </nav>
  <div class="mobile-nav" id="mobileNav" aria-hidden="true"><button class="mobile-nav-close" id="mobileNavClose">&#x2715;</button><ul class="mobile-nav-links"><li><a href="index.html">Home</a></li><li><a href="accommodation.html">Accommodation</a></li><li><a href="contact.html">Contact</a></li></ul><div class="mobile-nav-book"><a href="${bookingUrl}" class="btn btn-primary" target="_blank" rel="noopener">BOOK NOW</a></div></div>

  <section class="page-hero" aria-label="${room.name} Hero">
    <div class="page-hero-bg"><div style="width:100%;height:100%;background:linear-gradient(160deg,${room.bgColor});position:relative;"><div style="position:absolute;inset:0;background-image:radial-gradient(circle, rgba(200,146,42,0.07) 1px, transparent 1px);background-size:28px 28px;"></div></div></div>
    <div class="page-hero-overlay"></div>
    <div class="page-hero-content">
      <span class="eyebrow">VEDIK RESORT &#183; ACCOMMODATION</span>
      <h1>${room.name}</h1>
      <p style="font-family:'Jost',sans-serif;font-size:16px;color:rgba(255,255,255,0.8);margin-top:12px;max-width:500px;">${room.desc}</p>
    </div>
  </section>

  <section class="section section--stone" aria-labelledby="roomDetailHeading${room.roomId}">
    <div class="container">
      <div style="display:grid;grid-template-columns:3fr 2fr;gap:64px;align-items:start;">
        <div class="fade-in-up">
          <span class="eyebrow">ROOM DETAILS</span>
          <div class="gold-rule"></div>
          <h2 id="roomDetailHeading${room.roomId}" style="color:var(--burgundy-deep);margin-bottom:20px;">${room.name}</h2>
          <p style="margin-bottom:20px;color:var(--text-muted);line-height:1.9;">${room.desc} Each room at Vedik Resort is thoughtfully designed to blend contemporary comforts with the warmth of traditional Indian hospitality. Surrounded by nature, every room is a retreat within a retreat.</p>
          <p style="margin-bottom:28px;color:var(--text-muted);line-height:1.9;">Our rooms are designed to provide the utmost comfort while maintaining a strong connection to the natural surroundings. You'll find an Ethno-Modern aesthetic throughout — where traditional Indian design sensibilities meet contemporary luxury.</p>
          <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px;">
            <span class="badge-pill">&#128248; Complimentary Wi-Fi</span>
            <span class="badge-pill">&#10052;&#65039; Air Conditioning</span>
            <span class="badge-pill">&#128250; Smart TV</span>
            <span class="badge-pill">&#128704; En-suite Bathroom</span>
            <span class="badge-pill">&#9749; Minibar</span>
            <span class="badge-pill">&#128274; In-room Safe</span>
            <span class="badge-pill">&#128222; Direct Dial Phone</span>
            <span class="badge-pill">&#127807; Nature Views</span>
          </div>
          <div class="room-detail-gallery" style="margin-bottom:28px;">
            <div class="gallery-thumb"><div style="width:100%;height:100%;min-height:100px;background:linear-gradient(160deg,${room.bgColor});opacity:0.9;"></div></div>
            <div class="gallery-thumb"><div style="width:100%;height:100%;min-height:100px;background:linear-gradient(160deg,${room.bgColor});filter:brightness(0.8);"></div></div>
            <div class="gallery-thumb"><div style="width:100%;height:100%;min-height:100px;background:linear-gradient(160deg,${room.bgColor});filter:brightness(0.65);"></div></div>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <a href="${bookingUrl}" class="btn btn-primary" target="_blank" rel="noopener">Book This Room</a>
            <a href="accommodation.html" class="btn btn-secondary">View All Rooms</a>
          </div>
        </div>
        <div style="background:var(--white);border-radius:4px;padding:36px;box-shadow:0 8px 40px rgba(92,26,34,0.08);border-top:3px solid var(--gold-primary);position:sticky;top:100px;" class="fade-in-up">
          <h3 style="color:var(--burgundy-deep);margin-bottom:8px;">${room.name}</h3>
          <p style="font-family:'Jost',sans-serif;font-size:13px;color:var(--text-muted);margin-bottom:24px;">Check availability and book directly for best rates.</p>
          <div style="margin-bottom:16px;">
            <label for="roomCheckIn${room.roomId}" style="display:block;font-family:'Jost',sans-serif;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.15em;color:var(--gold-primary);margin-bottom:6px;">Check-In</label>
            <input type="date" id="roomCheckIn${room.roomId}" style="width:100%;font-family:'Jost',sans-serif;font-size:14px;padding:12px;border:1.5px solid rgba(200,146,42,0.3);border-radius:2px;outline:none;background:var(--ivory);color:var(--charcoal);"/>
          </div>
          <div style="margin-bottom:24px;">
            <label for="roomCheckOut${room.roomId}" style="display:block;font-family:'Jost',sans-serif;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.15em;color:var(--gold-primary);margin-bottom:6px;">Check-Out</label>
            <input type="date" id="roomCheckOut${room.roomId}" style="width:100%;font-family:'Jost',sans-serif;font-size:14px;padding:12px;border:1.5px solid rgba(200,146,42,0.3);border-radius:2px;outline:none;background:var(--ivory);color:var(--charcoal);"/>
          </div>
          <a href="${bookingUrl}" class="btn btn-primary" target="_blank" rel="noopener" style="width:100%;justify-content:center;display:flex;">Book This Room</a>
          <div style="margin-top:20px;text-align:center;">
            <a href="contact.html" style="font-family:'Jost',sans-serif;font-size:12px;color:var(--gold-primary);">Need help? Contact Us &#8594;</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="site-footer" role="contentinfo">
    <div class="footer-grid">
      <div class="footer-col footer-brand"><a href="index.html" class="logo-link"><img src="logo.png" alt="Vedik Resort" class="logo-img" /></a><p class="footer-unit-text">A Unit of Four Seasons Inns &amp; Suites Pvt. Ltd.</p><div class="footer-brand-rule"></div><p class="footer-brand-desc">A hidden gem in the lap of nature.</p></div>
      <div class="footer-col"><div class="footer-col-heading">Explore</div><nav class="footer-links"><a href="index.html">Home</a><a href="accommodation.html">Accommodation</a><a href="pure-veg-restaurant-namak.html">Dining</a><a href="eventswedding.html">Events</a><a href="gallery.html">Gallery</a><a href="contact.html">Contact</a></nav></div>
      <div class="footer-col"><div class="footer-col-heading">Our Rooms</div><nav class="footer-links"><a href="deluxe-room.html">Deluxe Room</a><a href="deluxe-room-pool-view.html">Deluxe Room Pool View</a><a href="loft-room.html">Loft Room</a><a href="loft-room-with-pool-view.html">Loft Room with Pool View</a><a href="suite.html">Suite</a></nav></div>
      <div class="footer-col"><div class="footer-col-heading">Reservations</div><p class="footer-address">Survey No-16, Dipak-Sahid Road,<br>Bharuch, Gujarat</p><a href="tel:+70480333000" class="footer-contact-item"><span class="icon">&#128222;</span> +70480333000</a><a href="mailto:reservation@vedikresort.com" class="footer-contact-item"><span class="icon">&#128231;</span> reservation@vedikresort.com</a><hr class="footer-rule"/><a href="${bookingUrl}" class="btn btn-primary" target="_blank" rel="noopener">Book This Room</a></div>
    </div>
    <div class="footer-bottom"><div class="footer-bottom-left"><span>&#169; 2026 Vedik Resort &#183; All Rights Reserved</span><span class="footer-bottom-sep">&#183;</span><a href="privacy-policy.html">Privacy Policy</a></div><div class="footer-bottom-right">Powered by STAAH &#183; Designed with Purpose</div></div>
  </footer>
  <div class="mobile-booking-bar" id="mobileBookingBar"><span>${room.name}</span><a href="${bookingUrl}" class="btn btn-primary" target="_blank" rel="noopener">BOOK NOW</a></div>
  <script src="js/main.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, room.file), html, 'utf8');
  console.log('Created: ' + room.file);
});

console.log('All room pages created!');
