import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { ErrorHandler } from '../../services/ErrorHandler';
import HomeService from '../../services/homeService';
const Home = () => {
    const [list, setList] = useState([]);
    const [modal, setModal] = useState(false);
    const [pName, setPName] = useState('');
    const [aQty, setAQty] = useState('');
    const [omodal, setOmodal] = useState(false);
    const [omodalData, setOmodalData] = useState('');
    const [oqty, setOqty] = useState('')
    const getProductList = () => {
        HomeService.getProductList().then(response => {
            setList(response.data)
        }).catch(function (error) {
            ErrorHandler(error);
        });
    }
    useEffect(() => {
        getProductList()
    }, [])
    const addProduct = () => {
        if (pName) {
            if (aQty > 0) {
                let payload = { productName: pName, availableQuantity: parseInt(aQty) };
                HomeService.addProduct(payload).then(response => {
                    closeModal();
                    alert("Product added successfully");
                    getProductList();
                }).catch(function (error) {
                    ErrorHandler(error);
                });
            } else {
                alert("Please enter Available Qty ?")
            }
        } else {
            alert("Please enter Product Name ?")
        }
    }
    const closeModal = () => {
        setAQty('');
        setPName('');
        setModal(false);
    }
    const openOmodal = (value) => {
        setOmodalData(value);
        setOmodal(true);
    }
    const closeOModal = () => {
        setOqty('');
        setOmodalData('');
        setOmodal(false);
    }
    const orderProduct = () => {
        if (oqty > 0) {
            if (oqty > omodalData.availableQuantity) {
                alert('Please check the Order Qty with Available Qty ?')
            } else {
                let payload = {
                    productId: omodalData.productId,
                    quantity: parseInt(oqty)
                }
                HomeService.orderProduct(payload).then(response => {
                    closeOModal();
                    alert('Product Ordered successfully');
                    getProductList();
                }).catch(function (error) {
                    ErrorHandler(error);
                });
            }
        } else {
            alert('Please enter Order Qty ?')
        }
    }
    return (
        <div>
            <Button className='m-3' onClick={() => setModal(true)}>Add Product</Button>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Available Qty</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {list.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.productName}</td>
                                <td>{item.availableQuantity}</td>
                                <td>
                                    <Button variant="info" onClick={() => openOmodal(item)}>Order</Button>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
            <Modal show={modal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control value={pName} onChange={(e) => setPName(e.target.value)} type="text" placeholder="Enter Product Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Available Qty</Form.Label>
                            <Form.Control value={aQty} onChange={(e) => setAQty(e.target.value)} type="number" placeholder="Enter Available Qty" />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addProduct}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={omodal} onHide={closeOModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control disabled value={omodalData.productName} type="text" placeholder="Enter Product Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Available Qty</Form.Label>
                            <Form.Control disabled value={omodalData.availableQuantity} type="number" placeholder="Enter Available Qty" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Order Qty</Form.Label>
                            <Form.Control value={oqty} onChange={(e) => setOqty(e.target.value)} type="number" placeholder="Enter Available Qty" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeOModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={orderProduct}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Home