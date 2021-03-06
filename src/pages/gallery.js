import React from "react"
import { graphql } from "gatsby" // to query for image data
import Layout from "../components/layout"


const Gallery = ({ data }) => {
const Images = data.allContentfulAsset.edges
return (
    <Layout>
        <div className=""></div>
      
              <div className="md:flex md:flex-wrap">
             
                  {Images.map(({ node: post }) =>
                       <div className="w-screen md:w-1/2 md:h-auto px-5 py-5">
                   <div key={post.id}>
                   <div className="gallerybox">
                       {post.fluid !== null && (
                        <img
                          className="w-full h-full object-cover "
                          src={
                            post.fluid
                              .src
                          }
                          alt={
                            post.fluid
                              .title
                          }
                        />
                       
                        )}
                       </div>   
                  
                    </div>
         </div>
            )}
 
    </div>          
                
    </Layout>
 
  )
}
export default Gallery
export const query = graphql`
  query GalleryPageQuery {
    allContentfulAsset(limit: 1000, filter: {node_locale: {eq: "en-US"}, title: {regex: "/gal/"}}) {
      edges {
        node {
          fluid(maxWidth: 1000) {
            src
          }
          contentful_id
        }
      }
    }
}
`
