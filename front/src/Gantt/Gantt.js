/*global gantt*/
import React, { Component } from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.js';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_fullscreen';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_undo';

class Gantt extends Component {
    constructor(props) {
        super(props);
        this.state= {
            scaleConfigs: [
                // minutes
                { unit: "minute", step: 1, scale_unit: "hour", date_scale: "%H", subscales: [
                        {unit: "minute", step: 1, date: "%H:%i"}
                    ]
                },
                // hours
                { unit: "hour", step: 1, scale_unit: "day", date_scale: "%j %M",
                    subscales: [
                        {unit: "hour", step: 1, date: "%H:%i"}
                    ]
                },
                // days
                { unit: "day", step: 1, scale_unit: "month", date_scale: "%F",
                    subscales: [
                        {unit: "day", step: 1, date: "%j"}
                    ]
                },
                // weeks
                {unit: "week", step: 1, scale_unit: "month", date_scale: "%F",
                    subscales: [
                        {unit: "week", step: 1, template: function (date) {
                                var dateToStr = gantt.date.date_to_str("%d %M");
                                var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
                                return dateToStr(date) + " - " + dateToStr(endDate);
                            }}
                    ]},
                // months
                { unit: "month", step: 1, scale_unit: "year", date_scale: "%Y",
                    subscales: [
                        {unit: "month", step: 1, date: "%M"}
                    ]},
                // quarters
                { unit: "month", step: 3, scale_unit: "year", date_scale: "%Y",
                    subscales: [
                        {unit: "month", step: 3, template: function (date) {
                                var dateToStr = gantt.date.date_to_str("%M");
                                var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                                return dateToStr(date) + " - " + dateToStr(endDate);
                            }}
                    ]},
                // years
                {unit: "year", step: 1, scale_unit: "year", date_scale: "%Y",
                    subscales: [
                        {unit: "year", step: 5, template: function (date) {
                                var dateToStr = gantt.date.date_to_str("%Y");
                                var endDate = gantt.date.add(gantt.date.add(date, 5, "year"), -1, "day");
                                return dateToStr(date) + " - " + dateToStr(endDate);
                            }}
                    ]},
                // decades
                {unit: "year", step: 10, scale_unit: "year", template: function (date) {
                        var dateToStr = gantt.date.date_to_str("%Y");
                        var endDate = gantt.date.add(gantt.date.add(date, 10, "year"), -1, "day");
                        return dateToStr(date) + " - " + dateToStr(endDate);
                    },
                    subscales: [
                        {unit: "year", step: 100, template: function (date) {
                                var dateToStr = gantt.date.date_to_str("%Y");
                                var endDate = gantt.date.add(gantt.date.add(date, 100, "year"), -1, "day");
                                return dateToStr(date) + " - " + dateToStr(endDate);
                            }}
                    ]}
            ],
            configs: {
                1: function () {
                    gantt.config.scale_unit = "day";
                    gantt.config.step = 1;
                    gantt.config.date_scale = "%d %M";
                    gantt.config.min_column_width = 30;
                    gantt.config.subscales = [
                        {unit: "hour", step: 1, date: "%h"}
                    ];
                    gantt.config.round_dnd_dates = true;

                    gantt.config.scale_height = 60;
                    gantt.templates.date_scale = null;
                },
                2: function () {

                    gantt.config.scale_unit = "week";
                    gantt.config.date_scale = "%W";
                    gantt.config.step = 1;
                    gantt.templates.date_scale = null;
                    gantt.config.min_column_width = 60;
                    gantt.config.subscales = [
                        {unit: "month", step: 1, date: "%M"},
                        {unit: "day", step: 1, date: "%D"}
                    ];
                    gantt.config.round_dnd_dates = true;
                    gantt.config.scale_height = 60;
                    gantt.templates.date_scale = null;
                },
                3: function () {
                    gantt.config.scale_unit = "year";
                    gantt.config.date_scale = "%Y";
                    gantt.config.min_column_width = 60;
                    gantt.config.subscales = [
                        {unit: "month", step: 1, date: "%M"},
                        {unit: "week", step: 1, date: "%W"}
                    ];
                    gantt.config.round_dnd_dates = false;
                    gantt.config.scale_height = 60;
                    gantt.templates.date_scale = null;
                },
                4: function () {
                    gantt.config.scale_unit = "year";
                    gantt.config.step = 1;
                    gantt.config.date_scale = "%Y";
                    gantt.config.min_column_width = 50;
                    gantt.config.round_dnd_dates = false;
                    gantt.config.scale_height = 60;
                    gantt.templates.date_scale = null;


                    gantt.config.subscales = [
                        {unit: "month", step: 1, date: "%M"}
                    ];
                },
                5: function () {
                    gantt.config.scale_unit = "year";
                    gantt.config.step = 1;
                    gantt.config.date_scale = "%Y";
                    gantt.config.min_column_width = 50;
                    gantt.config.round_dnd_dates = false;
                    gantt.config.scale_height = 60;
                    gantt.templates.date_scale = null;


                    function quarterLabel(date) {
                        var month = date.getMonth();
                        var q_num;

                        if (month >= 9) {
                            q_num = 4;
                        } else if (month >= 6) {
                            q_num = 3;
                        } else if (month >= 3) {
                            q_num = 2;
                        } else {
                            q_num = 1;
                        }

                        return "Q" + q_num;
                    }

                    gantt.config.subscales = [
                        {unit: "quarter", step: 1, template: quarterLabel},
                        {unit: "month", step: 1, date: "%M"}
                    ];
                },
                6: function () {
                    gantt.config.scale_unit = "year";
                    gantt.config.round_dnd_dates = false;
                    gantt.config.step = 1;
                    gantt.config.date_scale = "%Y";
                    gantt.config.min_column_width = 50;

                    gantt.config.scale_height = 60;
                    gantt.templates.date_scale = null;

                    gantt.config.subscales = [];
                }
            }
        }
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
            if (task.type == gantt.config.types.milestone) {
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

    setZoom(value){
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

    //Setting available scales
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
    };

    // Methods used for Zoom to fit
    enable() {
        if(!this.enabled) {
            this.enabled = true;
            this.saveConfig();
            this.zoomToFit();
            gantt.render();
        }
    }

    isEnabled(enabled) {
        return enabled;
    }

    toggle() {
        if(this.isEnabled()){
            this.disable();
        }else{
            this.enable();
        }
    }

    disable() {
        if(this.enabled) {
            this.enabled = false;
            this.restoreConfig();
            gantt.render();
        }
    }


    saveConfig() {
        let config = gantt.config;
        this.cachedSettings = {};
        this.cachedSettings.scale_unit = config.scale_unit;
        this.cachedSettings.date_scale = config.date_scale;
        this.cachedSettings.step = config.step;
        this.cachedSettings.subscales = config.subscales;
        this.cachedSettings.template = gantt.templates.date_scale;
        this.cachedSettings.start_date = config.start_date;
        this.cachedSettings.end_date = config.end_date;
    }

    restoreConfig() {
        this.applyConfig(this.cachedSettings);
    }

    applyConfig(config, dates) {
        gantt.config.scale_unit = config.scale_unit;
        if (config.date_scale) {
            gantt.config.date_scale = config.date_scale;
            gantt.templates.date_scale = null;
        }
        else {
            gantt.templates.date_scale = config.template;
        }

        gantt.config.step = config.step;
        gantt.config.subscales = config.subscales;

        if (dates) {
            gantt.config.start_date = gantt.date.add(dates.start_date, -1, config.unit);
            gantt.config.end_date = gantt.date.add(gantt.date[config.unit + "_start"](dates.end_date), 2, config.unit);
        } else {
            gantt.config.start_date = gantt.config.end_date = null;
        }
    }



    zoomToFit() {
        let project = gantt.getSubtaskDates(),
            areaWidth = gantt.$task.offsetWidth;

        for (var i = 0; i < this.scaleConfigs.length; i++) {
            var columnCount = this.getUnitsBetween(project.start_date, project.end_date, this.scaleConfigs[i].unit, this.scaleConfigs[i].step);
            if ((columnCount + 2) * gantt.config.min_column_width <= areaWidth) {
                break;
            }
        }

        if (i === this.scaleConfigs.length) {
            i--;
        }

        this.applyConfig(this.scaleConfigs[i], project);
    }

    // get number of columns in timeline
    getUnitsBetween(from, to, unit, step) {
        var start = new Date(from),
            end = new Date(to);
        var units = 0;
        while (start.valueOf() < end.valueOf()) {
            units++;
            start = gantt.date.add(start, step, unit);
        }
        return units;
    }

    // Methods for ZoomIn and ZoomOut
    deactivate() {
        this.isActive = false;
    }

    zoomOut() {
        if(this.canZoomOut()){
            let current;
            this.isActive = true;
            current = (this.current + 1);
            if(!this.configs[current])
                current = 6;

            this.setZoom(current);
            gantt.refresh();
        }
    }

    zoomIn() {
        if(this.canZoomIn()){
            let current;
            this.isActive = true;
            current = (this.current - 1);
            if(!this.configs[current])
                current = 1;
            this.setZoom(current);
            gantt.refresh();
        }
    }

    canZoomOut() {
        return  !this.isActive || !!(this.configs[this.current + 1]);
    }

    canZoomIn() {
        return !this.isActive || !!(this.configs[this.current - 1]);
    }

    addClass(node, className){
        node.className += " " + className;
    }

    removeClass(node, className){
        node.className = node.className.replace(new RegExp(" *" + className.replace(/\-/g, "\\-"), "g"), "");
    }

    getButton(name){
        return document.querySelector(".gantt-controls [data-action='"+name+"']");
    }

    highlightButton(name){
        this.addClass(this.getButton(name), "menu-item-active");
    }
    unhighlightButton(name){
        this.removeClass(this.getButton(name), "menu-item-active");
    }

    disableButton(name){
        this.addClass(this.getButton(name), "menu-item-disabled");
    }

    enableButton(name){
        this.removeClass(this.getButton(name), "menu-item-disabled");
    }

    refreshZoomBtns(){
        if(this.canZoomIn()){
            this.enableButton("zoomIn");
        }else{
            this.disableButton("zoomIn");
        }
        if(this.canZoomOut()){
            this.enableButton("zoomOut");
        }else{
            this.disableButton("zoomOut");
        }
    }

    refreshUndoBtns(){
        if(!gantt.getUndoStack().length){
            this.disableButton("undo");
        }else{
            this.enableButton("undo");
        }

        if(!gantt.getRedoStack().length){
            this.disableButton("redo");
        }else{
            this.enableButton("redo");
        }

    }

    //setInterval(this.refreshUndoBtns, 1000);

    toggleZoomToFitBtn(){
        if(this.isEnabled()){
            this.highlightButton("zoomToFit");
        }else{
            this.unhighlightButton("zoomToFit");
        }
    }

    //Buttons on navbar

    handleZoomIn() {
        this.disable();
        this.zoomIn();
        this.refreshZoomBtns();
        this.toggleZoomToFitBtn();
    }

    handleZoomOut() {
        this.disable();
        this.zoomOut();
        this.refreshZoomBtns();
        this.toggleZoomToFitBtn();
    }

    handleZoomToFit() {
        this.deactivate();
        this.toggle();
        this.toggleZoomToFitBtn();
        this.refreshZoomBtns();
    }

    handleUndo() {
        gantt.undo();
        this.refreshUndoBtns();
    }

    handleRedo() {
        gantt.redo();
        this.refreshUndoBtns();
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
        /*this.toPDF(this.props.toPDFBtn);
        this.toPNG(this.props.toPNGBtn);
        this.toExcel(this.props.toExcelBtn);
        this.toMSProject(this.props.toMSProjectBtn);*/
        this.handleUndo(this.props.undoBtn);
        this.handleRedo(this.props.redoBtn);
        this.handleFullscreen(this.props.fullscreenBtn);
        this.handleCollapseAll(this.props.collapseAllBtn);
        this.handleExpandAll(this.props.expandAllBtn);
        return (
            <div
                ref={(input) => { this.ganttContainer = input }}
                style={{width: '100%', height: '100%'}}
            ></div>
        );
    }
}

export default Gantt;