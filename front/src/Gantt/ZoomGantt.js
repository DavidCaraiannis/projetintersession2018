/*global gantt*/
import React, { Component } from 'react';
import Gantt from './Gantt';

class ZoomGantt extends Component {

    constructor(props) {
        super(props);
        this.setGantt = this.setGantt.bind(this);
    }

    // Methods used for Zoom to fit

        //Setting available scales

        configs = {
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
        };

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

        setScaleConfig(config){
            this.configs[config]();
        }


        refresh(){
            if(gantt.$container)
                gantt.render();
        }

        zoomOut() {
            if(this.canZoomOut()){
                let current;
                this.isActive = true;
                current = (this.current + 1);
                if(!this.configs[current])
                    current = 6;

                this.setScaleConfig(current);
                this.refresh();
            }
        }

        zoomIn() {
            if(this.canZoomIn()){
                let current;
                this.isActive = true;
                current = (this.current - 1);
                if(!this.configs[current])
                    current = 1;
                this.setScaleConfig(current);
                this.refresh();
            }
        }

        canZoomOut() {
            return  !this.isActive || !!(this.configs[this.current + 1]);
        }

        canZoomIn() {
            return !this.isActive || !!(this.configs[this.current - 1]);
        }

        addClass(node, className){
            if (node == null) {
                alert('Error "node is null" : call the support');
            } else {
                node.className += " " + className;
            }
        }

        removeClass(node, className){
            if (node == null) {
                alert('Error "node is null" : call the support');
            } else {
                node.className = node.className.replace(new RegExp(" *" + className.replace(/\-/g, "\\-"), "g"), "");
            }
        }

        getButton(name){
            debugger;
            return document.getElementsByClassName("gantt-controls [data-action='"+name+"']");
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
}

export default ZoomGantt;