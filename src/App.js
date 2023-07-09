import React, { useState, useEffect } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import "./App.css"

const getRandomImage = async () => {
  const response = await fetch('https://api.unsplash.com/photos/random?client_id=LqzS6iYTqv2QxPqhQu4fp7Fzl9pmyhXbWOBxjpiG7NQ');
  const data = await response.json();
  return data.urls.regular;
};

const ShareButton = ({ shareUrl, shareImage }) => {
  return (
    <div className="share-buttons">
      <FacebookShareButton url={shareUrl} imageUrl={shareImage}>
        <FaFacebook size={30} className="fb"/>
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} imageUrl={shareImage}>
        <FaTwitter size={30} className="tt"/>
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} imageUrl={shareImage}>
        <FaWhatsapp size={30} className="wa" />
      </WhatsappShareButton>
    </div>
  )
}

const App = () => {
  const [image, setImage] = useState('')

  useEffect(() => {
    const fetchRandomImage = async () => {
      const randomImage = await getRandomImage()
      setImage(randomImage)

      const ogMeta = document.createElement('meta')
      ogMeta.setAttribute('property', 'og:image')
      ogMeta.setAttribute('content', randomImage)
      document.head.appendChild(ogMeta)

      const twitterMeta1 = document.createElement('meta')
      twitterMeta1.setAttribute('name', 'twitter:card')
      twitterMeta1.setAttribute('content', 'summary_large_image')
      document.head.appendChild(twitterMeta1)

      const twitterMeta2 = document.createElement('meta')
      twitterMeta2.setAttribute('name', 'twitter:image')
      twitterMeta2.setAttribute('content', randomImage)
      document.head.appendChild(twitterMeta2)

      const whatsappMeta = document.createElement('meta')
      whatsappMeta.setAttribute('property', 'og:image')
      whatsappMeta.setAttribute('content', randomImage)
      document.head.appendChild(whatsappMeta)
    }

    fetchRandomImage()
  }, [])

  const shareUrl = window.location.href

  return (
    <div className="container">
      <img src={image} alt="Random" className="image" />
      <ShareButton shareUrl={shareUrl} shareImage={image} />
    </div>
  )
} 

export default App

