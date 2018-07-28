import React from 'react'
import Link from 'gatsby-link'
import Container from "../components/container"

const IndexPage = ({data}) => {
  return <Container backdrop={data.backdrop.sizes}>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
    {data.teachers.edges.map(({node}) => 
    <div>
      
      <p><Link to={"/teacher/"+node.name.replace(/ /g,"_").toLowerCase()}>{node.name}</Link></p>  
      <img src={node.profilePicture.file.url} height="100" width="100"/>
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
            id
            file {
              url
              fileName
              contentType
            }
          }
        }
      }
    }
  }
`