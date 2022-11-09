import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

const navStyles = css`
  .nav {
    margin: 20px 0;
  }

  .nav div {
    display: inline;
    border: 1px solid black;
    border-radius: 5px;
    padding: 4px;
  }

  .nav div:hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }

  a {
    text-decoration: none; 
  }

  a, a:visited, a:hover, a:active {
    color: inherit;
  }`

class PanoramaNav extends LitElement {
  
  static get styles() {
    return navStyles;
  }

  render() {
    return html`
      <div class="nav">
        <div><a href="./">Home</a></div>
        <div>Recorded Text</div>
        <div>Language</div>
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
        <div><a href="./">Home</a></div>
        <div>How to use the maps</div>
        <div>3d Panorama</div>
        <div><a href="./your-story.html">Add your story to the map</a></div>
        <div>Back</div>
      </div>`;          
  }
  
}

customElements.define('panorama-nav', PanoramaNav);
customElements.define('explore-nav', ExploreNav);
