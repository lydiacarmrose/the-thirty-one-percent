import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import ReactHtmlParser from "react-html-parser"
// import Img from "gatsby-image"

const KEY_CONTENT = "content"
const KEY_NODE_TYPE = "nodeType"
const KEY_FIRST_H2 = "firsth2"
const KEY_LAST_PARA = "lastPara"
const KEY_LEFT_WINDER = "leftWinder"
const KEY_PARAS_IN_SECTION = "parasInSection"

function wrapParas(parasInSection, left, nodes) {
  if (parasInSection.length > 0) {
    const pWrap = `<div class="w-full mt-5">${parasInSection.join("")}</div>`
    nodes.push(pWrap)

    if (left !== null) {
      const h2laterExtraLeft = `
      <div class="hidden lg:visible lg:grid lg:grid-cols-6">
        <div class="lg:col-start-2 lg:col-span-2 lg:border-t-4 lg:border-blue-700"></div>
      </div>
      <div class="grid grid-col-2">
        <div class="h-0 lg:col-start-2 lg:border-l-4 lg:border-blue-700 lg:h-20 lg:-mt-1"></div>
      </div>
      `
      const h2laterExtraRite = `
      <div class="hidden lg:visible lg:grid lg:grid-cols-6">
        <div class="lg:col-start-4 lg:col-span-2 lg:border-t-4 lg:border-blue-700"></div>
      </div>
      <div class="grid grid-col-2">
        <div class="h-0 col-start-2 border-l-4 border-blue-700 lg:h-20 -mt-1"></div>
      </div>
      `
      nodes.push(left ? h2laterExtraLeft : h2laterExtraRite)
    }
  }
}

const markupCssTable = {
  italic: 'font-style:italic;',
  bold: 'font-weight:bold;',
  underline: 'text-decoration:underline;'
};


function addTextNode( c, markup ) {
  const marksNum = c.marks.length;
  const gotMarks = marksNum > 0;

  if (gotMarks) {
    markup.push( `<span style="`);
    const markIns = c.marks.map( m => {
      return markupCssTable[m.type];
    });
    markup.push( markIns.join('') );
    markup.push( `">` );
  }

  markup.push( c.value );

  if (gotMarks) {
    markup.push( `</span>` );
  }
}


