import React from 'react'
import Link from 'gatsby-link'
import Container from "../components/container"
import Img from 'gatsby-image';

const IndexPage = ({data}) => {
  return <Container backdrop={data.backdrop.sizes}>
    <h1 style={{
          display: 'block',
          textTransform: 'uppercase',
          lineHeight: '1.8em',
          color: '#fff',
          letterSpacing: '0.0517241em',
          textAlign: 'center',
          fontWeight: '600',
          fontStyle: 'normal',
          fontSize: '58px'
    }}>
      Merging of the universal soul into a human body is Yoga
    </h1>
  </Container>
}

export default IndexPage

export const query = graphql`
  query indexQuery {
    backdrop: contentfulAsset(title: {eq: "rkmacharya"}) {
      sizes(quality: 100 maxWidth: 5000) {
       ...GatsbyContentfulSizes_withWebp
      }
    }
  }
`