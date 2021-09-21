import React from "react";
export const Message = (props)=>{
    return (
        <div className='black-text' style={{marginTop: '10px',fontWeight: '600', textTransform: "uppercase", fontSize: '100%'}}>
            {props.text}
        </div>
    )
}