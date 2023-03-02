import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Button, Modal, styled, tableCellClasses, TextField} from "@mui/material";
import {useState} from "react";

// function createData(id, name, description, price, action) {
//     return {id, name, description, price, action};
// }
//
// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const MyTable = ({getData, rows, setRows}) => {
    const [open, setOpen] = useState(false);

    const [editID, setEditID] = useState('');
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editPrice, setEditPrice] = useState('');

    const handleOpen = async (id) => {
        fetch("http://127.0.0.1:8000/api/product/" + id)
            .then((response) => response.json())
            .then((data) => {
                setEditID(id);
                setEditName(data.product.name);
                setEditDescription(data.product.description);
                setEditPrice(data.product.price);
            });
        setOpen(true);
    }
    const handleClose = () => {
        setEditID('');
        setEditName('');
        setEditDescription('');
        setEditPrice('');
        setOpen(false);
    }

    const updateData = async () => {
        const url = "http://127.0.0.1:8000/api/product/" + editID + "/update";
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'name': editName,
                'description': editDescription,
                'price': editPrice
            }), // body data type must match "Content-Type" header
        });
        const data = await response.json(); // parses JSON response into native JavaScript objects
        handleClose();
        getData();
    }

    const deleteData = async (id) => {
        const url = "http://127.0.0.1:8000/api/product/" + id + "/delete";
        const response = await fetch(url, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json(); // parses JSON response into native JavaScript objects
        handleClose();
        getData();
    }

    return (
        <TableContainer component={Paper} sx={{ width: '90%', mx: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="right">Name</StyledTableCell>
                        <StyledTableCell align="right">Description</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">
                                <Button onClick={() => handleOpen(row.id)} sx={{ mx: '5px' }} variant="contained">Update</Button>
                                <Button onClick={() => deleteData(row.id)} sx={{ mx: '5px' }} variant="contained" color="error">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField value={editID} onChange={(e) => setEditName(e.target.value)} sx={{ my: '5px' }} id="outlined-basic" label="ID" variant="outlined" fullWidth disabled />
                    <TextField value={editName} onChange={(e) => setEditName(e.target.value)} sx={{ my: '5px' }} id="outlined-basic" label="Name" variant="outlined" fullWidth />
                    <TextField value={editDescription} onChange={(e) => setEditDescription(e.target.value)} sx={{ my: '5px' }} id="outlined-basic" label="Description" variant="outlined" fullWidth />
                    <TextField value={editPrice} onChange={(e) => setEditPrice(e.target.value)} sx={{ my: '5px' }} id="outlined-basic" label="Price" variant="outlined" fullWidth />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: '5px' }}>
                        <Button onClick={() => updateData()} sx={{ mx: '5px' }} variant="contained">Confirm</Button>
                        <Button onClick={() => handleClose()} sx={{ mx: '5px' }} variant="contained" color="error">Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </TableContainer>
    );
}