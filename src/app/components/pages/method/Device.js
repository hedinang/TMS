import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    AreaSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { Component } from 'react';
import { stackOffsetExpand } from 'd3-shape';
class Device extends Component {
    state = {
        data: '',
        ChartRoot: {
            paddingRight: '20px',
        },
        LegendRoot: {
            display: 'flex',
            margin: 'auto',
            flexDirection: 'row',
        },
        LegendLabel: {
            whiteSpace: 'nowrap',
        },
        stacks: [{
            series: ['Liquids', 'Solids', 'Gas', 'Cement Production', 'Gas Flaring'],
        }]

    };

    format = (tick) => tick;
    formatForFullstack = scale => scale.tickFormat(null, '%');
    render() {

        const { data: chartData } = this.state;
        return (
            <div>
                <div className="mb-2" style={{ textAlign: 'center', color: `${this.state.textColor}`, overflow: 'visible' }}>Danh sách đặt chuyến</div>
                <Paper  >
                    <Chart
                    // data={chartData}
                    // rootComponent={this.state.ChartRoot}
                    >
                        <ArgumentAxis
                        // tickFormat={this.format}
                        />
                        <ValueAxis
                        // tickFormat={this.formatForFullstack} 
                        />
                        <AreaSeries
                            name="Liquids"
                            valueField="liquids"
                            argumentField="year"
                        />
                        <AreaSeries
                            name="Solids"
                            valueField="solids"
                            argumentField="year"
                        />
                        <AreaSeries
                            name="Gas"
                            valueField="gas"
                            argumentField="year"
                        />
                        <AreaSeries
                            name="Cement Production"
                            valueField="cementProduction"
                            argumentField="year"
                        />
                        <AreaSeries
                            name="Gas Flaring"
                            valueField="gasFlaring"
                            argumentField="year"
                        />
                        <Animation />
                        <Legend position="bottom"
                        // rootComponent={this.LegendRoot} labelComponent={this.LegendLabel} 
                        />
                        <Title text="Carbon Emission Estimates" />
                        <Stack
                        // stacks={this.stacks} offset={stackOffsetExpand} 
                        />
                    </Chart>
                </Paper>
            </div>
        )
    }
}
export default Device
