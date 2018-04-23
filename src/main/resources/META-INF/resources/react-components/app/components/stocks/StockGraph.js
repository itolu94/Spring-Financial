import React, {Component} from 'react';
import ChartistGraph from 'react-chartist';
import ChartistPlugin from 'chartist-plugin-axistitle';


export default class StockGraph extends Component  {
    constructor(){
        super();
        this.displayGraph = this.displayGraph.bind(this);
    }

    shouldComponentUpdate(nextProps){
        return this.props.stockData !==  nextProps.stockData;
    }

    displayGraph(){
        if(this.props.stockData.labels && this.props.stockData.series){
            let {labels, series} = this.props.stockData;
            let data = {
                labels,
                series: [
                    series
                ],
                plugins: [
                    ChartistPlugin({
                        axisX: {
                            axisTitle: 'Time (mins)',
                            axisClass: 'ct-axis-title-test',
                            offset: {
                                x: 0,
                                y: 50
                            },
                            textAnchor: 'middle'
                        },
                        axisY: {
                            axisTitle: 'Goals',
                            axisClass: 'ct-axis-title-test2',
                            offset: {
                                x: 0,
                                y: -1
                            },
                            flipTitle: false
                        }
                    })
                ]
            }
            let options = {
                stroke: 'blue',
            }
            return <ChartistGraph data={data} type={'Line'} options={options}/>
        } else {
            //TODO update error handling
            // console.log('no data was passed down')
            return <p>Search for a stock!</p>
        }
    }
    render() {
        return (
            <div>
                {this.displayGraph()}
            </div>

        )
    }
}