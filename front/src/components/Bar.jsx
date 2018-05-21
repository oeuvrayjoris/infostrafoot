import React from 'react';
import { ResponsiveBar  } from 'nivo';

export default ({ repositories }) => (
    <ResponsiveBar
        data={repositories}
        keys={[
            "victoire",
            "défaîte"
        ]}
        indexBy="jour"
        margin={{
            "top": 36,
            "right": 50,
            "bottom": 50,
            "left": 50
        }}
        padding={0.3}
        //colors="nivo"
        colors={["#97e3d5", "#e25c3b"]}
        //colorBy="id"
       
        borderColor="inherit:darker(1)"
        axisBottom={{
            "orient": "bottom",
            "tickSize": 5,
            "tickPadding": 15,
            "tickRotation": 0,
            "legend": "Derniers matchs de la meilleure équipe sur les 7 derniers jours",
            "legendPosition": "center",
            "legendOffset": 36
        }}
        axisLeft={{
            "orient": "left",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
        }}
        labelSkipWidth={14}
        labelSkipHeight={5}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
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
        ]}
    />
);