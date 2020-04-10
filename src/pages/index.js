import React from "react";
import { Link, graphql } from "gatsby";


import "../components/tailwind.css";

export default ({ data }) => {
  const home = data.allContentfulArticle.edges.node
  console.log (home)

  return (
    <div>
      <h1>{home.id}</h1>
      <img src={home.node.mainImage.file.url} />

    </div>
  )
}
export const query = graphql`
  query CommandsQuery {
    allContentfulArticle {
      edges {
        node {
          id
          title
          lastName
          slug
          bodyText {
            bodyText
          }
          mainImage {
            file {
              url
            }
          }
        }
      }
    }
  }
`;