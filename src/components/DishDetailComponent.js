import React from 'react';
import { Card , CardImg  , CardTitle , CardText , CardBody , BreadcrumbItem, Breadcrumb} from "reactstrap";
import { Link } from 'react-router-dom';


function RenderComments({comments}){
    if(comments==null){
        return(
            <div></div>
        );
    }else{
        const dishComments = comments.map((comment)=>{
            return(
                <li key ={comment.id} className="comments pb-4">
                    <div className="pb-2">{comment.comment}</div>
                    <div>
                        --{comment.author}, { new Intl.DateTimeFormat('en-US',{year : 'numeric' , month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </div>
                </li>
            );
        });
        return (
            <div>
                {dishComments}
            </div>
        );   
    }
}
function RenderDishDetail({dish}){
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}
const DishDetail = (props)=>{
        if(props.dish!=null){
            return (
                <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr/>
                            </div>      
                        </div>
                    <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDishDetail dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            <RenderComments comments={props.comments} />
                        </ul>
                    </div>
                </div>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
}

export default DishDetail;