import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import ButterflyMap from '../components/ButterflyMap';
import ExamplePointCard from '../components/examples/ExamplePointCard';
import SpecialExampleMarker1 from '../components/examples/SpecialExampleMarker1';
import ExampleMarker2 from '../components/examples/ExampleMarker2';
import ExampleMarker1 from '../components/examples/ExampleMarker1';
import ExampleSidebarPoint from '../components/examples/ExampleSidebarPoint';
import {PoiCardProps} from '../Types/types';

const Main = styled.div`
    width: 100%;
    height: 100%;
`;

const Root = () => {
    return <Main>
        <ButterflyMap tileServer="https://tiles.binary-butterfly.de/osm-bright-gl-style/style.json"
                      center={{latitude: 47.79, longitude: 13.0550}}
                      height={500}
                      pointsOfInterest={[
                          {
                              uuid: 'example-poi-1',
                              position: {latitude: 47.850670, longitude: 13.090983},
                              CardComponent: (props) => <ExamplePointCard  {...props}
                                                                           point={{
                                                                               uuid: 'example-poi-1',
                                                                               position: {latitude: 47.850670, longitude: 13.090983},
                                                                               text: 'This is an example with very long text that will not overflow it\'s container banananananananananananananananananananananana',
                                                                               additionalInfo: 'Sportplatz',
                                                                               website: 'example.invalid.tld',
                                                                           }}/>,
                              SidebarComponent: (props) => <ExampleSidebarPoint  {...props}
                                                                                 point={{
                                                                                     uuid: 'example-poi-1',
                                                                                     position: {latitude: 47.850670, longitude: 13.090983},
                                                                                     text: 'This is an example with very long text that will not overflow it\'s container banananananananananananananananananananananana',
                                                                                     additionalInfo: 'Sportplatz',
                                                                                     website: 'example.invalid.tld',
                                                                                 }}/>,
                              MarkerComponent: ExampleMarker1,
                          },
                          {
                              uuid: 'example-poi-2',
                              position: {latitude: 47.075211, longitude: 13.834638},
                              CardComponent: (props: PoiCardProps) => <ExamplePointCard  {...props}
                                                                           point={{
                                                                               uuid: 'example-poi-2',
                                                                               position: {latitude: 47.075211, longitude: 13.834638},
                                                                               text: 'This is another example',
                                                                               additionalInfo: 'Ramingstein 223, 5591, Österreich',
                                                                           }}/>,
                              SidebarComponent: (props) => <ExampleSidebarPoint  {...props}
                                                                                 point={{
                                                                                     uuid: 'example-poi-2',
                                                                                     position: {latitude: 47.075211, longitude: 13.834638},
                                                                                     text: 'This is another example',
                                                                                     additionalInfo: 'Ramingstein 223, 5591, Österreich',
                                                                                 }}/>,
                              MarkerComponent: SpecialExampleMarker1,
                          },
                          {
                              uuid: 'example-poi-3',
                              position: {latitude: 50, longitude: 20},
                              CardComponent: (props) => <ExamplePointCard  {...props}
                                                                           point={{
                                                                               uuid: 'example-poi-3',
                                                                               position: {latitude: 50, longitude: 20},
                                                                               text: 'Cool example!',
                                                                           }}/>,
                              SidebarComponent: (props) => <ExampleSidebarPoint  {...props}
                                                                                 point={{
                                                                                     uuid: 'example-poi-3',
                                                                                     position: {latitude: 50, longitude: 20},
                                                                                     text: 'Cool example!',
                                                                                 }}/>,
                              MarkerComponent: ExampleMarker2,
                          },
                      ]}/>
    </Main>;
};

const DomContainer = document.getElementById('root');
const root = ReactDOM.createRoot(DomContainer as ReactDOM.Container);
root.render(<Root/>);
