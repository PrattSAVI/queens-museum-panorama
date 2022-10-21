import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
    
class PanoramaNav extends LitElement {
  
  static get styles() {
    return css`

      div {
        display: inline;
      }

      a {
        text-decoration: none; 
      }

      a, a:visited, a:hover, a:active {
        color: inherit;
      }
      

    `;
  }

  render() {
    return html`<div><a href="./">Home</a></div
                <div>Recorded Text</div>
                <div>Language</div>`;
  }
  
}

customElements.define('panorama-nav', PanoramaNav);
