import React,{useState,useEffect} from "react";
import NoteContext from "./NoteContext";

function CategoryState(props){
    const [EditingSubject,setEditingSubject]=useState([]);

    return(<NoteContext.Provider value={{EditingSubject,setEditingSubject}}>
        {props.children}
        </NoteContext.Provider>)
    }export default CategoryState;