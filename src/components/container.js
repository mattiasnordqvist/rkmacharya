import React from "react";
import Img from 'gatsby-image';

class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {scrollTop: 0};
    }

    componentDidMount(){
        this.refs.nv.addEventListener('scroll', (event) => {
            console.log(this.refs.nv.scrollTop);
            if(this.refs.nv.scrollTop > 100)
            {
                this.setState({scrollTop: ((this.refs.nv.scrollTop-100)/2)});
            }
        });
        
        /* hides scrollbar */
        var parent = document.getElementById('main');
        var child = document.getElementById('scrollcontainer');
        child.style.paddingRight = child.offsetWidth - child.clientWidth + "px";
    }

    render(){
        const backdrop = this.props.backdrop;

        return (<div id="scrollcontainer" ref="nv">
        <div className="image-height-allower"  style={{
                position: "fixed",
                left: 0,
                top: 0- this.state.scrollTop,
                width: "100%",
                height: "100%",
                zIndex: -100,
            }}>
            <Img sizes={backdrop} 
             style={{
                width: "100%",
                
            }}/>
            </div>
            <div className="centerizer">
                {this.props.children}
            </div>
        </div>);
    }
}

export default Container;