import React, { Component } from 'react';
import Gantt from '../../Gantt';
import '../../App.css';

var data = {
    data: [
        {id: 1, text: 'Task #1', start_date: '15-04-2017', duration: 3, progress: 0.6},
        {id: 2, text: 'Task #2', start_date: '18-04-2017', duration: 3, progress: 0.4}
    ],
    links: [
        {id: 1, source: 1, target: 2, type: '0'}
    ]
};

class Page extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <div className="gantt-container">
                    <Gantt tasks={data}/>
                </div>
            </div>
        );
    }

}

export default Page;