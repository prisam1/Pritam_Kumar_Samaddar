import React, { useState, useEffect } from 'react'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import "./App.css"

class ImageLoader {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  async getRandomImage() {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${this.apiKey}`)
    const data = await response.json()
    return data.urls.regular
  }
}

class ShareButton {
  constructor(shareUrl, shareImage) {
    this.shareUrl = shareUrl
    this.shareImage = shareImage
  }
  render(){
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
}}

const App = () => {
  const [image, setImage] = useState('')

  useEffect(() => {
    
    const imageLoader = new ImageLoader('LqzS6iYTqv2QxPqhQu4fp7Fzl9pmyhXbWOBxjpiG7NQ')
    
    const fetchRandomImage = async () => {
      const randomImage = await imageLoader.getRandomImage()
      setImage(randomImage)

      const ogMeta = document.createElement('meta')
      ogMeta.setAttribute('property', 'og:image')
      ogMeta.setAttribute('content', randomImage)
      document.head.appendChild(ogMeta)

      const twitterMeta = document.createElement('meta')
      twitterMeta.setAttribute('name', 'twitter:image')
      twitterMeta.setAttribute('content', randomImage)
      document.head.appendChild(twitterMeta)

      const whatsappMeta = document.createElement('meta')
      whatsappMeta.setAttribute('property', 'og:image')
      whatsappMeta.setAttribute('content', randomImage)
      document.head.appendChild(whatsappMeta)
    }

    fetchRandomImage()
  }, [])

  const shareUrl = window.location.href
  const shareButton = new ShareButton(shareUrl, image)

  return (
    <div className="container">
      <img src={image} alt="Random" className="image" />
      {shareButton.render()}
      </div>
  )
} 

export default App

