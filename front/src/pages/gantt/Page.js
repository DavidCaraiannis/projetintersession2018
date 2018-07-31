import React, { Component } from 'react';
import Gantt from '../../Gantt/Gantt';
import Toolbar from '../../Gantt/Toolbar';

let projects_milestones_critical = {
    data: [
        { id: 1, text: "Office itinerancy", type: "project", progress: 0.4, open: true, start_date: "02-04-2018 09:00", duration: '', parent: 0 },
        { id: 2, text: "Office facing", type: "project", start_date: "02-04-2018 09:00", duration: '', progress: 0.6, parent: 1, open: true},
        { id: 5, text: "Interior office", type: "task", start_date: "02-04-2018 09:00", duration: 24, parent: 2, progress: 0.6, open: true, people: ["John", "Mike", "Anna"], priority: 2},
        { id: 6, text: "Air conditioners check", type: "task",  start_date: "05-04-2018 09:00", duration: 16, parent: 2, progress: 0.29, open: true, people: ["John", "Mike"], priority: 1},
        { id: 3, text: "Furniture installation", type: "project", start_date: "08-04-2018 09:00", duration: '', parent: 1, progress: 0.6, open: false},
        { id: 7, text: "Workplaces preparation", type: "task",  start_date: "08-04-2018 09:00", duration: 16, parent: 3, progress: 0.6, open: true, people: ["Anna"], priority: 1},
        { id: 4, text: "The employee relocation", type: "project", start_date: "10-04-2018 09:00", duration: '', parent: 1, progress: 0.5, open: true},
        { id: 8, text: "Preparing workplaces", type: "task",  start_date: "10-04-2018 09:00", duration: 24, parent: 4, progress: 0.5, open: true, people: ["Mike", "Anna"], priority: 2},
        { id: 9, text: "Workplaces importation", type: "task",  start_date: "13-04-2018 09:00", duration: 24, parent: 4, progress: 0.5, open: true, people: ["John"], priority: 3},
        { id: 10, text: "Workplaces exportation", type: "task",  start_date: "16-04-2018 09:00", duration: 24, parent: 4, progress: 0.5, open: true, people: ["John"], priority: 2},
        { id: 11, text: "Product launch", type: "project", progress: 0.6, open: true, start_date: "02-04-2018 09:00", duration: '', parent: 0 },
        { id: 12, text: "Perform Initial testing", type: "task",  start_date: "02-04-2018 09:00", duration: 40, parent: 11, progress: 1, open: true, people: ["Mike", "Anna"], priority: 2},
        { id: 13, text: "Development", type: "project", start_date: "03-04-2018 09:00", duration: '', parent: 11, progress: 0.5, open: true},
        { id: 17, text: "Develop System", type: "task",  start_date: "03-04-2018 09:00", duration: 40, parent: 13, progress: 1, open: true, people: ["Anna"], priority: 3},
        { id: 25, text: "Beta Release", type: "milestone", start_date: "08-04-2018 09:00", duration: 0, parent: 13, progress: 0, open: true},
        { id: 18, text: "Integrate System", type: "task",  start_date: "08-04-2018 09:00", duration: 32, parent: 13, progress: 0.8, open: true, people: ["Mike", "Anna"], priority: 1},
        { id: 19, text: "Test", type: "task",  start_date: "12-04-2018 09:00", duration: 24, parent: 13, progress: 0.2, open: true, people: ["John", "Mike"], priority: 1},
        { id: 20, text: "Marketing", type: "task",  start_date: "15-04-2018 09:00", duration: 32, parent: 13, progress: 0, open: true, people: ["John", "Anna"], priority: 3},
        { id: 14, text: "Analysis", type: "task",  start_date: "02-04-2018 09:00", duration: 32, parent: 11, progress: 0.8, open: true, people: ["John"], priority: 3},
        { id: 15, text: "Design", type: "project", start_date: "06-04-2018 09:00", duration: '', parent: 11, progress: 0.2, open: true},
        { id: 21, text: "Design database", type: "task",  start_date: "06-04-2018 09:00", duration: 32, parent: 15, progress: 0.5, open: true, people: ["Anna"], priority: 3},
        { id: 22, text: "Software design", type: "task",  start_date: "08-04-2018 09:00", duration: 32, parent: 15, progress: 0.1, open: true, people: ["John", "Mike", "Anna"], priority: 2},
        { id: 16, text: "Documentation creation", type: "task",  start_date: "11-04-2018 09:00", duration: 40, parent: 11, progress: 0, open: true, people: ["John", "Mike", "Anna"], priority: 2},
        { id: 24, text: "Release v1.0", type: "milestone",  start_date: "19-04-2018 09:00", duration: 0, parent: 11, progress: 0, open: true}
    ],
    links: [
        { id: 1, source: "2", target: "3", type: "0"},
        { id: 2, source: "3", target: "4", type: "0"},
        { id: 3, source: "17", target: "25", type: "0"},
        { id: 4, source: "18", target: "19", type: "0"},
        { id: 5, source: "19", target: "20", type: "0"},
        { id: 6, source: "13", target: "24", type: "0"},
        { id: 7, source: "25", target: "18", type: "0"},
        { id: 8, source: "5", target: "6", type: "0"},
        { id: 9, source: "8", target: "9", type: "0"},
        { id: 10, source: "9", target: "10", type: "0"},
        { id: 11, source: "16", target: "24", type: "0"},
        { id: 12, source: "14", target: "15", type: "0"}
    ]
};

