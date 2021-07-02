import React, { Component } from 'react';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid"


export default class Monitor extends Component {
    render() {
        return (
            <Grid
                className='rounded-bottom'
                style={{
                    height: "300px",
                }}
            // data={this.props.data}
            >
                {
                    this.props.selected.map(e => {
                        if (e.checked === true)
                            return <Column field={e.field} title={e.title} width={e.width} />
                    }
                    )
                }
            </Grid>

        )
    }
}
