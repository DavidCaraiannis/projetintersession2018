import React from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';

class CardExample extends React.Component {
    render() {
        return (
            <Card>
                <CardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg" waves />
                <CardBody>
                    <CardTitle> Projet Zero </CardTitle>
                    <CardText>Projet sur plusieurs semaines.</CardText>
                    <Button href="#">Projet</Button>
                </CardBody>
            </Card>
        )
    }
}
