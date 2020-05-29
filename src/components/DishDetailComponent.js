import React, {Component} from 'react';
import { Card , CardImg  , CardTitle , CardText , CardBody , BreadcrumbItem, Breadcrumb, Button, Modal, ModalBody, ModalHeader , Label} from "reactstrap";
import { Link } from 'react-router-dom';
import {LocalForm , Control, Errors } from 'react-redux-form';


const required  = val => val && val.length;
const maxLength = len => val => !(val) || (val.length<=len);
const minLength = len => val => val && (val.length>=len);

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.handleComment = this.handleComment.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state= {
            isModalOpen : false
        };
        
    }
    handleComment(values){
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
    }
    toggleModal(){
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    render(){
        return(
            <React.Fragment>
            <Button outline onClick={this.toggleModal}><span className="fas fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleComment(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating </Label>
                                <Control.select model=".rating" name="rating"
                                            id="rating"
                                            className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="name">Your Name</Label>
                                <div>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators = {{
                                            required, minLength:minLength(3), maxLength:maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        show="touched"
                                        model=".name"
                                        messages={{
                                            required:"Required ",
                                            minLength:"Must be greater than 2 characters",
                                            maxLength:"Must be 15 characters or less"
                                        }} 
                                    />   
                                </div>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <div>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                                </div>
                            </div>
                            <div className="form-group">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </div>
                        </LocalForm>
                </ModalBody>
            </Modal>
            </React.Fragment>
        );
    }
} 



function RenderComments({comments,addComment,dishId}){
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
                        <CommentForm dishId={props.dish.id} addComment={props.addComment}/>
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