import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, ListItemIcon, IconButton, Snackbar } from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../Features/shoppingList/shoppingListActions';


export default function GetItems({ onEdit }) {
    const [items, setItems] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8888/shoppingLists');
            setItems(response.data);
        } catch (error) {
            setSnackbarMessage('Error fetching items.');
            setSnackbarOpen(true);
            console.error('Error fetching items:', error);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            await dispatch(deleteItem(itemId));
            setItems(items.filter(item => item.id !== itemId));
            setSnackbarMessage('Item deleted successfully.');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Error deleting item.');
            setSnackbarOpen(true);
            console.error('Error deleting item:', error);
        }
    };


    const handleEdit = (item) => {
        if (onEdit) onEdit(item);
    };
    

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


  return (
    <Container className="container">
            <Typography variant="h3" gutterBottom>
                Shopping List
            </Typography>
            <List>
                {items.map((item) => (
                    <ListItem key={item.id} divider>
                        <ListItemText
                            primary={item.name}
                            secondary={`Quantity: ${item.quantity} | Category: ${item.category} | Notes: ${item.notes}`}
                        />
                        <ListItemIcon>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}>
                                <Edit />
                            </IconButton>

                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Container>
  )
}
