import React, { Component } from 'react';
import { Button, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { Menu, Responsive, Segment} from "semantic-ui-react";

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
        this.handleCollapseAll=this.handleCollapseAll.bind(this);
        this.handleExpandAll=this.handleExpandAll.bind(this);
        this.toPDF=this.toPDF.bind(this);
        this.toPNG=this.toPNG.bind(this);
        this.toExcel=this.toExcel.bind(this);
        this.toMSProject=this.toMSProject.bind(this);
    }

    /*handleZoomChange(e) {
        if (this.props.onZoomChange) {
            this.props.onZoomChange(e.target.value);
        }
    }*/

    handleUndo() {
        this.props.onUndo;
    }
    handleRedo() {
        this.props.onRedo;
    }
    handleZoomIn() {
        this.props.onZoomIn;
    }
    handleZoomOut() {
        this.props.onZoomOut;
    }
    handleZoomToFit() {
        this.props.onZoomToFit;
    }
    handleFullscreen() {
        this.props.onFullscreen;
    }
    handleCollapseAll() {
        this.props.onCollapseAll;

    }
    handleExpandAll() {
        this.props.onExpandAll;
    }

    toPDF() {
        this.props.onToPDF;
    }
    toPNG() {
        this.props.onToPNG;
    }
    toExcel() {
        this.props.onToExcel;
    }
    toMSProject() {
        this.props.onToMSProject;
    }

    render() {
        return (
            <div>
                <Responsive as={Segment} inverted minWidth={769}>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-blue">
                        <Container>
                            <Menu.Item className="gantt-menu-item" data-action="collapseAll">
                                <Button onClick={this.handleCollapseAll}>Collapse All</Button>
                            </Menu.Item>
                            <Menu.Item className="gantt-menu-item gantt-menu-item-last" data-action="expandAll">
                                <Button onClick={this.handleExpandAll}>Expand All</Button>
                            </Menu.Item>
                            <Menu.Item className="gantt-menu-item" data-action="undo">
                                <Button onClick={this.handleUndo}>Undo</Button>
                            </Menu.Item>
                            <Menu.Item className="gantt-menu-item gantt-menu-item-last" data-action="redo">
                                <Button onClick={this.handleRedo}>Redo</Button>
                            </Menu.Item>
                            <Menu.Item className="gantt-menu-item gantt-menu-item-right" data-action="fullscreen">
                                <Button onClick={this.handleFullscreen}>Fullscreen</Button>
                            </Menu.Item>
                            <Menu.Item className="gantt-menu-item gantt-menu-item-right" data-action="zoomIn">
                                <Button onClick={this.handleZoomIn}>Zoom In</Button>
                            </Menu.Item>
                            <Menu.Item className="gantt-menu-item gantt-menu-item-right" data-action="ZoomOut">
                                <Button onClick={this.handleZoomOut}>Zoom Out</Button>
                            </Menu.Item>
                            <Menu.Item className="gantt-menu-item gantt-menu-item-right gantt-menu-item-last" data-action="zoomToFit">
                                <Button onClick={this.handleZoomToFit}>Zoom to Fit</Button>
                            </Menu.Item>
                            <Dropdown>
                            <DropdownToggle caret color="primary" className="gantt-menu-item gantt-menu-item-right gantt-menu-item-last">
                                Export
                            </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem className="gantt-menu-item" data-action="toPDF"><Button onClick={this.toPDF}>To PDF</Button></DropdownItem>
                                    <DropdownItem className="gantt-menu-item" data-action="toPNG"><Button onClick={this.toPNG}>To PNG</Button></DropdownItem>
                                    <DropdownItem className="gantt-menu-item" data-action="toExcel"><Button onClick={this.toExcel}>To Excel</Button></DropdownItem>
                                    <DropdownItem className="gantt-menu-item" data-action="toMSProject"><Button onClick={this.toMSProject}>To MSProject</Button></DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Container>
                    </nav>
                </Responsive>
            </div>
        )
    }
}

//style="text-align: center;height: 40px;line-height: 40px;"
//<Button onClick={this.toggleMode}>Zoom to fit</Button>

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

    /*function setScaleConfig(config){
        configs[config]();
    }*/