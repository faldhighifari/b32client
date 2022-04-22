import { useContext, useState, useEffect } from 'react';

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
  const title = 'Fitur';
  document.title = 'DumbMerch | ' + title;

  let { data: products } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });

  console.log(products);

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState([]); 

  // Fetching category data 
  const getCategories = async () => {
    try {
      const response = await API.get('/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };


  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Navbar title={title} />
      <Container className="mt-5">
      <Row>
                <Col style={{ display: 'flex', justifyContent:'center', textAlign: 'center', color:'white'}} >
                            <Card style={{ width: '90rem'}} className='bg-dark'>
                                <Card.Body>
                                    <Card.Title>Filter Product</Card.Title>
                                    {/* <Card.Subtitle className="mb-2 text-muted">Price, Category</Card.Subtitle> */}
                                    <Card.Text>
                                    {categories.map((item, index) => (
                                      <label className="checkbox-inline me-4" key={index}>
                                        <input
                                          type="checkbox"
                                          value={item.id}
                                          onClick={handleChangeCategoryId}
                                        />{' '}
                                        {item.name}
                                      </label>
                                    ))}
                                    </Card.Text>
                                    <Card.Link href="#"></Card.Link>
                                    <Card.Link href="#"></Card.Link>
                                </Card.Body>
                            </Card>
                    </Col>  
                </Row> 
        <Row>
          <Col>
           
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
