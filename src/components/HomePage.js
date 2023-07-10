import React, { useState, useEffect } from "react";
import "./HomePage.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from "aws-amplify";
import {
Button,
Flex,
Heading,
Image,
Text,
TextField,
View,
withAuthenticator,
} from '@aws-amplify/ui-react';
import { listNotes } from "../graphql/queries";
// import {
// createNote as createNoteMutation,
// deleteNote as deleteNoteMutation,
// } from "../graphql/mutations";
import { createNote as createNoteMutation,
         deleteNote as deleteNoteMutation
     } from "./CRUD";
import { Link } from "react-router-dom";
import { fetchNotes } from "./CRUD";

const App = ({ signOut }) => {
const [notes, setNotes] = useState();

const myTextFields = [
  { name: 'name', 
    placeholder: "Note Name",
    label: "Note Name",   
    variation:"quiet"
  },
  { name: 'description', 
    placeholder: "Note Description",
    label: "Note Description",  
    variation:"quiet"
  }
];

useEffect(() => {
  const getNotes = fetchNotes();
  console.log(getNotes);

  getNotes.then((data) => {
    console.log(data);
    setNotes(data);
  })
  
}, []);

async function createNote(event) {
  event.preventDefault();
  createNoteMutation(event);

  fetchNotes().then((data) => {
    setNotes(data);
  });
  //event.target.reset();
}

async function deleteNote(note) {
  const newNotes = deleteNoteMutation(note, notes);
  console.log(newNotes);
  newNotes.then((data) => {
    if(newNotes.length > 0){
        setNotes(newNotes);
    }
    else{
        setNotes([]);
    }
  })
}

return (
  <View className="App">
    <Heading level={1}>Dank Cheeserball</Heading>
    <View as="form" margin="3rem 0" onSubmit={createNote}>
      <Flex direction="row" justifyContent="center" backgroundColor="darkorange">
      {
        myTextFields.map((data, i) => {
          return (
            <TextField
              key={i}
              name={data.name}
              placeholder={data.placeholder}
              label={data.placeholder}
              labelHidden
              variation={data.variation}
              required
            />
          )
        })
      }
        <View
          name="image"
          as="input"
          type="file"
          style={{ alignSelf: "end" }}
        />
        <Button type="submit" variation="primary">
          Create Note
        </Button>
      </Flex>
    </View>
    <Heading level={2}>Current Notes</Heading>
    <View margin="3rem 0">
      {notes &&
      notes.map((note) => (
        <Flex
          key={note.id || note.name}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Text as="strong" fontWeight={700}>
            {note.name}
          </Text>
          <Text as="span">{note.description}</Text>
          {note.image && (
            <Image
              src={note.image}
              alt={`visual aid for ${notes.name}`}
              style={{ width: 400 }}
            />
          )}
          <Button variation="link" onClick={() => deleteNote(note)}>
            Delete note
          </Button>
          <Link to="/note/{note.id}" >View Note</Link>
        </Flex>
      ))}
    </View>
    <Button onClick={signOut}>Sign Out</Button>
  </View>
);
};

export default withAuthenticator(App);