function prepContent(dataContent) {
  const nodes = []
  const useContent = []

  var firsth2 = true
  for (const [index, value] of dataContent.entries()) {
    if (value.content.length > 0) {
      const nodeType = value.nodeType
      const content = value.content.map( c => {
        const markup = [];

        if (c.nodeType == 'text') {
          addTextNode( c, markup );
        }
        else if (c.nodeType == 'hyperlink') {
          markup.push( `<a style="color: #2b6cb0;" href="${c.data.uri}">`);

          const hlinkmarkup = [];
          c.content.map( h => {
            addTextNode( h, hlinkmarkup );
          })
          markup.push( hlinkmarkup.join('') );

          markup.push( `</a>` );
        }

        return markup.join('');
      } ).join('');


      const obj = {
        [KEY_CONTENT]: content,
        [KEY_NODE_TYPE]: nodeType,
      }

      if (nodeType == "heading-2" && firsth2) {
        obj[KEY_FIRST_H2] = true
        firsth2 = false
      }

      useContent.push(obj)
    }
  }

  var nextParaIsLastPara = false
  for (var i = useContent.length - 1; i >= 0; i--) {
    const content = useContent[i]
    const nodeType = content[KEY_NODE_TYPE]
    if (nodeType == "heading-2") {
      nextParaIsLastPara = true
    } else if (nodeType == "paragraph") {
      content[KEY_LAST_PARA] = nextParaIsLastPara
      nextParaIsLastPara = false
    }
  }

  var leftWinder = true
  for (const content of useContent) {
    if (content[KEY_NODE_TYPE] == "paragraph" && content[KEY_LAST_PARA]) {
      content[KEY_LEFT_WINDER] = leftWinder
      leftWinder = !leftWinder
    }
  }

  const lastParaData = {
    [KEY_PARAS_IN_SECTION]: [],
    [KEY_LEFT_WINDER]: false,
  }

  for (const d of useContent) {
    const content = d[KEY_CONTENT]
    const nodeType = d[KEY_NODE_TYPE]
    if (nodeType == "heading-2") {
      wrapParas(
        lastParaData[KEY_PARAS_IN_SECTION],
        lastParaData[KEY_LEFT_WINDER],
        nodes
      )
      lastParaData[KEY_PARAS_IN_SECTION].length = 0

      let h2
      if (d[KEY_FIRST_H2]) {
        h2 = `
        <div class="lg:grid lg:grid-cols-2">
        <div class="lg:col-span-1 ">
          <h2 style="font-family: 'Oswald'" class="uppercase lg:float-right lg:border-b-4 lg:border-blue-700 lg:-mr-16 lg:pr-5 lg:pb-2 lg:pl-5 text-3xl text-blue-700">
            ${content}
          </h2>
        </div>
 
    <div class="lg:border-l-4 lg:border-blue-700 lg:col-start-2 lg:col-span-1 lg:pt-4 lg:pl-4 lg:pr-32 lg:ml-16">
    </div>
    </div>
   `
      } else {
        h2 = `
      <div class="w-full m-auto">
        <h2
          style="font-family: 'Oswald';"
          class="uppercase m-auto text-3xl text-blue-700 text-center"
        >
          ${content}
        </h2>
      </div>`
      }

      nodes.push(h2)
    } else if (nodeType == "paragraph") {
      const pClass = "w-8/12 m-auto leading-relaxed pl-5 pr-5 mb-5 text-xl"
      const pClassLastLeft =
        "w-8/12 m-auto leading-relaxed pl-5 pr-5 lg:border-l-4 lg:border-blue-700 lg:pb-5 text-xl"
      const pClassLastRite =
        "w-8/12 m-auto leading-relaxed pl-5 pr-5 lg:border-r-4 lg:border-blue-700 pb-5 text-xl"
      const pClassOption = d[KEY_LAST_PARA]
        ? d[KEY_LEFT_WINDER]
          ? pClassLastLeft
          : pClassLastRite
        : pClass

      const p = `
          <p
            class="${pClassOption}"
          >
            ${content}
          </p>
      `

      lastParaData[KEY_PARAS_IN_SECTION].push(p)
      lastParaData[KEY_LEFT_WINDER] = d[KEY_LEFT_WINDER]
    }
  }

  wrapParas(lastParaData[KEY_PARAS_IN_SECTION], null, nodes)
  lastParaData[KEY_PARAS_IN_SECTION].length = 0

  return nodes.join("")
  
}

function prepContentintro(dataContent) {
  const nodes = []
  const useContent = []

  var firsth2 = true
  for (const [index, value] of dataContent.entries()) {
    if (value.content.length > 0) {
      const nodeType = value.nodeType
      const content = value.content[0].value

      const obj = {
        [KEY_CONTENT]: content,
        [KEY_NODE_TYPE]: nodeType,
      }

      if (nodeType == "heading-2" && firsth2) {
        obj[KEY_FIRST_H2] = true
        firsth2 = false
      }

      useContent.push(obj)
    }
  }

  var nextParaIsLastPara = false
  for (var i = useContent.length - 1; i >= 0; i--) {
    const content = useContent[i]
    const nodeType = content[KEY_NODE_TYPE]
    if (nodeType == "heading-2") {
      nextParaIsLastPara = true
    } else if (nodeType == "paragraph") {
      content[KEY_LAST_PARA] = nextParaIsLastPara
      nextParaIsLastPara = false
    }
  }

  var leftWinder = true
  for (const content of useContent) {
    if (content[KEY_NODE_TYPE] == "paragraph" && content[KEY_LAST_PARA]) {
      content[KEY_LEFT_WINDER] = leftWinder
      leftWinder = !leftWinder
    }
  }

  const lastParaData = {
    [KEY_PARAS_IN_SECTION]: [],
    [KEY_LEFT_WINDER]: false,
  }

  for (const d of useContent) {
    const content = d[KEY_CONTENT]
    const nodeType = d[KEY_NODE_TYPE]
    if (nodeType == "heading-2") {
      wrapParas(
        lastParaData[KEY_PARAS_IN_SECTION],
        lastParaData[KEY_LEFT_WINDER],
        nodes
      )
      lastParaData[KEY_PARAS_IN_SECTION].length = 0
    } else if (nodeType == "paragraph") {
      const pClass = "text-xl"
      const pClassLastLeft = "text-xl"
      const pClassLastRite = "text-xl"
      const pClassOption = d[KEY_LAST_PARA]
        ? d[KEY_LEFT_WINDER]
          ? pClassLastLeft
          : pClassLastRite
        : pClass

      const p = `
          <p
            class="${pClassOption}"
          >
            ${content}
          </p>
      `

      lastParaData[KEY_PARAS_IN_SECTION].push(p)
      lastParaData[KEY_LEFT_WINDER] = d[KEY_LEFT_WINDER]
    }
  }

  wrapParas(lastParaData[KEY_PARAS_IN_SECTION], null, nodes)
  lastParaData[KEY_PARAS_IN_SECTION].length = 0

  return nodes.join("")
}

