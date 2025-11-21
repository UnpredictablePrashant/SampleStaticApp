# PulseApp

Simple timestamped todo list built with vanilla HTML, CSS, and JavaScript. Tasks are saved in your browser via `localStorage`, so you can refresh and keep working without losing context.

## Run locally

No tooling required—just a browser:

1. Download or clone this repository.
2. Open `index.html` in your preferred browser (double-click or drag it into a window).
3. Add todos; refresh the page to confirm your entries persist.

## Run with Docker

The repo ships with an `nginx`-based image for static hosting.

```bash
# from the project root
docker build -t pulseapp .
docker run -dp 8080:80 --name pulseapp-container pulseapp
```

Then load http://localhost:8080 and interact with the app. When finished, stop and remove the named container:

```bash
docker stop pulseapp-container
docker rm pulseapp-container
```

## File overview

- `index.html` – markup and layout.
- `styles.css` – theme (hero header, todo card, footer).
- `app.js` – logic for adding/deleting todos and syncing `localStorage`.
- `Dockerfile` / `nginx.conf` – static deployment assets.
