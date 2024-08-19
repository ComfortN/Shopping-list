import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, MenuItem, Select, InputLabel, FormControl, Snackbar } from '@mui/material';
import axios from 'axios';
import './AddShoppingList.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateItem, fetchItems } from '../../Features/shoppingList/shoppingListActions';

export default function AddShoppingList({ itemToEdit, onClose }) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [notes, setNotes] = useState('');
    const [category, setCategory] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('success');
    const dispatch = useDispatch();
    // const { status } = useSelector((state) => state.shoppingList);
    const user = useSelector((state) => state.user.user);


    useEffect(() => {
        if (itemToEdit) {
            setName(itemToEdit.name);
            setQuantity(itemToEdit.quantity);
            setNotes(itemToEdit.notes);
            setCategory(itemToEdit.category);
        }
    }, [itemToEdit]);


    const handleAddItem = async (e) => {
        e.preventDefault();

        if (!name || !quantity || !category) {
            setSnackbarMessage('Please provide item name, quantity, and category.');
            setSnackbarType('error');
            setSnackbarOpen(true);
            return;
        }

        // const userId = JSON.parse(localStorage.getItem('token')).id;
        const newItem = { name, quantity, notes, category };
        const userId = user.id;
        try {
            if (itemToEdit) {
                await dispatch(updateItem({ userId,itemId: itemToEdit.id, updatedItem: newItem }));
                setSnackbarMessage('Item updated successfully!');
            } else {
                await dispatch(addItem({ userId, item: newItem }));
                setSnackbarMessage('Item added successfully!');
            }
            // setSnackbarMessage('Item added successfully!');
            setSnackbarType('success');
            setSnackbarOpen(true);
            setName('');
            setQuantity('');
            setNotes('');
            setCategory('');
            onClose();
            // if (onActionComplete) onActionComplete();
            dispatch(fetchItems());
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
                {itemToEdit ? 'Edit Shopping List Item' : 'Add Shopping List Item'}
            </Typography>
            <form onSubmit={handleAddItem}>
                <TextField
                    label="Item Name" fullWidth margin="normal" value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Quantity" fullWidth margin="normal" value={quantity}
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
                {itemToEdit ? 'Update Item' : 'Add Item'}
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
