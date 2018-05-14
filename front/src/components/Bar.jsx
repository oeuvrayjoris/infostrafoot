import React from 'react';
import { ResponsiveBar  } from 'nivo';

export default ({ repositories }) => (
    <ResponsiveBar 
        data={
            [
                {
                    "gained > 100$": 9, 
                    "gained <= 100$": 18,
                    "lost <= 100$": -46
                }, 
                {
                    "gained > 100$": 11,
                    "gained <= 100$": 47,
                    "lost <= 100$": -30
                }, 
                {
                    "gained > 100$": 32,
                    "gained <= 100$": 55,
                    "lost <= 100$": -13
                }, 
                {
                    "gained > 100$": 16,
                    "gained <= 100$": 44,
                    "lost <= 100$": -30
                },
                {
                    "gained > 100$": 6,
                    "gained <= 100$": 13,
                    "lost <= 100$": -67
                },
                {
                    "gained > 100$": 0,
                    "gained <= 100$": 14,
                    "lost <= 100$": -56
                },
                {
                    "gained > 100$": 8,
                    "gained <= 100$": 15,
                    "lost <= 100$": -71
                },
                {
                    "gained > 100$": 26,
                    "gained <= 100$": 46,
                    "lost <= 100$": -25
                },
                {
                    "gained > 100$": 3,
                    "gained <= 100$": 8,
                    "lost <= 100$": -82
                }
            ]
        }
        keys={[
            "gained <= 100$",
            "gained > 100$",
            "lost <= 100$"
        ]}
        /*indexBy="user"
        
        margin={{
            top: 60,
            right: 80,
            bottom: 60,
            left: 80
        }}
        minValue={-100}
        maxValue={100}
        enableGridX
        enableGridY={false}
        padding={0.4}
        axisTop={{tickSize: 0, tickPadding: 12}}
        axisBottom={{legend: "USERS", legendPosition: "center", legendOffset: 50, tickSize: 0, tickPadding: 12}}
        axisLeft={null}
        //axisRight={{format: format()}}
        markers={[
                {
                    axis: "y",
                    value: 0,
                    lineStyle: {strokeOpacity: 0},
                },
                {
                    axis: "y",
                    value: 0,
                    lineStyle: {stroke: "#f47560", strokeWidth: 1},
                }
        ]}
        colors={["#97e3d5", "#61cdbb", "#f47560", "#e25c3b"]}
        borderColor="inherit:darker(1.6)"
        labelSkipWidth={16}
        labelSkipHeight={16}
        labelTextColor="inherit:darker(1.2)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        */
        //label={label()}
        //labelFormat={labelFormat()}
        /*colorBy="id"
        defs={[
            {
                "id": "dots",
                "type": "patternDots",
                "background": "inherit",
                "color": "#38bcb2",
                "size": 4,
                "padding": 1,
                "stagger": true
            },
            {
                "id": "lines",
                "type": "patternLines",
                "background": "inherit",
                "color": "#eed312",
                "rotation": -45,
                "lineWidth": 6,
                "spacing": 10
            }
        ]}
        legends={[
            {
                "dataFrom": "keys",
                "anchor": "bottom-right",
                "direction": "column",
                "translateX": 120,
                "itemWidth": 100,
                "itemHeight": 20,
                "itemsSpacing": 2,
                "symbolSize": 20
            }
        ]}*/
    />
);