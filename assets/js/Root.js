import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {ButterflyMap} from './components/ButterflyMap';
import ExampleCombinationMarker from '../img/exampleCombinationMarker.svg';
import ExampleMarker1 from '../img/exampleMarker1.svg';
import ExampleMarker2 from '../img/exampleMarker2.svg';
import SpecialExampleMarker from '../img/specialExampleMarker.svg';

const Main = styled.div`
  width: 100%;
  height: 100%;
`;

const Root = () => {

    return <Main>
        <ButterflyMap
            tileServer="https://tiles.binary-butterfly.de/osm-bright-gl-style/style.json"
            center={{latitude: 47.79, longitude: 13.0550}}
            height={500}
            searchBackend="testing"
            customFilters={[
                {
                    displayText: 'Bananas',
                    defaultValue: true,
                    fieldName: 'banana',
                    compareWith: false,
                },
                {
                    displayText: 'Apples',
                    defaultValue: false,
                    fieldName: 'apple',
                    compareWith: false,
                }
            ]}
            pointTypes={[
                {
                    name: 'Example 1',
                    icon: ExampleMarker1,
                    points: [
                        {
                            position: {latitude: 47.850670, longitude: 13.090983},
                            text: 'This is an example',
                            additionalInfo: 'Sportplatz',
                            website: 'example.invalid.tld',
                            banana: true,
                            hours: {
                                sunday: [{from: ['7', '0'], until: ['22', '0']}],
                                monday: [{from: ['7', '0'], until: ['22', '0']}],
                                tuesday: [{from: ['20', '0'], until: ['22', '0']}],
                                wednesday: [{from: ['7', '0'], until: ['22', '0']}],
                                thursday: [{from: ['7', '0'], until: ['22', '0']}],
                                friday: [{from: ['7', '0'], until: ['22', '0']}],
                                saturday: [{from: ['7', '0'], until: ['22', '0']}],
                            },
                        },
                        {
                            position: {latitude: 47.075211, longitude: 13.834638},
                            text: 'This is another example',
                            additionalInfo: 'Ramingstein 223, 5591, Österreich',
                            icon: SpecialExampleMarker,
                            hours: {
                                sunday: false,
                                monday: false,
                                tuesday: false,
                                wednesday: false,
                                thursday: false,
                                friday: false,
                                saturday: false,
                            },

                        },
                    ],
                },
                {
                    name: 'Example 2',
                    icon: ExampleMarker2,
                    points: [
                        {
                            position: {latitude: 47.461578, longitude: 13.258392},
                            text: 'Cool example!',
                            additionalInfo: 'Weng 42, 5453 Weng, Österreich',
                            valid: {
                                until: '2100-12-31',
                            },
                            banana: false,
                            hours: {
                                sunday: false,
                                monday: [
                                    {from: ['7', '0'], until: ['12', '0']},
                                    {
                                        from: ['15', '0'], until: ['22', '0'],
                                    }],
                                tuesday: [
                                    {from: ['7', '0'], until: ['12', '0']},
                                    {from: ['15', '0'], until: ['22', '0']},
                                ],
                                wednesday: [
                                    {from: ['7', '0'], until: ['12', '0']},
                                    {from: ['15', '0'], until: ['22', '0']},
                                ],
                                thursday: [
                                    {from: ['7', '0'], until: ['12', '0']},
                                    {from: ['15', '0'], until: ['22', '0']},
                                ],
                                friday: [
                                    {from: ['7', '0'], until: ['12', '0']},
                                    {from: ['15', '0'], until: ['22', '0']},
                                ],
                                saturday: [
                                    {from: ['7', '0'], until: ['12', '0']},
                                    {from: ['15', '0'], until: ['22', '0']},
                                ],
                            },
                        },
                        {
                            position: {latitude: 47.780875, longitude: 13.067906},
                            text: 'Example!',
                            additionalInfo: 'Alpenstr 75, 5020 Salzburg, Österreich',
                            hours: {
                                sunday: false,
                                monday: [
                                    {from: ['7', '0'], until: ['12', '0']},
                                    {from: ['15', '0'], until: ['22', '0']},
                                ],
                                tuesday: [
                                    {from: ['7', '0'], until: ['12', '0']},
                                    {from: ['15', '0'], until: ['22', '0']},
                                ],
                                wednesday: [
                                    {from: ['7', '0'], until: ['12', '0']},
                                    {from: ['15', '0'], until: ['22', '0']},
                                ],
                                thursday: [
                                    {from: ['7', '0'], until: ['12', '0']},
                                    {from: ['15', '0'], until: ['22', '0']},
                                ],
                                friday: [
                                    {from: ['7', '0'], until: ['12', '0']},
                                    {from: ['15', '0'], until: ['22', '0']},
                                ],
                                saturday: [
                                    {from: ['7', '0'], until: ['12', '0']},
                                    {from: ['15', '0'], until: ['22', '0']},
                                ],
                            },
                        },
                    ],
                },
                {
                    name: '1 + 2',
                    icon: ExampleCombinationMarker,
                    points: [
                        {
                            position: {latitude: 47.790602, longitude: 13.175083},
                            text: 'CombinedExample',
                            additionalInfo: 'Messingstraße 29, 5323 Ebenau, Österreich',
                            valid: {
                                from: new Date(1970, 1, 1),
                            },
                            apple: true,
                            hours: {
                                sunday: false,
                                monday: [{from: ['7', '0'], until: ['22', '0']}],
                                tuesday: [{from: ['7', '0'], until: ['22', '0']}],
                                wednesday: [{from: ['7', '0'], until: ['22', '0']}],
                                thursday: [{from: ['7', '0'], until: ['22', '0']}],
                                friday: [{from: ['7', '0'], until: ['22', '0']}],
                                saturday: false,
                                text: 'Open hours can also include free text!',
                            },
                        },
                    ],
                    aliases: ['Example 1', 'Example 2'],
                },
                {
                    name: 'Time points',
                    icon: ExampleMarker2,
                    points: [
                        {
                            position: {latitude: 0, longitude: 0},
                            text: 'Not yet',
                            valid: {
                                from: new Date(2100, 11, 31),
                            },
                        },
                        {
                            position: {latitude: 1, longitude: 1},
                            text: 'Not anymore',
                            valid: {
                                until: new Date(1970, 1, 1),
                            },
                        },
                    ],
                },
            ]}
        />
    </Main>;
};

const DomContainer = document.getElementById('root');
ReactDOM.render(<Root/>, DomContainer);
