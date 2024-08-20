import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { setSearchQuery, setSortCriteria, setFilterCategory } from '../../Features/shoppingList/shoppingListSlice';


export default function SortFilter() {
    const dispatch = useDispatch();
    const { searchQuery, sortCriteria, filterCategory } = useSelector((state) => state.shoppingList);

    const handleSearchChange = (event) => {
        dispatch(setSearchQuery(event.target.value));
    };

    const handleSortChange = (event) => {
        dispatch(setSortCriteria(event.target.value));
    };

    const handleFilterChange = (event) => {
        dispatch(setFilterCategory(event.target.value));
    };


    return (
        // <Box display="flex" justifyContent="space-between" mb={2}>
        // {/* Sort Dropdown */}
        // <FormControl variant="outlined">
        //     <InputLabel>Sort By</InputLabel>
        //     <Select
        //     value={sortCriteria} onChange={(e) => onSortChange(e.target.value)}
        //     label="Sort By"
        //     >
        //     <MenuItem value="name">Name</MenuItem>
        //     <MenuItem value="category">Category</MenuItem>
            
        //     </Select>
        // </FormControl>

        // {/* Filter Dropdown */}
        // <FormControl variant="outlined">
        //     <InputLabel>Filter By</InputLabel>
        //     <Select
        //     value={filterCriteria} onChange={(e) => onFilterChange(e.target.value)}
        //     label="Filter By"
        //     >
        //         <MenuItem value="Groceries">Groceries</MenuItem>
        //         <MenuItem value="Electronics">Electronics</MenuItem>
        //         <MenuItem value="Clothing">Clothing</MenuItem>
        //         <MenuItem value="Household">Household</MenuItem>
        //     </Select>
        // </FormControl>
        // </Box>

        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Search items"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                    <InputLabel>Sort by</InputLabel>
                    <Select value={sortCriteria} onChange={handleSortChange}>
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
                        <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
                        <MenuItem value="categoryAsc">Category (A-Z)</MenuItem>
                        <MenuItem value="categoryDesc">Category (Z-A)</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                    <InputLabel>Filter by Category</InputLabel>
                    <Select value={filterCategory} onChange={handleFilterChange}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Groceries">Groceries</MenuItem>
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Clothing">Clothing</MenuItem>
                        <MenuItem value="Household">Household</MenuItem>
                        
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}
