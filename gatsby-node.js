const path = require('path')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators
    if (node.internal.type === `ContentfulTeacher`) {
      createNodeField({
        node,
        name: `slug`,
        value: 'teachers/'+node.name.replace(/ /g,"_").toLowerCase(),
      })
    }
  };

  exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators
    return new Promise((resolve, reject) => {
      graphql(`
        {
          allContentfulTeacher {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `).then(result => {
        result.data.allContentfulTeacher.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/teacher.js`),
            context: {
              slug: node.fields.slug,
            },
          })
        })
        resolve()
      })
    })
  };