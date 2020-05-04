import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPost = ({ data }) => {
  const blogPosts = data.allContentfulArticle.edges
  const images = data.allContentfulAsset.edges

  function findImage(contentFulId) {
    return images.find(image => image.node.contentful_id === contentFulId)
  }

  return (
    <Layout>
      <SEO title="Blog posts" />

      <div className="blogposts">
        <div className="leftbox md:w-1/2 md:h-full md:fixed md:flex md:flex-col md:justify-between mt-16">
      
<div>
              <h1 className="md:text-left text-center text-2xl md:text-6xl md:pl-32 uppercase leading-relaxed tracking-wide md:pr-10">
                The Thirty-One Percent
              </h1>
              </div>
              <div>
              <p className="about text-lg  md:text-3xl pl-3 pr-3 md:pl-32 md:pr-24 text-gray-700 pb-5 md:pb-32">
                Traditional profiles tend to ask successful women about their
                “favorite places to shop” or their “guilty pleasures.” You won’t
                find those questions here. <span className="text-blue-700">31% of businesses in Boston are owned
                by women—we're telling their stories.</span>
              </p>
              </div>
            </div>

    
        <div className="md:w-1/2 md:h-auto md:float-right leftbox">
          <div className="md:flex md:flex-wrap ">
            {blogPosts.map(({ node: post }) => (
              <div className="w-screen md:w-1/2 md:h-auto pb-5 md:pb-0">
                <div key={post.id}>
                  <div className="imagebox">
                    <Link to={`/blogpost/${post.slug}`}>
                    {post.mainImage !== null && (
              <img
                className="w-auto h-full object-cover"
                src={post.mainImage.fluid.src}
                alt={post.mainImage.title}
              />
            )}
                      {/* {findImage(post.mainImage.contentful_id) !== null && (
                        <img
                          className="w-auto h-full object-cover "
                          src={
                            findImage(post.mainImage.contentful_id).node.fluid
                              .src
                          }
                          alt={
                            findImage(post.mainImage.contentful_id).node.fluid
                              .title
                          }
                        />
                      )} */}
                    </Link>
                    <div className="grid justify-center">
                      <div className="grid items-center w-64 h-24 bg-white nameblock  -mt-32 ">
                        <Link to={`/blogpost/${post.slug}`}>
                          <h3 className=" align-middle text-xl  tracking-widest uppercase text-center">
                            {" "}
                            {post.title} {post.lastName} <br />{" "}
                            <span className=" font-serif font-thin lowercase text-base">
                              {post.businessName}
                            </span>
                          </h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  )
}
export default BlogPost
export const query = graphql`
  query BlogPostPageQuery {
    allContentfulAsset(limit: 1000, filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          fluid(maxWidth: 1000) {
            src
          }
          contentful_id
        }
      }
    }
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
            contentful_id
            fluid(maxWidth: 1000)  {
              src
            }
          }
        }
      }
    }
  }
`
