import React from "react";


export default function Presets(props){

const preset = (props.preset)

    function handleDelete(){
        const {deleteRecord} = useIndexedDB('presets');

    }


    return(
        <div>
            <div>
            <ul>
               {preset} 
            </ul>
            </div>
            <span onClick={handleDelete}>x</span>
        </div>

    )

}