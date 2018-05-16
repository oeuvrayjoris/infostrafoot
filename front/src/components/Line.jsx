import React from 'react';
import { ResponsiveLine } from 'nivo';

export default ({ repositories }) => (
    <ResponsiveLine
        data={
            [
                {
                    "id": "Goals",
                    "color": "hsl(159, 70%, 50%)",
                    "data": [
                    {
                        "color": "hsl(101, 70%, 50%)",
                        "x": 1,
                        "y": 1
                    },
                    {
                        "color": "hsl(47, 70%, 50%)",
                        "x": 2,
                        "y": 0
                    },
                    {
                        "color": "hsl(199, 70%, 50%)",
                        "x": 3,
                        "y": 5
                    },
                    {
                        "color": "hsl(88, 70%, 50%)",
                        "x": 4,
                        "y": 4
                    },
                    {
                        "color": "hsl(0, 70%, 50%)",
                        "x": 5,
                        "y": 6
                    },
                    {
                        "color": "hsl(35, 70%, 50%)",
                        "x": 6,
                        "y": 8
                    },
                    {
                        "color": "hsl(269, 70%, 50%)",
                        "x": 7,
                        "y": 8
                    },
                    {
                        "color": "hsl(46, 70%, 50%)",
                        "x": 8,
                        "y": 7
                    },
                    {
                        "color": "hsl(2, 70%, 50%)",
                        "x": 9,
                        "y": 5
                    }
                    ]
                },
                {
                    "id": "Gamelles",
                    "color": "hsl(159, 70%, 50%)",
                    "data": [
                    {
                        "color": "hsl(101, 70%, 50%)",
                        "x": 1,
                        "y": 0
                    },
                    {
                        "color": "hsl(47, 70%, 50%)",
                        "x": 2,
                        "y": 1
                    },
                    {
                        "color": "hsl(199, 70%, 50%)",
                        "x": 3,
                        "y": 2
                    },
                    {
                        "color": "hsl(88, 70%, 50%)",
                        "x": 4,
                        "y": 3
                    },
                    {
                        "color": "hsl(0, 70%, 50%)",
                        "x": 5,
                        "y": 2
                    },
                    {
                        "color": "hsl(35, 70%, 50%)",
                        "x": 6,
                        "y": 1
                    },
                    {
                        "color": "hsl(269, 70%, 50%)",
                        "x": 7,
                        "y": 4
                    },
                    {
                        "color": "hsl(46, 70%, 50%)",
                        "x": 8,
                        "y": 2
                    },
                    {
                        "color": "hsl(2, 70%, 50%)",
                        "x": 9,
                        "y": 0
                    }
                    ]
                }
            ]
        }
        margin={{
            "top": 50,
            "right": 110,
            "bottom": 50,
            "left": 60
        }}
        minY="auto"
        stacked={true}
        axisBottom={{
            "orient": "bottom",
            "tickSize": 5,
            "tickPadding": 15,
            "tickRotation": 0,
            "legend": "Temps",
            "legendOffset": 36,
            "legendPosition": "center"
        }}
        axisLeft={{
            "orient": "left",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "Score",
            "legendOffset": -40,
            "legendPosition": "center"
        }}
        dotSize={10}
        dotColor="inherit:darker(0.3)"
        dotBorderWidth={2}
        dotBorderColor="#ffffff"
        enableDotLabel={true}
        dotLabel="y"
        dotLabelYOffset={-12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
            {
                "anchor": "bottom-right",
                "direction": "column",
                "translateX": 100,
                "itemWidth": 80,
                "itemHeight": 20,
                "symbolSize": 12,
                "symbolShape": "circle"
            }
        ]}
    />
);