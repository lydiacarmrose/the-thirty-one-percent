import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
const BlogPosts = ({ data }) => {
  const blogPosts = data.allContentfulArticle.edges
  return (
    <Layout>
      <SEO title="Blog posts" />
      <h1>{"Here's a list of all blogposts!"}</h1>
      <div className="blogposts">
        {blogPosts.map(({ node: post }) => (
          <div key={post.id}>
            <Link to={`/blogpost/${post.slug}`}>
              {post.title} {post.lastName}
            </Link>

            {post.mainImage !== null && (
              <img
                className="lg:pr-20 lg:h-full w-full object-cover object-center "
                src={post.mainImage.file.url}
              />
            )}
          </div>
        ))}
        <span className="mgBtm__24" />
        <Link to="/">Go back to the homepage</Link>
      </div>
    </Layout>
  )
}
export default BlogPosts
export const query = graphql`
  query BlogPostsPageQuery {
    allContentfulArticle(
      limit: 1000
      filter: { node_locale: { eq: "en-US" } }
    ) {
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
`
