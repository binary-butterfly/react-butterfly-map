# ReactButterflyMap

This is a small react component that contains an OpenStreetMap widget with points of interest .

## Current state

After not being updated for almost exactly three years, this library got almost completely rewritten to make it more adaptable,
improve its code style, DX, and make everything better.  
I have not yet written documentation about the changes to how the library works, but I hope to do so soon.
Once I am done, this will be the 1.0.0 release of the library.

## How to use

* Install the package: `npm install react-butterfly-map `
* Import the main component: `import ButterflyMap from 'react-butterfly-map'`

TODO: Write docs for this. But not in the middle of the night on a sunday.

## Development

This repository contains an example page that contains the component, so getting 
started is rather easy. Just run the following:

* Make sure you have a current version of npm installed on your system
* `npm install`
* `npm run start`

This will start a local webserver that will automatically serve the example app on 
`localhost:3000` and refresh every time a file is changed.

## Production notice

Please note that the tile server used in the development example is not intended for use
by the general public and therefore you should not use it in your own applications
that build on this library.
