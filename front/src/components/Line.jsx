import React from 'react';
import { ResponsiveLine } from 'nivo';

export default ({ repositories }) => (
    <ResponsiveLine
        data={repositories}
        margin={{
            "top": 50,
            "right": 110,
            "bottom": 50,
            "left": 60
        }}
        minY="auto"
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