# AJAY NXT Premium Portfolio Website

A fully custom static portfolio website. No website screenshots are used.

## Files
- `index.html` — main portfolio
- `client-guide.html` — standalone client review guide
- `styles.css` — responsive premium design
- `script.js` — filters, search, modals and interactions
- `data.js` — all 20 demo details and URLs
- `assets/qr/` — QR codes for every live demo
- `nginx.conf.example` — VPS configuration example

## VPS upload
Upload all files inside this folder to the web root, for example:

`/var/www/portfolio/`

Then use the included Nginx configuration as a starting point.

## Important corrected URLs
- https://interior.ajaynxt.com/
- https://logistics.ajaynxt.com/
- http://demos.ajaynxt.com/

## Contact
AJAY NXT
https://ajaynxt.com/
+91 99295 62585

## Hero and logo update
- The original AJAY NXT image is shown in full inside the hero card.
- `object-fit: contain` prevents any cropping.
- Header and footer also use the AJAY NXT brand logo.

## Latest hero photo update
- The hero section now uses Ajay's full portrait on the right side.
- The photo is shown full with `object-fit: contain`, so it is not cropped.
- Header logo remains the AJAY NXT brand logo.
