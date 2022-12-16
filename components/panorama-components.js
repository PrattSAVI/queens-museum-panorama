import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

const navStyles = css`
  .nav {
    margin: 20px 0;
    display:flex;
    justify-content:flex-end;
  }

  .nav div {
    display: inline;
    border: 1px solid black;
    border-radius: 5px;
    padding: 4px;
    margin: 4px;
  }

  .nav div.justify-left {
    margin-right: auto;
  }

  .nav.dark-background div {
    border-color: white;
  }

  .nav div:hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }

  .nav.dark-background div:hover{
    background-color: white;
    color: black;
  }

  a {
    text-decoration: none; 
  }

  a, a:visited, a:hover, a:active {
    color: inherit;
  }`

class PanoramaNav extends LitElement {

  static get properties() {
    return {
      backURL: {type: String},
      forwardURL: {type: String},
      darkBackground: {type: Boolean}
    };
  }  
  
  static get styles() {
    return navStyles;
  }


  render() {
    
    let backButton = (this.backURL) ? html`<div><a href="${this.backURL}">Back</a></div>` : null
    let forwardButton = (this.forwardURL) ? html`<div><a href="${this.forwardURL}">Forward</a></div>` : null

    return html`
      <div class="nav ${this.darkBackground?'dark-background':''}">
        <div class="justify-left"><a href="/">Home</a></div>
        ${backButton}
        ${forwardButton}   
      </div>`;
  }
  
}

class ExploreNav extends LitElement {
  
  static get styles() {
    return navStyles;
  }

  render() {
    return html`
      <div class="nav">
       <div><a href="${this.greeting}">Back</a></div>
       <div><a href="">Forward</a></div>
      </div>`;          
  }
  
}

class YourStoryNav extends LitElement {
  
  static get styles() {
    return navStyles;
  }

  render() {
    return html`
      <div class="nav">
        <div><a href="./">Home</a></div>
        <div><a href="./explore.html">Back</a></div>
        <h1>New York City Stories</h1>
      </div>`;          
  }
  
}

customElements.define('panorama-nav', PanoramaNav);
customElements.define('explore-nav', ExploreNav);
customElements.define('your-story-nav', YourStoryNav);
