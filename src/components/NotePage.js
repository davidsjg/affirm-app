import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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
import queryString from 'query-string';
import { useLocation } from "react-router-dom";



function NotePage(){
    
    const [note, setNote] = useState();
    const [notes, setNotes] = useState();
    const [searchParams] = useSearchParams();
    const location = useLocation()

    useEffect(() => {
        const getNotes = fetchNotes();
        const curUrl = location.pathname;
        let result = curUrl.replace(/\/note\//i, "");

        getNotes.then((data) => {
            console.log(data);
            setNotes(data);
            const findNote = data.filter((note) => {
                console.log(note);
                //note.id == result;
                setNote(note);
            });
        })

        console.log(note);
    }, []);

    return (

        <> 
        {note && 
        <>
        <Heading level={2} textAlign={"center"}>Note</Heading>
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
        }   
    </>
        
    )
}

export default NotePage;