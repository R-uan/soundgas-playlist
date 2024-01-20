# Soundgasm Playlist

I refer to the application as “this”.

[Why did I make this](#why-did)<br/>
[How did I make this](#how-did)<br/>
[What did I make in this](#what-did)<br/>
[What will I (maybe) make in this](#what-will)

<h2>How to use this</h2>

If you want to use this I deployed it on netlify on the URL: [https://audio-playlist-ru.netlify.app/](https://audio-playlist-ru.netlify.app/). Hopefully it’s still up.

If it’s not, then, clone this repository on your local machine and build the project with `pnpm build` and then run it with `pnpm start` to start the application build.

**Disclaimer**: If you intend to make use of the local storage (save your playlist even if close the website) don’t run it in development, otherwise that function will not work.

After starting the application the website will be up on http://localhost:3000/ by default.

<h2 id="why-did">Why did I make this</h2>

Soundgasm Playlist is an application created from the frustration of a user (myself) that the audio hosting platform didn’t have a functionality to queue audios to play back to back.

<h2 id="how-did">How did I make this</h2>

Initially I used React (Vite) for the front-end and ExpressJS for the backend. But in the middle of development I decided to use NextJS to join the back-end and front-end into one application." “Why ?” you ask, and I answer: because I didn’t want to run both applications during development.

<h2 id="what-did">What did I make in this</h2>
Mostly basic stuff that an audio player should have and some stuff to interact with the playlist.

-   Current Audio Control

    -   Current audio title and performer
    -   Audio duration
    -   Play / Pause buttons
    -   Previous / Next buttons
    -   Volume UP / Volume Down buttons

-   Playlist Elements
    -   Audio title and performer
    -   Clear audio list
    -   Play now button
    -   Delete from list button
    -   Move up / Move down buttons

<h2 id="what-will">What will I (maybe) make in this</h2>

There are two functionalities that i consider essencial that are missing in this:

1. Interactive audio timeline to alter the current audio time;
2. Interactive audio volume bar instead of two buttons.

<span>Other features that I might implement</span>

-   Support for additional sites
-   Change audio order by dragging instead of using the arrows;
-   Maybe, maybe, maybe a user system to store data (favourites, multiple playlists).

I had the idea to make this into a web extension but I haven’t looked into how to do something like that.
