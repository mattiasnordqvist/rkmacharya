import React from 'react'
import Link from 'gatsby-link'
import Container from "../components/container"
import Img from 'gatsby-image';

const ClassCardPage = ({ data }) => {
    return <Container backdrop={data.backdrop.sizes}>
    Origin
    </Container>
}

export default ClassCardPage

export const query = graphql`
  query originQuery {
    backdrop: contentfulAsset(title: {eq: "backdrop1"}) {
      sizes(quality: 100 maxWidth: 2500) {
       ...GatsbyContentfulSizes_withWebp
      }
    }
  }
`