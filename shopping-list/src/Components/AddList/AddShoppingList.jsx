import React, { useState } from 'react';
import { TextField, Button, Typography, Container, MenuItem, Select, InputLabel, FormControl, Snackbar } from '@mui/material';
import axios from 'axios';
import './AddShoppingList.css';

export default function AddShoppingList({ onAdd }) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [notes, setNotes] = useState('');
    const [category, setCategory] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('success');


    const handleAddItem = async (e) => {
        e.preventDefault();

        if (!name || !quantity || !category) {
            setSnackbarMessage('Please provide item name, quantity, and category.');
            setSnackbarType('error');
            setSnackbarOpen(true);
            return;
        }

        const userId = JSON.parse(localStorage.getItem('token')).id;

        try {
            await axios.post('http://localhost:8888/shoppingLists', {
                name,
                quantity,
                notes,
                category,
                userId,
            });
            setSnackbarMessage('Item added successfully!');
            setSnackbarType('success');
            setSnackbarOpen(true);
            setName('');
            setQuantity('');
            setNotes('');
            setCategory('');
        } catch (error) {
            setSnackbarMessage('Error adding item. Please try again.');
            setSnackbarType('error');
            setSnackbarOpen(true);
            console.error('Error adding item:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };



  return (
    <Container className="container">
            <Typography variant="h4" gutterBottom>
                Add Shopping List Item
            </Typography>
            <form onSubmit={handleAddItem}>
                <TextField
                    label="Item Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Quantity"
                    fullWidth
                    margin="normal"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                    >
                        <MenuItem value="Groceries">Groceries</MenuItem>
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Clothing">Clothing</MenuItem>
                        <MenuItem value="Household">Household</MenuItem>
                        
                    </Select>
                </FormControl>
                <TextField
                    label="Notes (optional)"
                    fullWidth
                    margin="normal"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Item
                </Button>
            </form>
            
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarType}
            />
        </Container>
)
}
