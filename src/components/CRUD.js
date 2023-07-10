import { API, Storage } from "aws-amplify";
import { listNotes } from "../graphql/queries";
import { createNote as createNoteMutation,
         deleteNote as deleteNoteMutation
} from "../graphql/mutations";


export async function fetchNotes() {
    //make a callout using API, wait for its response before continuing
    const apiData = await API.graphql({ query: listNotes });
    //once apiData is back, destructure 
    const notesFromAPI = apiData.data.listNotes.items;
    //make another callout
    await Promise.all(
      //another async function
      notesFromAPI.map(async (note) => {
        if (note.image) {
          //code will stop here until this returns
          const url = await Storage.get(note.name);
          //destructure returned async/await
          note.image = url;
        }
        return note;
      })
    );
    return notesFromAPI;
    //setNotes(notesFromAPI);
}

export async function createNote(event) {
    const form = new FormData(event.target);
    const image = form.get("image");

    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    };
    if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
    }).then((response) => {
        console.log(response.data.createNote);
        return response.data.createNote;
    })
    
  }
  
  export async function deleteNote({ id, name }, notes) {

    const newNotes = notes.filter((note) => note.id !== id);
    //setNotes(newNotes);
    await Storage.remove(name);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });

    return newNotes;
  }