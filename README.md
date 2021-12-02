# ReactButterflyMap

This is a small react component that contains an OpenStreetMap widget with search and points of interest
features.

## Current state

This library is working as intended but still pre- 1.0 release, meaning that the API may change at any moment
or that new features might not always be entirely documented.  

## How to use

* Install the package: (TODO)
* Import the main component: `import ButterflyMap from 'react-butterfly-map'`
* Include the component in you code similar to this example:
   ```js
   <ButterflyMap
                tileServer={'your.tile-server.invalid.tld/style.json'}
                center={{latitude: 47.79, longitude: 13.0550}}
                height={500}
                pointTypes={[
                    {
                        name: 'Example 1',
                        icon: YourIconReactComponent,
                        points: [
                            {
                                position: {latitude: 47.850670, longitude: 13.090983},
                                address: 'Street 123, Somewhere',
                                text: 'This is an example',
                                additionalInfo: 'Examples are used to to show how something works.',
                                hours: {
                                    sunday: false,
                                    monday: [{from: ['7', '0'], until: ['22', '0']}],
                                    tuesday: [{from: ['20', '0'], until: ['22', '0']}],
                                    wednesday: [{from: ['7', '0'], until: ['22', '0']}],
                                    thursday: [{from: ['7', '0'], until: ['22', '0']}],
                                    friday: [{from: ['7', '0'], until: ['22', '0']}],
                                    saturday: false,
                                },
                                valid: {
                                    from: '2021-01-01',
                                    until: '2038-01-01',
                                }
                            },
                        ],
                    },
                ]}
            />
   ```

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
