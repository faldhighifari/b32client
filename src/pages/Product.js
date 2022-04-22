import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';
// import { Container, Row, Col } from 'react-bootstrap';
import { Nav, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { UserContext } from '../context/userContext';
import { useQuery } from 'react-query';

import Navbar from '../components/Navbar';
import convertRupiah from "rupiah-format";

import imgEmpty from '../assets/empty.svg';

// API config
import { API } from '../config/api';

export default function Product() {
  const title = 'Shop';
  document.title = 'DumbMerch | ' + title;

  let { data: products } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });

  console.log(products);

  return (
    <div>
      <Navbar title={title} />
      <Container className="mt-5">
        <Row>
          <Col>
            <div className="text-header-product">Product</div>
          </Col>
        </Row>
        <Row className="my-4">
          {products?.length !== 0 ? (
            <>
              {products?.map((product, index) => (
               <Col sm={3} key={index}>
               <Link to={`/product/` + product.id} style={{textDecoration:'none'}}>
               <Card style={{width:'auto'}}>
                 <Card.Img variant="top" src={product.image} />
                 <Card.Body className="bg-dark">
                   <Card.Title className="text-danger">{product.name}</Card.Title>
                   <Card.Text className="text-white">{convertRupiah.convert(product.price)}</Card.Text>
                   <Card.Text className="text-white"> Stock: {product.qty}</Card.Text>
                 </Card.Body>
               </Card>
               </Link>
             </Col>
              ))}
            </>
          ) : (
            <Col>
              <div className="text-center pt-5">
                <img
                  src={imgEmpty}
                  className="img-fluid"
                  style={{ width: '40%' }}
                  alt="empty"
                />
                <div className="mt-3">No data product</div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
