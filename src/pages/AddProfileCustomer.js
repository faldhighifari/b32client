import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';

import Navbar from '../components/Navbar';

import { API } from '../config/api';

export default function AddProfileCustomer() {
  console.clear();
  const title = 'Profile Customer';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: '',
    phone: '',
    address: '',
    gender: '',
  }); //Store product data


  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set('image', form.image[0], form.image[0].name);
      formData.set('phone', form.phone);
      formData.set('address', form.address);
      formData.set('gender', form.gender);

      console.log(form);

      // Insert product data
      const response = await API.post('/profile', formData, config);
      console.log(response);

      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Navbar title={title} />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4">Add Profile</div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: '150px',
                      maxHeight: '150px',
                      objectFit: 'cover',
                    }}
                    alt={preview}
                  />
                </div>
              )}
              <input
                type="file"
                id="upload"
                name="image"
                hidden
                onChange={handleChange}
              />
              <label for="upload" className="label-file-add-product">
                Upload file
              </label>
              <input
                type="text"
                placeholder="Phone number"
                name="phone"
                onChange={handleChange}
                className="input-edit-category mt-4"
              />
              <textarea
                placeholder="Address"
                name="address"
                onChange={handleChange}
                className="input-edit-category mt-4"
                style={{ height: '130px' }}
              ></textarea>
              <input
                type="text"
                placeholder="gender"
                name="gender"
                onChange={handleChange}
                className="input-edit-category mt-4"
              />

              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Add
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
