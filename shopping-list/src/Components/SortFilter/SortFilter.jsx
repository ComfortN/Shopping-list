import React from 'react'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function SortFilter({ sortCriteria, filterCriteria, onSortChange, onFilterChange }) {
    return (
        <Box display="flex" justifyContent="space-between" mb={2}>
        {/* Sort Dropdown */}
        <FormControl variant="outlined">
            <InputLabel>Sort By</InputLabel>
            <Select
            value={sortCriteria} onChange={(e) => onSortChange(e.target.value)}
            label="Sort By"
            >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="category">Category</MenuItem>
            
            </Select>
        </FormControl>

        {/* Filter Dropdown */}
        <FormControl variant="outlined">
            <InputLabel>Filter By</InputLabel>
            <Select
            value={filterCriteria} onChange={(e) => onFilterChange(e.target.value)}
            label="Filter By"
            >
                <MenuItem value="Groceries">Groceries</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Clothing">Clothing</MenuItem>
                <MenuItem value="Household">Household</MenuItem>
            </Select>
        </FormControl>
        </Box>
    )
}
