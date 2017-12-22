# Hospital Simulation Simulator

Here be the README for CDL's Hospital Simulation Simulator.

## Getting started

Join us on CDL's Slack in the #hospital-sim channel for daily chat about the
project.

Or follow our project Trello board: https://trello.com/b/GDms09JR/hospital-sim

## A-Frame

We have settled on a Javascript framework called A-Frame.

https://github.com/aframevr/aframe/

After you clone this repo, you will need to clone the A-Frame repo.
https://github.com/aframevr/aframe/#local-development

Check out the A-Frame demo here: https://codepen.io/mozvr/pen/BjygdO

Don't forget to try the A-Frame inspector by pressing Ctrl + Alt + i

## UI Concepts

Here's the working document that outlines the gist of our UI.
https://docs.google.com/document/d/1TSJ3jovXUSu7N78MxGUVOUxALBcYFtmRRjlABIJVHR8/edit

## Testing Locally

Until the `master` branch is updated with Materia widget support, steps to run
the Simulator locally will differ between `master` and the
`materia-widget-integration` branch.

### Testing Standalone (master)

You can load the simulator locally by simply opening the `player.html` file in
the browser. However, certain assets will not load properly due to cross-origin
policy.

To serve the page locally, you can run the following:

```
python -m SimpleHTTPServer
```

This will load the page to `http://localhost:8000` by default. You can specify
the port by providing it as an additional argument.

### Testing in Materia (materia-widget-integration)

Clone the DevMateria repo locally: https://clu.cdl.ucf.edu/materia/devmateria
and ensure installation prerequisites are met. Clone or symlink the Hospital Sim
repo into DevMateria's `sandbox` directory. Ensure the
`materia-widget-integration` branch is checked out, and run `npm install` (or
`yarn install` if you have Yarn) in the Hospital Sim directory.

Run the start script in DevMateria root: `./start` You can then visit
`http://localhost:8118` to visit DevMateria.

### More

Background image under Public Domain:
https://commons.wikimedia.org/wiki/Commons:Featured_pictures/Places/Panoramas#/media/File:Coimbra_November_2012-1.jpg
