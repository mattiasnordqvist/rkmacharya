import React from 'react'
import Link from 'gatsby-link'
import Container from "../components/container"
import Img from 'gatsby-image';

const IndexPage = ({data}) => {
  return <Container backdrop={data.backdrop.sizes}>
    {data.teachers.edges.map(({node}) => 
    <div>
      
      <p><Link to={"/teacher/"+node.name.replace(/ /g,"_").toLowerCase()}>{node.name}</Link></p>  
      <Img sizes={node.profilePicture.sizes} />
      </div>
    )}
  </Container>
}

export default IndexPage

export const query = graphql`
  query indexQuery {
    backdrop: contentfulAsset(title: {eq: "backdrop1"}) {
      sizes(quality: 100 maxWidth: 5000) {
       ...GatsbyContentfulSizes
      }
    }

    teachers: allContentfulTeacher {
      edges {
        node {
          id
          name
          profilePicture {
            sizes(quality: 100) {
              ...GatsbyContentfulSizes
             }
          }
        }
      }
    }
  }
`