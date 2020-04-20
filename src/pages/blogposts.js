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
<div className="grid grid-rows-3">
    <div className="row-start-1"><h1 className="bg-white text-6xl pl-10 uppercase pt-16 text-white leading-relaxed tracking-wide pr-10">The Thirty-One Percent</h1></div>
    <div className="row-start-3"><p className="text-4xl pl-10 pr-24 text-gray-700">Traditional profiles tend to ask successful women about their “favorite places to shop” or their “guilty pleasures.” You won’t find those questions here.</p></div>
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
            <div className="grid justify-center">
              <div className="grid items-center w-64 h-24 bg-white nameblock  -mt-32 ">
            <Link to={`/blogpost/${post.slug}`}>
   
             <h3 className=" align-middle text-xl  tracking-widest uppercase text-center"> {post.title} {post.lastName} <br /> <span className=" font-serif font-thin lowercase text-base">{post.businessName}</span></h3>
           
            </Link>
              </div>
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
          businessName
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
