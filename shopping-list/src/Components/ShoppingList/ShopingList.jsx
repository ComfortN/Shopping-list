import React, {useState} from 'react'
import AddShoppingList from '../AddList/AddShoppingList'
import GetItems from '../Items/GetItems'
import {Fab, Container } from '@mui/material';
import {Add as AddIcon } from '@mui/icons-material';

export default function ShopingList() {
  const [itemToEdit, setItemToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (item) => {
    setItemToEdit(item);
    setShowForm(true);
}


const handleAddClick = () => {
  setItemToEdit(null);
  setShowForm(!showForm);
}


const handleFormClose = () => {
  setShowForm(false);
}


  return (
    // <div>
    //     <AddShoppingList itemToEdit={itemToEdit}/>
    //     <GetItems onEdit={handleEdit}/>
    // </div>

    <Container>
      

      {showForm && (
        <AddShoppingList itemToEdit={itemToEdit} onClose={handleFormClose} />
      )}

      <GetItems onEdit={handleEdit} onClose={handleFormClose}/>

      <Fab
        color= "primary" aria-label='add' onClick={handleAddClick}
        style={{position: 'fixed', bottom: '20px', right: '20px'}}
        >
        <AddIcon />
        </Fab>
    </Container>
  )
}
