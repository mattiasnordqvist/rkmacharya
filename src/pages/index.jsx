import React, { Component } from 'react'
import Link from 'gatsby-link'
import Container from "../components/container"
import Img from 'gatsby-image';
import Content from "../components/content/content"
import styles from './index.module.scss'


class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scrollTop: 0 };
  }

  componentDidMount() {
  }

  render() {
    let data = this.props.data;
    return (
      <div className='page-root'>
        <div className='cover-image' style={{
          backgroundImage: 'url("' + data.rkmacharya_1.file.url + '")'
        }}>
        </div>

        <Content>
          <h1>Klicka. Boka. Avboka.</h1>
        </Content>
        <Content>
          <div className={styles.ec}>
            <div className={styles.e}><Img sizes={data.rkmay_class_erika_erlando.sizes} /></div>
            <div className={styles.e}><Img sizes={data.rkmay_class_erika_erlando.sizes} /></div>
            <div className={styles.e}><Img sizes={data.rkmay_class_erika_erlando.sizes} /></div>
            <div className={styles.e}><Img sizes={data.rkmay_class_erika_erlando.sizes} /></div>
            <div className={styles.e}><Img sizes={data.rkmay_class_erika_erlando.sizes} /></div>
            <div className={styles.e}><Img sizes={data.rkmay_class_erika_erlando.sizes} /></div>
            <div className={styles.e}><Img sizes={data.rkmay_class_erika_erlando.sizes} /></div>
            <div className={styles.e}><Img sizes={data.rkmay_class_erika_erlando.sizes} /></div>
            <div className={styles.e}><Img sizes={data.rkmay_class_erika_erlando.sizes} /></div>
            <div className={styles.e}><Img sizes={data.rkmay_class_erika_erlando.sizes} /></div>
            <div className={styles.e}><Img sizes={data.rkmay_class_erika_erlando.sizes} /></div>
            <div className={styles.e}><Img sizes={data.rkmay_class_erika_erlando.sizes} /></div>
          </div>
        </Content>
        <div className='cover-image' style={{ backgroundImage: 'url("' + data.rkmacharya_2.file.url + '")' }}>
        </div>
        <div className='cover-image' style={{ backgroundImage: 'url("' + data.rkmacharya_3.file.url + '")' }}>
        </div>
        <div>
          <Content>
            Instagram, Facebook, Email
          </Content>
        </div>
      </div>
    )
  }
}

export default IndexPage

export const query = graphql`
  query indexQuery {
    rkmacharya_1: contentfulAsset(title: {eq: "rkmacharya_1"}) {
      id
      file {
        url
      } 
    }

    rkmacharya_2: contentfulAsset(title: {eq: "rkmacharya_2"}) {
      id
      file {
        url
      } 
    }

    rkmacharya_3: contentfulAsset(title: {eq: "rkmacharya_3"}) {
      id
      file {
        url
      } 
    }

    rkmay_class_erika_erlando: contentfulAsset(title: {eq: "rkmay_class_erika_erlando"}) {
      sizes(quality: 100 maxWidth: 200) {
        ...GatsbyContentfulSizes_withWebp
       }
    }
  }
`