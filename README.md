## Overview
This is an app designed to allow the import of KML files in order to visualize the shapes in those files. I have developed it as a tool to visualize the necessary shapes for [IVAO Webeye](https://webeye.ivao.aero) before uploading them. KML Visualizer can be found [here](https://kml-visualizer.vercel.app)

### Technologies
The app uses [Next.js 13](https://nextjs.org), [OpenLayers](https://openlayers.org), [Tailwind CSS](https://tailwindcss.com) and [Supabase](https://app.supabase.com) for KML file storage.

### Future
Currently in order to visualize a shape it has to be hard-corded into the Map.tsx component but I'm working in a way of importing the file once inside the app and adding basic controls for that file (remove).

## Test It
Feel free to try it by uploading a KML file with a route or polygon in it. You can then delete it from the management panel.
