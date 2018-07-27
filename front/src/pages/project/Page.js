import React from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    const array =[0,1,2,3,4]

    }
    render() {
        return (
            <div className="viewglobal">
                <Button
                    className="add-project-btn"
                    label="submit"
                    color="transparent"
                    primary="true">+
                </Button>
                <Card className="card-project">
                    <CardImage id="img-project" className="img" width="100%" src="https://cdn.dribbble.com/users/256781/screenshots/2933600/designers_dribble_06.gif" waves />
                    <CardBody>
                        <CardTitle> Projet Zero </CardTitle>
                        <CardText>Projet sur plusieurs semaines.</CardText>
                        <Button className="project-btn" href="#">Projet</Button>
                    </CardBody>
                </Card>
                <Card className="card-project">
                    <CardImage id="img-project" className="img" width="100%" src="https://cdn.dribbble.com/users/43762/screenshots/3674249/ms-dir-dribbble-1.gif" waves />
                    <CardBody>
                        <CardTitle> Projet Zero </CardTitle>
                        <CardText>Projet sur plusieurs semaines.</CardText>
                        <Button className="project-btn"  href="#">Projet</Button>
                    </CardBody>
                </Card>
                <Card className="card-project">
                    <CardImage id="img-project" className="img" width="100%" src="https://cdn.dribbble.com/users/43762/screenshots/3674284/ms-dir-dribbble-3.gif" waves />
                    <CardBody>
                        <CardTitle> Projet Zero </CardTitle>
                        <CardText>Projet sur plusieurs semaines.</CardText>
                        <Button className="project-btn"  href="#">Projet</Button>
                    </CardBody>
                </Card>
                <Card className="card-project">
                    <CardImage id="img-project" className="img" width="100%" src="https://cdn.dribbble.com/users/130603/screenshots/4449444/plants_03_dribbble.gif" waves />
                    <CardBody>
                        <CardTitle> Projet Zero </CardTitle>
                        <CardText>Projet sur plusieurs semaines.</CardText>
                        <Button className="project-btn"  href="#">Projet</Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Project
