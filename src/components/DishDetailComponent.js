import React from 'react';
import { Card , CardImg  , CardTitle , CardText , CardBody } from "reactstrap";



function RenderComments({comments}){
    if(comments==null){
        return(
            <div></div>
        );
    }else{
        return (
            <div>
                <div className="pb-2">{comments.comment}</div>
                <div>
                    --{comments.author}, { new Intl.DateTimeFormat('en-US',{year : 'numeric' , month: 'short', day:'2-digit'}).format(new Date(Date.parse(comments.date)))}
                </div>
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
    const dish = props.selectedDish;
        if(dish!=null){
            const dishComments = props.selectedDish.comments.map((commentObj)=>{
                console.log("dishComments was invoked");
                return(
                    <li key ={commentObj.id} className="comments pb-4">
                        <RenderComments comments={commentObj} />
                    </li>
                );
            });
            return (
                <div className="container">
                    <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDishDetail dish={dish} />
                    </div>
                    <div className="col-12 col-md-5">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {dishComments}
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