import React, {Component} from 'react';
import ChartlistGraph from 'react-chartist';

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
                ]
            }

            return <ChartlistGraph data={data} type={'Line'}/>

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