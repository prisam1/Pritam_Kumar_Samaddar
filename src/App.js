
 
                  import React from 'react';
                  import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
                  import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
                  import axios from 'axios';
                  import './App.css'
                  class ShareButtons extends React.Component {
                    render() {
                      const { shareUrl} = this.props;
                  
                      return (
                        <div className="share-buttons">
                          <FacebookShareButton url={shareUrl}>
                            <FaFacebook size={30} className="fb" />
                          </FacebookShareButton>
                          <TwitterShareButton url={shareUrl}>
                            <FaTwitter size={30} className="tt" />
                          </TwitterShareButton>
                          <WhatsappShareButton url={shareUrl} >
                            <FaWhatsapp size={30} className="wa" />
                          </WhatsappShareButton>
                        </div>
                      );
                    }
                  }
                  
                  class App extends React.Component {
                    constructor(props) {
                      super(props);
                      this.state = {
                        image: '',
                      };
                    }
                  
                    componentDidMount() {
                      this.fetchRandomImage();
                    }
                  
                    fetchRandomImage = async () => {
                      try {
                        const response = await axios.get('https://api.unsplash.com/photos/random', {
                          headers: {
                            Authorization: 'Client-ID LqzS6iYTqv2QxPqhQu4fp7Fzl9pmyhXbWOBxjpiG7NQ',
                          },
                        });
                        this.setState({ image: response.data.urls.regular });
                      } catch (error) {
                        console.error('Error fetching image:', error);
                      }
                    };
                  
                    renderMetaTags = () => {
                      const { image } = this.state;
                      const shareUrl = window.location.href;
                  
                      const metaTags = [
                        { property: 'og:title', content: 'Random Image' },
                        { property: 'og:description', content: 'Check out this random image' },
                        { property: 'og:image', content: image },
                        { property: 'og:image:secure_url', content: image },
                        { property: 'og:type', content: 'website' },
                        { property: 'og:url', content: shareUrl },
                        { name: 'twitter:card', content: 'summary_large_image' },
                        { name: 'twitter:title', content: 'Random Image' },
                        { name: 'twitter:description', content: 'Check out this random image' },
                        { name: 'twitter:image', content: image },
                      ];
                  
                      return metaTags.map(({ name, property, content }) => {
                        const tag = name ? document.querySelector(`meta[name="${name}"]`) : document.querySelector(`meta[property="${property}"]`);
                        if (tag) {
                          tag.setAttribute('content', content);
                        } else {
                          const newTag = document.createElement('meta');
                          newTag.setAttribute(name ? 'name' : 'property', name || property);
                          newTag.setAttribute('content', content);
                          document.head.appendChild(newTag);
                        }
                        return null;
                      });
                    };
                  
                    render() {
                      const { image } = this.state;
                      const shareUrl = window.location.href;
                  
                      return (
                        <div className="container">
                          {image && <img src={image} alt="Random" className="image" />}
                          <ShareButtons shareUrl={shareUrl} shareImage={image} />
                          {this.renderMetaTags()}
                        </div>
                      );
                    }
                  }
                  
                  export default App;
                          