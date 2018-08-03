import React, {Component} from "react"
import Img from 'gatsby-image'
import styles from './content.module.scss'

class Content extends React.Component
{
    render() {
        return (
        <div className={styles.content}>
            {this.props.children}
        </div>);
    }
} 


export default Content;