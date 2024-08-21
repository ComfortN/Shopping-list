import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, ListItemIcon, IconButton, Snackbar, TextField } from '@mui/material';
import {Delete, Edit, Share} from '@mui/icons-material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem , fetchItems } from '../../Features/shoppingList/shoppingListActions';


export default function GetItems({ onEdit }) {
    // const [items, setItems] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    // const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const { items, loading, error, searchQuery, sortCriteria, filterCategory } = useSelector((state) => state.shoppingList);
    const user = useSelector((state) => state.user.user);


    // const fetchItems = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8888/shoppingLists');
    //         setItems(response.data);
    //     } catch (error) {
    //         setSnackbarMessage('Error fetching items.');
    //         setSnackbarOpen(true);
    //         console.error('Error fetching items:', error);
    //     }
    // };

    useEffect(() => {
        if (user) {
            dispatch(fetchItems()); // Fetch specific user shopping lists
            console.log('User:', user);
            console.log('Items:', items);
        }
    }, [user, dispatch, user, items]);

    const userItems = items.filter(item => item.userId === user.id);


    // Filter items based on the search query, sorting and filtering
    const filteredItems = userItems
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (filterCategory && item.category.toLowerCase() === filterCategory.toLowerCase() ))
        .filter(item => (filterCategory ? item.category === filterCategory : true))
        .sort((a, b) => {
            if (sortCriteria === 'nameAsc') return a.name.localeCompare(b.name);
            if (sortCriteria === 'nameDesc') return b.name.localeCompare(a.name);
            if (sortCriteria === 'categoryAsc') return a.category.localeCompare(b.category);
            if (sortCriteria === 'categoryDesc') return b.category.localeCompare(a.category);
            return 0;
        });


    const handleDelete = async (itemId) => {
        try {
            await dispatch(deleteItem(itemId));
            // setItems(items.filter(item => item.id !== itemId));
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


    const handleNativeShare = (item) => {
        if (navigator.share) {
            navigator.share({
                title: item.name,
                text: `Check out this item: ${item.name}. Quantity: ${item.quantity}. Notes: ${item.notes}.`,
                url: window.location.href,
            })
            .then(() => console.log('Share was successful.'))
            .catch((error) => console.log('Sharing failed:', error));
        } else {
            console.log('Web Share API is not supported in this browser.');
            
        }
    };


    // const handleSearchChange = (event) => {
    //     setSearchQuery(event.target.value); // Update search query
    // };


    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


  return (
    <Container className="container">
            <Typography variant="h3" gutterBottom>
                Shopping List
            </Typography>

            {/* <TextField
                label="Search items"
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={handleSearchChange}
            /> */}
            

            <List>
                {filteredItems.map((item) => (
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

                            <IconButton edge="end" aria-label="share" onClick={() => handleNativeShare(item)}>
                                <Share />
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