class Page extends Component {
    constructor(props){
        super(props);
        this.state= {
            //currentZoom: 'Days',
            currentToPDF: 'Yes',
            currentToPNG: 'Yes',
            currentToExcel: 'Yes',
            currentToMSProject: 'Yes',
            currentZoomIn: 4,
            currentZoomOut: 4,
            currentZoomToFit: 4,
            messages: []
        };

        //this.handleZoomChange = this.handleZoomChange.bind(this);
        this.handleZoomIn=this.handleZoomIn.bind(this);
        this.handleZoomOut=this.handleZoomOut.bind(this);
        this.handleZoomToFit=this.handleZoomToFit.bind(this);
        this.logTaskUpdate = this.logTaskUpdate.bind(this);
        this.logLinkUpdate = this.logLinkUpdate.bind(this);
    }

    /*handleZoomChange(zoom) {
        this.setState({
            currentZoom: zoom
        })
    }*/

    // Buttons navbar Gantt

    handleZoomIn(zoomInBtn) {
        this.setState({
            currentZoomIn: zoomInBtn
        })
    }

    handleZoomOut(zoomOutBtn) {
        this.setState({
            currentZoomOut: zoomOutBtn
        })
    }

    handleZoomToFit(zoomToFitBtn) {
        this.setState({
            currentZoomToFit: zoomToFitBtn
        })
    }

    // Message after Changing tasks

    addMessage(message) {
        let messages = this.state.messages.slice();
        let prevKey = messages.length ? messages[0].key: 0;

        messages.unshift({key: prevKey + 1, message});
        if(messages.length > 40){
            messages.pop();
        }
        this.setState({messages});
    }

    logTaskUpdate(id, mode, task) {
        let text = task && task.text ? ` (${task.text})`: '';
        let message = `Task ${mode}: ${id} ${text}`;
        this.addMessage(message);
    }

    logLinkUpdate(id, mode, link) {
        let message = `Link ${mode}: ${id}`;
        if (link) {
            message += ` (source: ${link.source}, target: ${link.target})`;
        }
        this.addMessage(message)
    }

    render() {
        return(
            <div className="main-content">
                <Toolbar
                    zoomInBtn={this.state.currentZoomIn}
                    zoomOutBtn={this.state.currentZoomOut}
                    zoomToFItBtn={this.state.currentZoomToFit}

                    onZoomIn={this.handleZoomIn}
                    onZoomOut={this.handleZoomOut}
                    onZoomToFit={this.handleZoomToFit}
                />
                <div className="gantt_container" style={{"width":"100%", "height":"100vh"}}>
                    <Gantt
                        tasks={projects_milestones_critical}
                        zoomInBtn={this.state.currentZoomIn}
                        zoomOutBtn={this.state.currentZoomOut}
                        zoomToFitBtn={this.state.currentZoomToFit}
                        onTaskUpdated={this.logTaskUpdate}
                        onLinkUpdated={this.logLinkUpdate}
                    />
                </div>
            </div>
        );
    }

}

export default Page;

/* dans <Toolbar>
zoom={this.state.currentZoom}
                    onZoomChange={this.handleZoomChange}

                    zoom={this.state.currentZoom} // dans <gantt>
                    */