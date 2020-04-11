import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
const BlogPosts = ({ data }) => {
  const blogPosts = data.allContentfulArticle.edges
  return (
    <Layout>
      <SEO title="Blog posts" />
      <div className="blogposts">
      <div className="grid grid-cols-2">
        {blogPosts.map(({ node: post }) => (
       
         <div key={post.id}>
            
              
                <div className="w-full p-5">
            <Link to={`/blogpost/${post.slug}`}>
            {post.mainImage !== null && (
              <img
                className=""
                src={post.mainImage.file.url}
              />
            )}
            </Link>
            <Link to={`/blogpost/${post.slug}`}>
             <h3 className="text-2xl font-bold tracking-widest uppercase leading-loose text-center text-white bg-blue-700"> {post.title} {post.lastName}</h3>
            </Link>
          
            </div>

          </div>
        ))}
        </div>
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
