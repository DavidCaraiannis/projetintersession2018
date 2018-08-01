import React from 'react';
import axios from 'axios';
import {
    Button,
    Card,
    CardBody,
    CardImage,
    CardTitle,
    CardText,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Container,
    Input   } from 'mdbreact';

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemArray: [],
        };
        this.createProject = this.createProject.bind(this);
        this.randomImage = this.randomImage.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleGantt = this.handleGantt.bind(this);

    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }



    createProject(event) {
        event.preventDefault();
        const item = this.state.itemArray;
        const image = this.randomImage();
        const name = document.getElementById('title').defaultValue;
        const isAgile = document.getElementById('invalidCheck').required;
        item.push({name, isAgile, image});
        this.setState({itemArray: item});
        axios.post('/createProject', {
            name: this.name,
            is_agile: this.isAgile
        })
        this.toggle();
    };

    handleGantt(event) {
        event.preventDefault();
        debugger;
        axios.get('/readProject')
            .then(res => {
                const project_id = res.data.id;
                this.setState({project_id})
            }
        );
        axios.post('/createGantt', {
            project_id: this.project_id,
        })
            .then(res => {
                console.log(res);
            })
            .catch()
    }


// Array for random link
    randomImage() {
        const rdmImg = [
            "https://cdn.dribbble.com/users/130603/screenshots/3194725/catgod_800x600.gif",
            "https://cdn.dribbble.com/users/256781/screenshots/2933600/designers_dribble_06.gif",
            "https://cdn.dribbble.com/users/11867/screenshots/3778710/circle_02.gif",
            "https://cdn.dribbble.com/users/769413/screenshots/3719981/pigeons_-_cub_studio_-_doingness.gif",
            "https://cdn.dribbble.com/users/43762/screenshots/3674284/ms-dir-dribbble-3.gif",
            "https://cdn.dribbble.com/users/43762/screenshots/3674277/ms-dir-dribbble-2.gif",
            "https://cdn.dribbble.com/users/43762/screenshots/3674291/ms-dir-dribbble-4.gif",
            "https://cdn.dribbble.com/users/43762/screenshots/2391583/open-uri20151207-3-ku974m",
            "https://cdn.dribbble.com/users/43762/screenshots/1643630/motherboard-wip-2.gif",
            "https://cdn.dribbble.com/users/43762/screenshots/1637863/motherboard-dribbble-wip.gif",
            "https://cdn.dribbble.com/users/43762/screenshots/1972605/thefurrow_animation.gif",
            "https://cdn.dribbble.com/users/43762/screenshots/2084826/zipcar---dribbble-2.gif",
            "https://cdn.dribbble.com/users/43762/screenshots/2454534/open-uri20160113-3-qq0soq",
            "https://cdn.dribbble.com/users/43762/screenshots/3831189/ui-loop-dribble.gif",
            "https://cdn.dribbble.com/users/215249/screenshots/3471497/letigre_2.gif",
            "https://cdn.dribbble.com/users/730703/screenshots/3653295/sludinajums.gif",
        ];
        return rdmImg[Math.floor(Math.random()*(rdmImg.length))];
    }




    render() {
        return (
            <div className="viewglobal">
                {/* PoPup for register Name and def of project */}
                <Container>
                    <Button
                        id="create-new-project"
                        onClick={this.toggle}
                        className="add-project-btn"
                        label="submit"
                        color="transparent"
                        primary="true">+
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                            <Input name="title" id='title' label='Enter your title project'/>
                        </ModalHeader>
                        <ModalBody id='modal-body' className="form-check pl-10">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                            <label className="form-check-label" htmlFor="invalidCheck">Agree with the terms</label>
                        </ModalBody>
                        <ModalFooter>
                            <Button  color='secondary' onClick={this.toggle}>Close</Button>{' '}
                            <Button color='primary' onClick={this.createProject}>Save</Button>
                        </ModalFooter>
                    </Modal>
                </Container>

                <div className="project-be-create">
                    {this.state.itemArray.map((item, index) => {
                        return (
                            <Card className="card-project">
                                <CardImage id={index} className="img-project img" width="100%" src={item.image} waves />
                                <CardBody>
                                    <CardTitle>{item.name}</CardTitle>
                                    <Button className="project-btn" onClick={this.handleGantt} href="/gantt">Projet</Button>
                                </CardBody>
                            </Card>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Project
