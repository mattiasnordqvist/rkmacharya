import React from "react";
import Container from "../components/container"

export default ({data}) => {
    const teacher = data.teacher;
  return <Container backdrop={data.backdrop.childImageSharp.sizes}>
      <h1>{teacher.name}</h1>
      <img src={teacher.profilePicture.file.url} height="100" width="100"/>
      <p>Hejhej</p>
    </Container>;
};

export const query = graphql`
query TeacherQuery($slug: String!) {
    backdrop: file(relativePath: {eq: "backdrop1.jpg"}) {
      childImageSharp {
        sizes(quality: 100 maxWidth: 5000) {
         ...GatsbyImageSharpSizes
        }
      }
    }

    teacher: contentfulTeacher(fields: { slug: { eq: $slug } }) {
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
`;