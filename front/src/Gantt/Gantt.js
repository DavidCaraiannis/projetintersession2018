/*global gantt*/
import React, { Component } from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.js';

//Setting available scales
/*let scaleConfigs = [
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
                    let dateToStr = gantt.date.date_to_str("%d %M");
                    let endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
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
                    let dateToStr = gantt.date.date_to_str("%M");
                    let endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                    return dateToStr(date) + " - " + dateToStr(endDate);
                }}
        ]},
    // years
    {unit: "year", step: 1, scale_unit: "year", date_scale: "%Y",
        subscales: [
            {unit: "year", step: 5, template: function (date) {
                    let dateToStr = gantt.date.date_to_str("%Y");
                    let endDate = gantt.date.add(gantt.date.add(date, 5, "year"), -1, "day");
                    return dateToStr(date) + " - " + dateToStr(endDate);
                }}
        ]},
    // decades
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
];*/

class Gantt extends Component {

    /*toggleMode(toggle) {
        toggle.enabled = !toggle.enabled;

        let cachedSettings = {};
        function saveConfig() {
            let config = gantt.config;
            cachedSettings = {};
            cachedSettings.scale_unit = config.scale_unit;
            cachedSettings.date_scale = config.date_scale;
            cachedSettings.step = config.step;
            cachedSettings.subscales = config.subscales;
            cachedSettings.template = gantt.templates.date_scale;
            cachedSettings.start_date = config.start_date;
            cachedSettings.end_date = config.end_date;
        }

        function applyConfig(config, dates) {
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

        function restoreConfig() {
            applyConfig(cachedSettings);
        }



        // get number of columns in timeline
        function getUnitsBetween(from, to, unit, step) {
            let start = new Date(from),
                end = new Date(to);
            let units = 0;
            while (start.valueOf() < end.valueOf()) {
                units++;
                start = gantt.date.add(start, step, unit);
            }
            return units;
        }

        function zoomToFit() {
            let project = gantt.getSubtaskDates(),
                areaWidth = gantt.$task.offsetWidth;

            for (var i = 0; i < scaleConfigs.length; i++) {
                let columnCount = getUnitsBetween(project.start_date, project.end_date, scaleConfigs[i].unit, scaleConfigs[i].step);
                if ((columnCount + 2) * gantt.config.min_column_width <= areaWidth) {
                    break;
                }
            }

            if (i === scaleConfigs.length) {
                i--;
            }

            applyConfig(scaleConfigs[i], project);
        }

        if (toggle.enabled) {
            toggle.innerHTML = "Set default Scale";
            //Saving previous scale state for future restore
            saveConfig();
            zoomToFit();
        } else {

            toggle.innerHTML = "Zoom to Fit";
            //Restore previous scale state
            restoreConfig();
            gantt.render();
        }
    }*/

    setDuration() {
        gantt.config.duration_unit = 'hour';
        gantt.config.grid_resize = true;
        gantt.config.work_time = true;
        gantt.config.skip_off_time = true;

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
        this.setZoom(this.props.zoom);
        //this.toggleMode(this.toggleMode);
        return (
            <div
                ref={(input) => { this.ganttContainer = input }}
                style={{width: '100%', height: '100%'}}
            ></div>
        );
    }
}

export default Gantt;