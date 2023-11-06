import { useState, useEffect } from "react";

const Error = (props) => {
    return (
        <div>
            <h1>An Error Occurred</h1>
            <hr/>
            <p>{props.errMsg}</p>
            <div style={{textAlign: 'center'}}>
                <button onClick={() => {props.errShow = false}}>Close</button>
            </div>
        </div>
    )
}

export default Error;