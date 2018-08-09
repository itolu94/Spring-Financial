import React, {Component} from 'react';
import ChartistGraph from 'react-chartist';


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
            let {labels, series, name} = this.props.stockData;
            let data = {
                labels,
                series: [
                    series
                ]
            }
            let options = {
                stroke: 'blue',
            }
            return (
                <div>
                    <h3>{this.props.stockData.name}</h3>
                    <ChartistGraph data={data} type={'Line'} options={options}/>
                    <div className='stocksContent'>
                        <form className='stocksForm' onSubmit={(e) => this.props.saveStock(e, name)}>
                            <input type="submit" id="saveStockButton" value="Save Stock"/>
                        </form>
                    </div>
                </div>
            )
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