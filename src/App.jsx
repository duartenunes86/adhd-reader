import React, { useEffect, useState } from 'react';
import { bionifyHTML } from 'bionify';



function App() {
  const [htmlContent, setHtmlContent] = useState('');
  const [url, setUrl]=useState("http://www.sapo.pt")
  const [provisoryUrl, setProvisoryUrl]=useState("")
  function fixRelativeImageUrls(html, websiteUrl) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
  
    const imgTags = tempElement.querySelectorAll('img');
    for (const imgTag of imgTags) {
      const src = imgTag.getAttribute('src');
      if (src && !src.startsWith('http')) {
        const absoluteUrl = new URL(src, websiteUrl).toString();
        imgTag.setAttribute('src', absoluteUrl);
      }
    }
  
    return tempElement.innerHTML;
  }
  const bionifyWord=(word)=>{
    let length=word.length
    let wordArray=word.split("")
    let newWordArray=[]
    for(let i=0;i<word.length;i++){
      if(i<word.length/2){
        newWordArray.push("<b>"+wordArray[i]+"</b>")
      }
      else newWordArray.push(wordArray[i])

    }
    return newWordArray.join("")
  }
  




  function formatTextWordsInHTML(html) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
  
    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        // Split the text node into words
        const words = node.textContent.split(/\s+/);
        const formattedWords = words.map((word) => `${bionifyWord(word)}`);
        // Replace the text node with the formatted words
        const replacementNode = document.createElement('span');
        replacementNode.innerHTML = formattedWords.join(' ');
        node.parentNode.replaceChild(replacementNode, node);
      } else {
        // Recursively process child nodes
        for (const childNode of node.childNodes) {
          processNode(childNode);
        }
      }
    }
  
    // Start processing from the root element
    processNode(tempElement);
  
    // Return the updated HTML content
    return tempElement.innerHTML;
  }
  
  // Example usage:
  
 
  
  
  
  
  useEffect(() => {
    const websiteUrl = `http://api.scraperapi.com?api_key=c11ecaf62953cf14865e91630d60f913&url=${url}`;
    const websiteUrl2 = `https://app.scrapingbee.com/api/v1/?api_key=MEKU7IJVZISUVIEXGEZCMUIQPNLMK6U6V26EVI9HDXC3SCXI2MEIN53HFSPAMHHJL6MHPI1SSBZQNSVE&url=${url}`
    const websiteUrl3 = `http://api.scraperapi.com?api_key=c11ecaf62953cf14865e91630d60f913&url=${url}`

    fetch(websiteUrl2)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        formatTextWordsInHTML(data)
        // // Split the HTML content by spaces
        // const dataArray = data.split(" ");
        
        // // Map through the dataArray and apply bionifyHTML to HTML elements
        // const newArray = dataArray.map((element) => {
        //   if (/<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(element)) {
        //     return element;
        //   } else {
        //     return bionifyHTML(element);
        //   }
        // });
        
        // Join the newArray back into a string
        // const bionifiedHTML = newArray.join(" ");
        
       return formatTextWordsInHTML(data);
        // console.log(bionifiedHTML);
      }).then((data1) => {
        // Update the HTML content, fixing image URLs
        const fixedHtmlContent = fixRelativeImageUrls(data1, url);
        setHtmlContent(fixedHtmlContent);
      })
      .catch((error) => console.error('Error fetching and processing HTML:', error));
  }, [url, htmlContent]);

  return (
    <div>
      Write website here <input onChange={e=>{setProvisoryUrl(e.target.value)}}></input><button onClick={e=>{setUrl(provisoryUrl)}}>Submit</button>
      
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}

export default App;