import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  {addContact}  from '../redux/operations';

import styles from '../styles/ContactForm.module.css';
import { selectContacts } from '../redux/selectors';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectContacts);
  
  const dispatch = useDispatch();

  const addNewContact = e => {
    e.preventDefault();

    const formData = { name, number };

    const isInContacts = Array.isArray(contacts) && contacts.some(
  ({ name, number }) =>
    name.toLowerCase() === formData.name.toLowerCase() ||
    number === formData.number
);


    if (isInContacts) {
      alert(`${formData.name} is already in contacts`);
      return;
    }

    const newContact = {
      ...formData,
    };
    dispatch(addContact(newContact));
    setName('');
    setNumber('');
  };

  const handleChangeName = e => {
    setName(e.target.value);
  };
  const handleChangeNum = e => {
    setNumber(e.target.value);
  };

  return (
    <form className={styles.contactForm} onSubmit={addNewContact}>
      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChangeName}
          required
        />
      </label>
      <label className={styles.label}>
        Number
        <input
          className={styles.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChangeNum}
          required
        /> 
      </label>

      <button className={styles.addButton} type="submit">
        add contact
      </button>
    </form>
  );
};

export default ContactForm;