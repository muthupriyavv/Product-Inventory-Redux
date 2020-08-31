import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './display.css';
import axios from 'axios';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import removeProduct from '../../../actions/deleteProduct';
import Pagination from "react-js-pagination";



class DisplayProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            name: '',
            quantity: '',
            price: '',
            category: '',
            id: '',
            productArray: [],
            currentPage: 1,
            productPerPage: 5,
            currentPageProducts:[]
        }
        this.deleteProduct = this.deleteProduct.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSortName = this.onSortName.bind(this)
        this.onSortPrice = this.onSortPrice.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)

    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber })
    };
  

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            productArray : nextProps.productList
        })
    }


    deleteProduct(id) {
        axios.delete(`http://localhost:3002/products/${id}`).then((responseData) => {
            console.log(responseData)
            this.props.deleteProduct(id)
            this.props.getAllProduct()
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSortName() {
       let sortedItems = this.state.productArray;
       const sorted = sortedItems.sort((a,b) => {
              return a.name.localeCompare(b.name)
       });
       console.log("sorted",sorted)
       this.setState({
           productArray : sorted
       })
       console.log("sortproduct",this.state.productArray)
    }

    onSortPrice() {
        let sortedItems = this.state.productArray;
        const sorted = sortedItems.sort((a,b) => {
               return a.price - b.price
        });
        console.log("sorted",sorted)
        this.setState({
            productArray : sorted
        })
        console.log("sortproduct",this.state.productArray)
     }

    render() {
        const indexOfLastProduct = this.state.currentPage * this.state.productPerPage;
        const indexOfFirstProduct = indexOfLastProduct - this.state.productPerPage;
        const currentPageProduct = this.state.productArray.slice(indexOfFirstProduct, indexOfLastProduct);
        const productDetails = currentPageProduct.map((product,index) => {
            return (
                <div className="card" key={index}>
                    <div className="imageholder">
                        <img src={product.image} alt="" className="image" />
                    </div>
                    <div className="textContainer"> 
                        <h4><b>{product.name}</b></h4>
                        <span>
                            <p><b>Price:</b>{product.price}</p>
                            <p><b>Quantity:</b>{product.quantity}</p>
                        </span>
                        <span>
                            <Link to={{
                                pathname: `/products/editproduct/${product.id}`
                            }}>
                                <button className="button editbutton">EDIT</button>
                            </Link>
                            <button className="button deletebutton" onClick={() => this.deleteProduct(product.id)}>DELETE</button>
                        </span>
                    </div>
                </div>
            )
        })
        return (
            <div className="displayContainer">
                <div className="sortContainer">
                    <button type="button" onClick={() => this.onSortName()}>SORT BY NAME</button>
                    <button type="button" onClick={() => this.onSortPrice()}>SORT BY PRICE</button>
                </div>
                {productDetails}
                <div > 
                <Pagination
                        activePage={this.state.currentPage}
                        itemsCountPerPage={this.state.productPerPage}
                        totalItemsCount={this.state.productArray.length}
                        pageRangeDisplayed={1}
                        onChange={this.handlePageChange.bind(this)}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
        )
    }
}


function mapPropsToStore(dispatch){
    return bindActionCreators({
        deleteProduct : removeProduct
    },dispatch)
}

export default connect(null,mapPropsToStore)(withRouter(DisplayProduct));