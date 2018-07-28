import React from "react";
import Container from "../components/container"

export default ({data}) => {
    const teacher = data.teacher;
  return <Container backdrop={data.backdrop.sizes}>
      <h1>{teacher.name}</h1>
      <img src={teacher.profilePicture.file.url} height="100" width="100"/>
    </Container>;
};

export const query = graphql`
query TeacherQuery($slug: String!) {
    backdrop: contentfulAsset(title: {eq: "backdrop1"}) {
            sizes(quality: 100 maxWidth: 5000) {
             ...GatsbyContentfulSizes
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