import {ActionTab} from "../components/ActionTab";
import {MyTable} from "../components/MyTable";
import {Fragment, useState} from "react";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import * as React from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Home = () => {
    const [rows, setRows] = useState();
    const [open, setOpen] = useState(false);

    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setNewName('');
        setNewDescription('');
        setNewPrice('');
        setOpen(false);
    }

    const getData = async () => {
        fetch("http://127.0.0.1:8000/api/products")
            .then((response) => response.json())
            .then((data) => setRows(data.products));
    }

    const storeData = async () => {
        const url = "http://127.0.0.1:8000/api/products";
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'name': newName,
                'description': newDescription,
                'price': newPrice
            }), // body data type must match "Content-Type" header
        });
        const data = await response.json(); // parses JSON response into native JavaScript objects
        setRows(data.products);
        handleClose();
    }

    return (
        <Box>
            <ActionTab handleOpen={handleOpen} getData={getData}/>
            <MyTable getData={getData} rows={rows} setRows={setRows}/>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField value={newName} onChange={(e) => setNewName(e.target.value)} sx={{ my: '5px' }} id="outlined-basic" label="Name" variant="outlined" fullWidth />
                    <TextField value={newDescription} onChange={(e) => setNewDescription(e.target.value)} sx={{ my: '5px' }} id="outlined-basic" label="Description" variant="outlined" fullWidth />
                    <TextField value={newPrice} onChange={(e) => setNewPrice(e.target.value)} sx={{ my: '5px' }} id="outlined-basic" label="Price" variant="outlined" fullWidth />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: '5px' }}>
                        <Button onClick={() => storeData()} sx={{ mx: '5px' }} variant="contained">Confirm</Button>
                        <Button onClick={() => handleClose()} sx={{ mx: '5px' }} variant="contained" color="error">Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}