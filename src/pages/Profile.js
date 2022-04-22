import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';

import Navbar from '../components/Navbar';

import { UserContext } from '../context/userContext';

import imgBlank from '../assets/profile.png';

import { API } from '../config/api';

export default function Profile() {
  let navigate = useNavigate();
  const title = 'Profile';
  document.title = 'DumbMerch | ' + title;

  const [state] = useContext(UserContext);

  const updateProfile = () => {
    navigate('/update-profile'); //pake id
  };

  const addProfile = () => {
    navigate('/add-profile');
  };

  // const [transactions, setTransactions] = useState([]);

  let { data: profile } = useQuery('profileCache', async () => {
    const response = await API.get('/profile');
    return response.data.data;
  });

  let { data: transactions } = useQuery('transactionsCache', async () => {
    const response = await API.get('/transactions');
    return response.data.data;
  });

  return (
    <>
      <Navbar title={title} />
      <Container className="my-5">
        <Row>
          <Col md="6">
            <div className="text-header-product mb-4">My Profile</div> 
            <Row>
              <Col md="6">
                <img
                  src={profile?.image ? profile.image : imgBlank}
                  className="img-fluid rounded"
                  alt="avatar"
                />
                {profile?.id ? 
                <Button
                  onClick={updateProfile}
                  className="btn-variant"
                  style={{ width: '100px' , marginTop:'10px'}}
                >
                  Update
                </Button>
                  :
                <Button
                  onClick={addProfile}
                  className="btn-variant"
                  style={{ width: '100px' , marginTop:'10px'}}
                >
                  Add
                </Button>
                 }
              </Col>
              <Col md="6">
                <div className="profile-header">Name</div>
                <div className="profile-content">{state.user.name}</div>

                <div className="profile-header">Email</div>
                <div className="profile-content">{state.user.email}</div>

                <div className="profile-header">Phone</div>
                <div className="profile-content">
                  {profile?.phone ? profile?.phone : '-'}
                </div>

                <div className="profile-header">Gender</div>
                <div className="profile-content">
                  {profile?.gender ? profile?.gender : '-'}
                </div>

                <div className="profile-header">Address</div>
                <div className="profile-content">
                  {profile?.address ? profile?.address : '-'}
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <div className="text-header-product mb-4">My Transaction</div>
            {transactions?.length !== 0 ? (
              <>
                {transactions?.map((item, index) => (
                  <div
                    key={index}
                    style={{ background: '#303030' }}
                    className="p-2 mb-1"
                  >
                    <Container fluid className="px-1">
                      <Row>
                        <Col xs="3">
                          <img
                            src={item.product.image}
                            alt="img"
                            className="img-fluid"
                            style={{
                              height: '120px',
                              width: '170px',
                              objectFit: 'cover',
                            }}
                          />
                        </Col>
                        <Col xs="6">
                          <div
                            style={{
                              fontSize: '18px',
                              color: '#F74D4D',
                              fontWeight: '500',
                              lineHeight: '19px',
                            }}
                          >
                            {item.product.name}
                          </div>

                          <div
                            className="mt-3"
                            style={{
                              fontSize: '14px',
                              fontWeight: '300',
                            }}
                          >
                            Price : {(item.price)}
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                ))}
              </>
            ) : (
              <div className="no-data-transaction">There is no transaction</div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
