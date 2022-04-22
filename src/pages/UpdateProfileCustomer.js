import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';

import Navbar from '../components/Navbar';

import { API } from '../config/api';

export default function UpdateProfileCustomer() {
  const title = 'Update Profile Customer';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();
  const { id } = useParams();

  const [preview, setPreview] = useState(null); //For image preview
  const [profile, setProfile] = useState({}); //Store product data
  const [form, setForm] = useState({
    image: '',
    phone: '',
    address: '',
    gender: '',
  }); //Store product data

  // Fetching detail product data by id from database
  useQuery('profileCache', async () => {
    const response = await API.get('/profile/' + id);
    console.log(response.data.data.address);
    setPreview(response.data.data.image);
    setForm({
      ...form,
      address: response.data.data.address,
      gender: response.data.data.gender,
      phone: response.data.data.phone,
    });
    setProfile(response.data.data);
  });


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
      if (form.image) {
        formData.set('image', form?.image[0], form?.image[0]?.name);
      }
      formData.set('phone', form.phone);
      formData.set('address', form.address);
      formData.set('gender', form.gender);

      // Insert profile data
      const response = await API.patch(
        '/profile/' + profile.id, // pake token 
        formData,
        config
      );
      console.log(response.data);

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
            <div className="text-header-category mb-4">Update Profile</div>
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
                    alt="preview"
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
                placeholder="Phone Number"
                name="phone"
                onChange={handleChange}
                value={form?.phone}
                className="input-edit-category mt-4"
              />
              <textarea
                placeholder="address"
                name="address"
                onChange={handleChange}
                value={form?.address}
                className="input-edit-category mt-4"
                style={{ height: '130px' }}
              ></textarea>
              <input
                type="text"
                placeholder="gender"
                name="gender"
                onChange={handleChange}
                value={form?.gender}
                className="input-edit-category mt-4"
              />

              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Save
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
