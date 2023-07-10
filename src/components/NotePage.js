import React, { useState, useEffect, useSearchParams } from "react";
import "./NotePage.css";
import "@aws-amplify/ui-react/styles.css";
import {
Button,
Flex,
Heading,
Image,
Text,
TextField,
View,
} from '@aws-amplify/ui-react';
import { deleteNote, fetchNotes, set } from "./CRUD";



function NotePage(){
    const [note, setNote] = useState();

    const [searchParams, setSearchParams] = useSearchParams();
    searchParams.get("noteId");

    console.log(searchParams);


    useEffect(() => {
        const getNotes = fetchNotes();
      
        // getNotes.then((data) => {
        //     data.map((i) => {
        //         if(JSON.stringify(this.props.navigation.getParam('noteId', 'NO-ID'))){
                    
        //         }
        //     })
        //   setNote(data[0]);
        // })
        
    }, []);

    return (
        <>
        <Heading level={2}>Note</Heading>
            <View margin="3rem 0">
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
                    alt={`visual aid for ${note.name}`}
                    style={{ width: 400 }}
                    />
                )}
                <Button variation="link" onClick={() => deleteNote(note)}>
                    Delete note
                </Button>
                </Flex>
            </View>
        </>
    )
}

export default NotePage;