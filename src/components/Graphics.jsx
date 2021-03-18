import React, { Fragment } from 'react'
import { Doughnut, defaults } from 'react-chartjs-2'
defaults.global.tooltips.enabled = false;

const Graphics = ({data, color}) => {

    return  <Fragment>
                <Doughnut 
                    data = {{
                        labels: [],
                        datasets: [{
                            label: '# of Votes',
                            data: data,
                            backgroundColor: color
                        }],
                    }}
                    height = { 140 }
                    width = { 140 }
                    options= {{
                        maintainAspectRatio:true,
                        responsive:false
                    }}
                />
            </Fragment>
}
export default Graphics