const Article = ({ data }) => {
  const {
    title,
    lastName,
    businessName,
    featureType2,
    introText,
    bodyText,
    mainImage,
  } = data.contentfulArticle
  const parsedBodyText = prepContent(bodyText.json.content)
  const parsedIntro = prepContentintro(introText.json.content)

  return (
    <Layout>
      
      <div className="lg:grid lg:grid-cols-2 lg:grid-rows-2">
        <div className="lg:col-span-1 lg:row-span-2 lg:pr-1 lg:h-screen">
          <img
            className="lg:pr-20 lg:h-full w-full object-cover object-center "
            alt={mainImage.title}
            src={mainImage.fluid.src}
          />
        </div>
        <div className="ml-5 lg:ml-0 lg:col-start-2 lg:col-span-1 lg:row-span-1s">
          <h1 className="bigname text-white ml-2 lg:-mt-0 lg:ml-0 text-6xl lg:text-6xl leading-tight lg:-ml-2  uppercase tracking-wide">
            {title}
            <br /> {lastName}
          </h1>
          <h2 className=" text-gray-800 uppercase text-2xl ml-2 lg:ml-0 ">
            {businessName}
          </h2>
          <h2 className="text-gray-700 uppercase text-2xl" >{featureType2[0].title}</h2> 
        </div>

        <div className="lg:mt-5 lg:mx-auto lg:ml-8 mr-8 lg:border-l-2 lg:border-blue-700 lg:border-t-2 lg:border-l-4 lg:border-t-4 lg:col-start-2 lg:row-start-2 lg:row-span-1 lg:col-span-1 pt-2 lg:pt-4 pl-2 lg:pl-4 lg:mr-48 lg:ml-16">
          <div className="intro text-2xl pl-5"><em>{ReactHtmlParser(parsedIntro)}</em></div>
        </div>
      </div>
      <div className="hidden lg:visible lg:grid lg:grid-cols-2 ">
        <div className="lg:col-span-1 lg:px-1 "></div>
        <div className="h-0 lg:border-l-4 lg:border-blue-700 lg:col-start-2 lg:h-20 lg:col-span-1 lg:pt-4 lg:pl-4 lg:pr-32 lg:ml-16"></div>
      </div>

      <div className="text-lg"> {ReactHtmlParser(parsedBodyText)} </div>

      <Link to="/blogposts">View more posts</Link>
      <Link to="/">Back to Home</Link>
    </Layout>
  )
}

export default Article
export const query = graphql`
  query($slug: String!) {
    contentfulArticle(slug: { eq: $slug }) {
      title
      lastName
      businessName
      slug
      bodyText {
        json
        bodyText
      }
      featureType2 {
        title
      }
      introText {
        json
        introText
      }
      mainImage {
        fluid(maxWidth: 1000) {
          src
        }
        title
        file {
          fileName
          url
        }
      }
    }
  }
`
