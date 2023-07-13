
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import axios from 'axios'
import './App.css'

class UnsplashImageLoader {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  async getRandomImage() {
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        headers: {
          Authorization: `Client-ID ${this.apiKey}`,
        },
      })

      return response.data.urls.regular
    } catch (error) {
      console.error('Error fetching image:', error)
    }
    return null
  }
}

class ShareButton {
   constructor(shareUrl, shareImage) {
    this.shareUrl = shareUrl
    this.shareImage = shareImage
  }

  render() {
    return (
      <div className="share-buttons">
         <FacebookShareButton url={this.shareUrl} imageUrl={this.shareImage}>
        <FaFacebook size={30} className="fb"/>
      </FacebookShareButton>
      <TwitterShareButton url={this.shareUrl} imageUrl={this.shareImage}>
        <FaTwitter size={30} className="tt"/>
      </TwitterShareButton>
      <WhatsappShareButton url={this.shareUrl} imageUrl={this.shareImage}>
        <FaWhatsapp size={30} className="wa" />
      </WhatsappShareButton>
    
      </div>
    )
  }
}

  const App = () => {
    const [image, setImage] = useState('')
  
    useEffect(() => {
      const imageLoader = new UnsplashImageLoader('LqzS6iYTqv2QxPqhQu4fp7Fzl9pmyhXbWOBxjpiG7NQ')
  
      const fetchRandomImage = async () => {
        try {
          const randomImage = await imageLoader.getRandomImage()
          setImage(randomImage)
          
        } catch (error) {
          console.error('Error fetching image:', error)
        }
      }
  
      fetchRandomImage()
    }, [])
   

    const title = 'Random'
    const description = 'Anything'
    const shareUrl = window.location.href
    const shareButton = new ShareButton(shareUrl, image)

    return (
      <>
        <Helmet>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta property="og:image:url" content={image} />

   
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:secure_url" content={image} />

       </Helmet>
        <div className="container">
         
              <img src={image} alt="Random" className="image" />
              {shareButton.render()}        
          </div>
      </>
    )
  }


export default App
