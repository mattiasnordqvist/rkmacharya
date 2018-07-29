import React from "react";
import Img from 'gatsby-image';

export default ({ backdrop, children }) => (
    <div>
        <Img sizes={backdrop}   style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            // height: "100%",
            zIndex: -100
        }}/>
        
        <div style={{ margin: "3rem auto", maxWidth: 900 }}>
            {children}
        </div>
    </div>
);