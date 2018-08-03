// import React from 'react'
// import Link from 'gatsby-link'
// import Container from "../components/container"
// import Img from 'gatsby-image';

// const TeachersPage = ({data}) => {
//   return <Container backdrop={data.backdrop.sizes}>
//     {data.teachers.edges.map(({node}) => 
//     <div>
      
//       <p><Link to={"/teachers/"+node.name.replace(/ /g,"_").toLowerCase()}>{node.name}</Link></p>  
//       <Img sizes={node.profilePicture.sizes} />
//       </div>
//     )}
//   </Container>
// }

// export default TeachersPage

// export const query = graphql`
//   query TeachersPageQuery {
//     backdrop: contentfulAsset(title: {eq: "rkmacharya_1"}) {
//       sizes(quality: 100 maxWidth: 5000) {
//        ...GatsbyContentfulSizes_withWebp
//       }
//     }

//     teachers: allContentfulTeacher {
//       edges {
//         node {
//           id
//           name
//           profilePicture {
//             sizes(quality: 100) {
//               ...GatsbyContentfulSizes_withWebp
//              }
//           }
//         }
//       }
//     }
//   }
// `