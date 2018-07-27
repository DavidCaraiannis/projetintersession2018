/*global gantt*/
import React, { Component } from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.js';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_csp';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_fullscreen';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_undo';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker';
import ZoomGantt from './ZoomGantt';
//import Zoom from "./Zoom";
//import ZoomToFit from "./ZoomToFit";

class Gantt extends Component {
    constructor(props) {
        super(props);
    }


    setDuration() {
        gantt.config.duration_unit = 'hour';
        gantt.config.grid_resize = true;
        gantt.config.work_time = true;
        gantt.config.skip_off_time = true;
        gantt.config.redo = true;
        gantt.config.undo = true;

        let weekScaleTemplate = function (date) {
            let dateToStr = gantt.date.date_to_str("%d %M");
            let weekNum = gantt.date.date_to_str("(week %W)");
            let endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
            return dateToStr(date) + " - " + dateToStr(endDate) + " " + weekNum(date);
        };

        gantt.config.subscales = [
            {unit: "month", step: 1, date: "%F, %Y"},
            {unit: "week", step: 1, template: weekScaleTemplate}
        ];

        gantt.templates.task_cell_class = function (task, date) {
            if (!gantt.isWorkTime(date))
                return "week_end";
            return "";
        };

    }

    setLightbox(){

        gantt.serverList("people", [
            {key: 1, label: "John"},
            {key: 2, label: "Mike"},
            {key: 3, label: "Anna"},
            {key: 4, label: "Bill"}
        ]);
        gantt.serverList("type", [
            {key: 1, label: "task"},
            {key: 2, label: "project"},
            {key: 3, label: "milestone"},
        ]);
        gantt.serverList("priority", [
            {key: 1, label: "1"},
            {key: 2, label: "2"},
            {key: 3, label: "3"},
        ]);

        gantt.config.types["customType"] = "type_id";
        gantt.locale.labels['type_' + "customType"] = "New Type";
        gantt.locale.labels.section_owner = "Owner";
        gantt.locale.labels.section_priority = "Priority";
        gantt.config.lightbox["customType" + "_sections"] = [
            { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
            { name: "type", type: "select", map_to: "type"}
        ];
        gantt.templates.rightside_text = function (start, end, task) {
            if (task.type === gantt.config.types.milestone) {
                return task.text;
            }
            return "";
        };
        gantt.config.lightbox.sections = [
            {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
            {name: "type", type: "select", map_to: "type_id", options:gantt.serverList("type")},
            {name:"owner", map_to:"owner_id", type:"multiselect", options:gantt.serverList("people")},
            {name: "priority", type: "select", map_to: "priority", options:gantt.serverList("priority")},
            {name: "time", type: "duration", map_to: "auto"}
        ];
    }

    /*setZoom(value){
        switch (value){
            case 'Hours':
                gantt.config.scale_unit = 'day';
                gantt.config.date_scale = '%d %M';

                gantt.config.scale_height = 60;
                gantt.config.min_column_width = 30;
                gantt.config.subscales = [
                    {unit:'hour', step:1, date:'%H'}
                ];
                break;
            case 'Days':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = "week";
                gantt.config.date_scale = "#%W";
                gantt.config.subscales = [
                    {unit: "day", step: 1, date: "%d %M"}
                ];
                gantt.config.scale_height = 60;
                break;
            case 'Months':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = "month";
                gantt.config.date_scale = "%F";
                gantt.config.scale_height = 60;
                gantt.config.subscales = [
                    {unit:"week", step:1, date:"#%W"}
                ];
                break;
            default:
                break;
        }
    }
    setScaleConfigs(value){
        switch (value) {
            case "minutes":
                gantt.config.duration_unit = 'minute';
                gantt.config.duration_step = 1;
                gantt.config.scale_unit = 'hour';
                gantt.config.date_scale = '%H';
                gantt.config.subscales = [
                    {unit: "minute", step: 1, date: "%H:%i"}
                ];
            break;
            case "hours":
                gantt.config.duration_unit = 'hour';
                gantt.config.duration_step = 1;
                gantt.config.scale_unit = 'day';
                gantt.config.date_scale = '%j %M';
                gantt.config.subscales = [
                    {unit: "hour", step: 1, date: "%H:%i"}
                ];
                break;
            case "days":
                gantt.config.duration_unit = 'day';
                gantt.config.duration_step = 1;
                gantt.config.scale_unit = 'month';
                gantt.config.date_scale = '%F';
                gantt.config.subscales = [
                    {unit: "day", step: 1, date: "%j"}
                ];
                break;
            case "weeks":
                gantt.config.duration_unit = 'week';
                gantt.config.duration_step = 1;
                gantt.config.scale_unit = 'month';
                gantt.config.date_scale = '%F';
                gantt.config.subscales = [
                    {unit: "week", step: 1, template: function (date) {
                            let dateToStr = gantt.date.date_to_str("%d %M");
                            let endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
                            return dateToStr(date) + " - " + dateToStr(endDate);
                        }}
                ];
                break;
            case "months":
                gantt.config.duration_unit = 'month';
                gantt.config.duration_step = 1;
                gantt.config.scale_unit = 'year';
                gantt.config.date_scale = '%Y';
                gantt.config.subscales = [
                    {unit: "month", step: 1, date: "%M"}
                ];
                break;
            case "quarters":
                gantt.config.duration_unit = 'month';
                gantt.config.duration_step = 3;
                gantt.config.scale_unit = 'year';
                gantt.config.date_scale = '%Y';
                gantt.config.subscales = [
                    {unit: "month", step: 3, template: function (date) {
                            let dateToStr = gantt.date.date_to_str("%M");
                            let endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                            return dateToStr(date) + " - " + dateToStr(endDate);
                        }}
                ];
                break;
            case "years":
                gantt.config.duration_unit = 'year';
                gantt.config.duration_step = 1;
                gantt.config.scale_unit = 'year';
                gantt.config.date_scale = '%Y';
                gantt.config.subscales = [
                    {unit: "year", step: 5, template: function (date) {
                            let dateToStr = gantt.date.date_to_str("%Y");
                            let endDate = gantt.date.add(gantt.date.add(date, 5, "year"), -1, "day");
                            return dateToStr(date) + " - " + dateToStr(endDate);
                        }}
                ];
                break;
            case "decades":
                gantt.config = [
                    {unit: "year", step: 10, scale_unit: "year", template: function (date) {
                            let dateToStr = gantt.date.date_to_str("%Y");
                            let endDate = gantt.date.add(gantt.date.add(date, 10, "year"), -1, "day");
                            return dateToStr(date) + " - " + dateToStr(endDate);
                        },
                        subscales: [
                            {unit: "year", step: 100, template: function (date) {
                                    let dateToStr = gantt.date.date_to_str("%Y");
                                    let endDate = gantt.date.add(gantt.date.add(date, 100, "year"), -1, "day");
                                    return dateToStr(date) + " - " + dateToStr(endDate);
                                }}
                        ]}
                ];
                break;
            default:
                break;
        }
    };*/


    //Buttons on navbar

    handleZoomIn() {
        ZoomGantt.disable();
        ZoomGantt.zoomIn();
        ZoomGantt.refreshZoomBtns();
        ZoomGantt.toggleZoomToFitBtn();
    }

    handleZoomOut() {
        ZoomGantt.disable();
        ZoomGantt.zoomOut();
        ZoomGantt.refreshZoomBtns();
        ZoomGantt.toggleZoomToFitBtn();
    }

    handleZoomToFit() {
        ZoomGantt.deactivate();
        ZoomGantt.toggle();
        ZoomGantt.toggleZoomToFitBtn();
        ZoomGantt.refreshZoomBtns();
    }

    handleUndo() {
        gantt.undo();
        ZoomGantt.refreshUndoBtns();
    }

    handleRedo() {
        gantt.redo();
        ZoomGantt.refreshUndoBtns();
    }

    handleFullscreen() {
        gantt.expand();
    }

    handleCollapseAll() {
        gantt.eachTask(function(task){
            task.$open = false;
        });
        gantt.render();

    }

    handleExpandAll() {
        gantt.eachTask(function(task){
            task.$open = true;
        });
        gantt.render();
    }

    /*toPDF() {
        gantt.exportToPDF();
    }

    toPNG() {
        gantt.exportToPNG();
    }

    toExcel() {
        gantt.exportToExcel();
    }

    toMSProject() {
        gantt.exportToMSProject();
    }*/


    shouldComponentUpdate(nextProps ){
        return this.props.zoom !== nextProps.zoom;
    }

    componentDidUpdate() {
        gantt.render();
    }

    initGanttEvents() {
        if(gantt.ganttEventsInitialized){
            return;
        }
        gantt.ganttEventsInitialized = true;

        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
            if(this.props.onTaskUpdated) {
                this.props.onTaskUpdated(id, 'inserted', task);
            }
        });

        gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
            if(this.props.onTaskUpdated) {
                this.props.onTaskUpdated(id, 'updated', task);
            }
        });

        gantt.attachEvent('onAfterTaskDelete', (id) => {
            if(this.props.onTaskUpdated) {
                this.props.onTaskUpdated(id, 'deleted');
            }
        });

        gantt.attachEvent('onAfterLinkAdd', (id, link) => {
            if(this.props.onLinkUpdated) {
                this.props.onLinkUpdated(id, 'inserted', link);
            }
        });

        gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
            if(this.props.onLinkUpdated) {
                this.props.onLinkUpdated(id, 'updated', link);
            }
        });

        gantt.attachEvent('onAfterLinkDelete', (id, link) => {
            if(this.props.onLinkUpdated) {
                this.props.onLinkUpdated(id, 'deleted');
            }
        });
    }

    componentDidMount() {
        this.setLightbox();
        this.setDuration();
        this.initGanttEvents();
        gantt.init(this.ganttContainer);
        gantt.parse(this.props.tasks);
    }

    render() {
        //this.setZoom(this.props.zoom);
        //this.setScaleConfigs(this.props.zoom);
        this.handleZoomIn(this.props.zoomInBtn);
        this.handleZoomOut(this.props.zoomOutBtn);
        this.handleZoomToFit(this.props.zoomToFitBtn);
        this.toPDF(this.props.toPDFBtn);
        this.toPNG(this.props.toPNGBtn);
        this.toExcel(this.props.toExcelBtn);
        this.toMSProject(this.props.toMSProjectBtn);
        this.handleUndo(this.props.undoBtn);
        this.handleRedo(this.props.redoBtn);
        this.handleFullscreen(this.props.fullscreenBtn);
        this.handleCollapseAll(this.props.collapseAllBtn);
        this.handleExpandAll(this.props.expandAllBtn);
        return (
            <div
                ref={(input) => { this.ganttContainer = input }}
                style={{width: '100%', height: '100%'}}
            >
            </div>
        );
    }
}

export default Gantt;