import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Img from "gatsby-image"

const BlogPost = ({ data }) => {
  const blogPosts = data.allContentfulArticle.edges
  return (
    <Layout>
      <SEO title="Blog posts" />
      <div className="blogposts">
      <div className="w-1/2 h-full fixed bg-white">
<div>
    <h1 className="bg-white text-6xl pl-8 pt-8 text-white leading-relaxed tracking-wide">The Thirty-One Percent</h1>
</div>
</div>
      <div className="w-1/2 h-auto float-right">
        <div className="flex flex-wrap ">

        {blogPosts.map(({ node: post }) => (
                <div className="w-1/2 h-auto">
         <div key={post.id}>
            
   
                <div className="imagebox pb-1 pr-5 -mr-4 ">
            <Link to={`/blogpost/${post.slug}`}>
            {post.mainImage !== null && (
              
              <img
                className="w-auto h-full object-cover "
                src={post.mainImage.file.url}
                alt={post.mainImage.title}
              />
            )}
            </Link>
            <div className="nameblock">
            <Link to={`/blogpost/${post.slug}`}>
             <h3 className=" bg-white   text-2xl -mt-20 font-bold tracking-widest uppercase leading-loose text-center"> {post.title} {post.lastName}</h3>
            </Link>
            </div>
          </div>
            </div>

          </div>
        ))}

        </div>
        </div>
        <span className="mgBtm__24" />
        <Link to="/">Go back to the homepage</Link>
      </div>
    </Layout>
  )
}
export default BlogPost
export const query = graphql`
  query BlogPostPageQuery {
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
            title
            file {
              url
            }
          }
        }
      }
    }
  }
`
