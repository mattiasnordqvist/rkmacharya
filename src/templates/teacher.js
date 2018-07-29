import React from "react";
import Container from "../components/container";
import Img from 'gatsby-image';

export default ({data}) => {
    const teacher = data.teacher;
  return <Container backdrop={teacher.backgroundImage.sizes}>
      <h1>{teacher.name}</h1>
      <Img sizes={teacher.profilePicture.sizes} />
    </Container>;
};

export const query = graphql`
query TeacherQuery($slug: String!) {
    teacher: contentfulTeacher(fields: { slug: { eq: $slug } }) {
        name
        profilePicture {
            sizes(quality: 100) {
                ...GatsbyContentfulSizes_withWebp
               }
        }
        backgroundImage {
            sizes(quality: 100 maxWidth: 2500) {
                ...GatsbyContentfulSizes_withWebp
               }
        }
    }
}
`;