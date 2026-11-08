# Santwana & Neeraj — Wedding Invitation Website

A mobile-first static wedding invitation built with HTML, CSS and vanilla JavaScript.

## Preview locally
1. Unzip the project.
2. Open `index.html` in a modern browser.
3. For best results, run a simple local server (for example, VS Code Live Server).

## Included
- Original invitation card and five supplied couple photographs (optimized WebP).
- Uploaded background audio converted to MP3 for wider browser support.
- Live countdown to 3 January 2027, 11:30 AM IST.
- Google Maps directions using the link supplied by you.
- WhatsApp sharing and copy-link controls.
- QR code generated from the live page URL.
- Responsive gallery with photo lightbox.
- RSVP form interface (see connection note below).

## Important: connect RSVP before publishing
The RSVP form currently validates the guest's details and prepares a response locally. It does **not** transmit or store responses yet.

Recommended free option:
1. Create a Google Form with fields for guest name, attendance, guest count and message.
2. Publish the form and copy its responder URL.
3. In `script.js`, set `RSVP_FORM_URL` to that URL.
4. Test the form on a phone and confirm that responses appear in the linked Google Sheet.

For a fully prefilled Google Form, you can replace the simple redirect in the submit handler with a Google Forms `formResponse` URL and the form's actual `entry.xxxxx` field IDs. Do not add private credentials to this static site.

## Music
The audio file supplied in this conversation has been converted to `assets/sneham-cherum-neram.mp3`. Browsers generally require a user tap before audio can start; the Music On/Off control handles this.

## QR code
The QR code is generated from the current page URL. It will show the correct shareable QR after the site is deployed to its final public URL and opened online. It uses the QR Server image endpoint, so the guest's browser needs an internet connection to load the QR image.

## Publish free with GitHub Pages
1. Sign in to GitHub and create a new **public** repository, for example `santwana-neeraj-invitation`.
2. Upload all files and folders from this project. Keep `index.html` at the repository root.
3. Open repository **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save.
6. Wait for GitHub Pages to publish. Your URL will look like `https://YOUR-USERNAME.github.io/santwana-neeraj-invitation/`.
7. Open that URL on an iPhone and Android phone; test the music button, maps, WhatsApp share, QR and RSVP.
8. Share the URL in WhatsApp.

## Editing details
- Text, names, addresses and event information: edit `index.html`.
- Colours, typography, spacing and responsive layout: edit `style.css`.
- Countdown date, RSVP destination, music and sharing logic: edit `script.js`.
- Replace photographs/audio in `assets/` while keeping the same filenames, or update the corresponding paths in `index.html` / `script.js`.

## Mobile test checklist
- Check widths around 360, 390, 412 and 430 px.
- Confirm there is no horizontal scrolling.
- Check the hero image focal point and invitation-card readability.
- Tap music control and confirm sound starts only after the tap.
- Open directions in Google Maps.
- Test WhatsApp sharing and copy link.
- Confirm the deployed QR points to the final public URL.
- Connect and test the RSVP form before sharing widely.

## Notes
- The invitation card supplied is included as an image so its original artwork and wording remain intact.
- No reception or additional function has been added because none was supplied.
- The venue's full postal address was not invented; the supplied Google Maps link is used for directions.
- Family names and addresses are transcribed from the card/user-provided text.
