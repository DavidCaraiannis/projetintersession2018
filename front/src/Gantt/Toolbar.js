/*global gantt*/
import React, { Component } from 'react';
import { Button, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { Menu, Responsive, Segment} from "semantic-ui-react";
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_undo';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_fullscreen';
import './api';

export default class Toolbar extends Component {
    constructor(props){
        super(props);
        //this.handleZoomChange=this.handleZoomChange.bind(this);
        this.handleUndo=this.handleUndo.bind(this);
        this.handleRedo=this.handleRedo.bind(this);
        this.handleZoomIn=this.handleZoomIn.bind(this);
        this.handleZoomOut=this.handleZoomOut.bind(this);
        this.handleZoomToFit=this.handleZoomToFit.bind(this);
        this.handleFullscreen=this.handleFullscreen.bind(this);
        this.handleToPDF=this.handleToPDF.bind(this);
        this.handleToPNG=this.handleToPNG.bind(this);
        this.handleToExcel=this.handleToExcel.bind(this);
        this.handleToMSProject=this.handleToMSProject.bind(this);
    }

    /*handleZoomChange(e) {
        if (this.props.onZoomChange) {
            this.props.onZoomChange(e.target.value);
        }
    }*/

    handleUndo() {
        gantt.undo();
    }

    handleRedo() {
        gantt.redo();
    }

    handleZoomIn(e) {
        if (this.props.onZoomIn) {
            this.props.onZoomIn(e.target.value);
        }
    }

    handleZoomOut(e) {
        if (this.props.onZoomOut) {
            this.props.onZoomOut(e.target.value);
        }
    }

    handleZoomToFit(e) {
        if (this.props.onZoomToFit) {
            this.props.onZoomToFit(e.target.value);
        }
    }

    handleFullscreen() {
            if (!gantt.getState().fullscreen) {
                // expanding the gantt to full screen
                gantt.expand();
            }
            else {
                // collapsing the gantt to the normal mode
                gantt.collapse();
            }
    }

    handleToPDF() {
        gantt.exportToPDF({ callback:show_result });
        function show_result(info) {
            if (!info)
                gantt.message({
                    text: "Server error",
                    type: "error",
                    expire: -1
                });
            else
                gantt.message({
                    text: "Click <a href='" + info.url + "'>here</a> to save",
                    expire: -1
                });
        }

        gantt.templates.task_text = function (s, e, task) {
            return "Export " + task.text;
        };
        gantt.config.columns[0].template = function (obj) {
            return obj.text + " -";
        };
    }
    handleToPNG() {
        gantt.exportToPNG({ callback:show_result });
        function show_result(info) {
            if (!info)
                gantt.message({
                    text: "Server error",
                    type: "error",
                    expire: -1
                });
            else
                gantt.message({
                    text: "Click <a href='" + info.url + "'>here</a> to save",
                    expire: -1
                });
        }

        gantt.templates.task_text = function (s, e, task) {
            return "Export " + task.text;
        };
        gantt.config.columns[0].template = function (obj) {
            return obj.text + " -";
        };
    }
    handleToExcel() {
        gantt.exportToExcel({ callback:show_result });
        function show_result(info) {
            if (!info)
                gantt.message({
                    text: "Server error",
                    type: "error",
                    expire: -1
                });
            else
                gantt.message({
                    text: "Click <a href='" + info.url + "'>here</a> to save",
                    expire: -1
                });
        }
        gantt.templates.task_text = function (s, e, task) {
            return "Export " + task.text;
        };
        gantt.config.columns[0].template = function (obj) {
            return obj.text;
        };
        gantt.config.fit_tasks = true;
    }
    handleToMSProject() {
        gantt.exportToMSProject({ callback:show_result });
        function show_result(info) {
            if (!info)
                gantt.message({
                    text: "Server error",
                    type: "error",
                    expire: -1
                });
            else
                gantt.message({
                    text: "Click <a href='" + info.url + "'>here</a> to save",
                    expire: -1
                });
        }
        gantt.templates.task_text = function (s, e, task) {
            return "Export " + task.text;
        };
        gantt.config.columns[0].template = function (obj) {
            return obj.text;
        };
        gantt.config.fit_tasks = true;
    }

    render() {
        return (
            <div>
                <Responsive as={Segment} inverted minWidth={769}>
                    <nav className="navbar navbar-expand-lg">
                        <Container className="gantt-controls">
                            <Menu.Item className="gantt-menu-item" data-action="undo">
                                <Button onClick={this.handleUndo}>Undo</Button>
                            </Menu.Item>
                            <Menu.Item className="gantt-menu-item gantt-menu-item-last" data-action="redo">
                                <Button onClick={this.handleRedo}>Redo</Button>
                            </Menu.Item>
                            <Dropdown>
                            <DropdownToggle caret color="primary" className="gantt-menu-item gantt-menu-item-right gantt-menu-item-last">
                                Export
                            </DropdownToggle>
                            <DropdownMenu className="gantt-controls">
                                <DropdownItem className="gantt-menu-item" data-action="toPDF" onClick={this.handleToPDF}>To PDF</DropdownItem>
                                <DropdownItem className="gantt-menu-item" data-action="toPNG" onClick={this.handleToPNG}>To PNG</DropdownItem>
                                <DropdownItem className="gantt-menu-item" data-action="toExcel" onClick={this.handleToExcel}>To Excel</DropdownItem>
                                <DropdownItem className="gantt-menu-item" data-action="toMSProject" onClick={this.handleToMSProject}>To MSProject</DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                            <Menu.Item className="gantt-menu-item gantt-menu-item-right" data-action="zoomIn">
                                <Button onClick={this.handleZoomIn}>Zoom In</Button>
                            </Menu.Item>
                            <Menu.Item className="gantt-menu-item gantt-menu-item-right" data-action="zoomOut">
                                <Button onClick={this.handleZoomOut}>Zoom Out</Button>
                            </Menu.Item>
                            <Menu.Item className="gantt-menu-item gantt-menu-item-right gantt-menu-item-last" data-action="zoomToFit">
                                <Button onClick={this.handleZoomToFit}>Zoom to Fit</Button>
                            </Menu.Item>
                            <Menu.Item className="gantt-menu-item gantt-menu-item-right gantt-menu-item-last" id="fullscreen_button">
                                <Button onClick={this.handleFullscreen}>Fullscreen</Button>
                            </Menu.Item>

                        </Container>
                    </nav>
                </Responsive>
            </div>
        )
    }
}


/*
* <nav>
            <div>
                <div className="zoom-bar">
                    <b>Zooming: </b>
                    { zoomRadios }
                </div>
            </div>
        </nav>
*/

/*
*
*let zoomRadios = ['Hours', 'Days', 'Months'].map((value) => {
            let isActive = this.props.zoom === value;

            return (
                <div>
                    <label key={value} className={`radio-label ${isActive ? 'radio-label-active': ''}`}>
                        <input type='radio'
                               checked={isActive}
                               onChange={this.handleZoomChange}
                               value={value}/>
                        {value}
                    </label>
                </div>



            )
        });
*/
