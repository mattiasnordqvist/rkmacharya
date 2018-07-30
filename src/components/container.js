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
            if(this.refs.nv.scrollTop > 500 &&  this.refs.nv.scrollTop < 1500)
            {
                this.setState({scrollTop: this.refs.nv.scrollTop-500});
            }
        });
        var parent = document.getElementById('main');
        var child = document.getElementById('scrollcontainer');
        child.style.paddingRight = child.offsetWidth - child.clientWidth + "px";
    }

    render(){
        const backdrop = this.props.backdrop;

        return (<div id="scrollcontainer" ref="nv">
            <Img className="test" sizes={backdrop}   
            style={{
                position: "fixed",
                left: 0,
                top: 0- this.state.scrollTop,
                width: "100%",
                zIndex: -100
            }}/>
            
            <div style={{ margin: "3rem auto", maxWidth: '70%' }}>
                {this.props.children}
            </div>
        </div>);
    }
}

export default Container;