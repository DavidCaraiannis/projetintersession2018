import React from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';

class CardExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return [
            <Button
                className="add-project-btn"
                label="submit"
                color="transparent"
                primary="true">+
            </Button>,
            <Card className="card-project">
                <CardImage className="img" src="https://cdn.dribbble.com/users/43762/screenshots/1438974/ng-colab-space_night.gif" waves />
                <CardBody>
                    <CardTitle> Projet Zero </CardTitle>
                    <CardText>Projet sur plusieurs semaines.</CardText>
                    <Button className="project-btn" href="#">Projet</Button>
                </CardBody>
            </Card>,
            <Card className="card-project">
                <CardImage className="img" src="https://cdn.dribbble.com/users/43762/screenshots/3674249/ms-dir-dribbble-1.gif" waves />
                <CardBody>
                    <CardTitle> Projet Zero </CardTitle>
                    <CardText>Projet sur plusieurs semaines.</CardText>
                    <Button className="project-btn"  href="#">Projet</Button>
                </CardBody>
            </Card>,
            <Card className="card-project">
                <CardImage className="img" src="https://cdn.dribbble.com/users/43762/screenshots/3674284/ms-dir-dribbble-3.gif" waves />
                <CardBody>
                    <CardTitle> Projet Zero </CardTitle>
                    <CardText>Projet sur plusieurs semaines.</CardText>
                    <Button className="project-btn"  href="#">Projet</Button>
                </CardBody>
            </Card>
        ]
    }
}

export default CardExample
