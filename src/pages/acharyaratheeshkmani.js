import React from 'react'
import Link from 'gatsby-link'
import Container from "../components/container"
import Img from 'gatsby-image';

const AcharyaRatheeshKManiPage = ({ data }) => {
    return <Container backdrop={data.backdrop.sizes}>
    AcharyaRatheeshKManiPage
    </Container>
}

export default AcharyaRatheeshKManiPage

export const query = graphql`
  query acharyaratheeshkmaniQuery {
    backdrop: contentfulAsset(title: {eq: "backdrop1"}) {
      sizes(quality: 100 maxWidth: 2500) {
       ...GatsbyContentfulSizes_withWebp
      }
    }
  }
`