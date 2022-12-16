import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

const navStyles = css`
  .nav {
    margin: 20px 0;
    display:flex;
    justify-content:flex-end;
  }

  .nav div.button{
    display: inline;
    margin: 8px;
  }

  .nav div.button.justify-left {
    margin-right: auto;
  }

  .nav div.button.text  {
    border: 1px solid black;
    border-radius: 5px;
    padding: 4px;
  }

  .nav.dark-background div.button.text {
    border-color: white;
  }

  .nav.dark-background div.button.svg svg {
    stroke: white;
  }

  .nav div.button:hover {
    cursor: pointer;
  }

  .nav div.button.text:hover {
    background-color: black;
    color: white;
  }

  .nav div.button.svg:hover rect{
    fill:black;
  }

  .nav div.button.svg:hover path{
    stroke:white;
  }

  .nav.dark-background div.button.text:hover{
    background-color: white;
    color: black;
  }

  .nav.dark-background div.button.svg:hover path{
    stroke:black
  }

  .nav.dark-background div.button.svg:hover rect{
    fill: white;
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
    
    let backButton = (this.backURL) ? 
      html`
        <div class="button svg">
          <a href="${this.backURL}">
            <svg id="back-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="black" stroke-width="1">
              <rect x="0.5" y="0.5" width="23" height="23" rx="5.5" fill="none"/>
              <path id="back-path" data-name="back" d="M353.774,26.165,345,34.212l8.97,7.775" transform="translate(-339.076 -22.076)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
            </svg>          
          </a>
        </div>` 
      : null
    
    let forwardButton = (this.forwardURL) ? 
      html`
        <div class="button svg">
          <a href="${this.forwardURL}">
            <svg id="forward-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="black" stroke-width="1">
              <rect x="0.5" y="0.5" width="23" height="23" rx="5.5" fill="none"/>
              <path id="forward-path" data-name="forward" d="M345.2,26.165l8.77,8.048L345,41.987" transform="translate(-335.902 -22.076)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
            </svg>
          </a>
        </div>` 
    : null

    let homeButton = 
      html`
        <div class="button svg justify-left">
          <a href="/">
            <svg id="home_white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="black" stroke-width="1">
              <rect x="0.5" y="0.5" width="23" height="23" rx="5.5" fill="none"/>
              <g id="Group_682" data-name="Group 682" transform="translate(-577 -4156)">
                <path id="Path_1238" data-name="Path 1238" d="M18.39,10.877,11.614,4.186,4.922,10.877" transform="translate(577.221 4156)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                <path id="Path_1239" data-name="Path 1239" d="M16.978,9.706v8.608H6.3V9.706" transform="translate(577.221 4156)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
              </g>
            </svg>  
          </a>
        </div>` 

    return html`
      <div class="nav ${this.darkBackground?'dark-background':''}">
        ${homeButton}
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
