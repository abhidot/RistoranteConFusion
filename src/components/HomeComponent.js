import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap';

function RenderItem({item}){
  return(
    <Card>
      <CardImg src={item.image} alt={item.name}/>
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
}

function Home(props) {
    return(
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md m-1">
            <RenderItem item={props.dish} />
          </div>
          <div className="col-12 col-md m-1">
            <RenderItem item={props.promotion} />
          </div>
          <div className="col-12 col-md m-1">
            <RenderItem item={props.leader} />
          </div>
        </div>
      </div>
    );
}

export default Home;   