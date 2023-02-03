import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

const navStyles = css`
  .nav {
    margin: 0;
    display:flex;
    justify-content:flex-end;
  }

  .nav div.button{
    display: inline;
    margin: 12px 4px;
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

  .nav div.button.svg:hover rect,   .nav div.button.svg:hover .rect{
    fill:black;
  }

  .nav div.button.svg:hover path.rect{
    stroke:black;
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
      backURL: {type: String, attribute: 'back-url' },
      forwardURL: {type: String, attribute: 'forward-url' },
      noHomeButton: {type: Boolean, attribute: 'no-home-button' },
      exploreButton: {type: Boolean, attribute: 'explore-button'},
      darkBackground: {type: Boolean, attribute: 'dark-background'}
    };
  }  
  
  static get styles() {
    return navStyles;
  }


  constructor() {
    // Always call super() first
    super();
  
    // Initialize properties
    this.noHomeButton = false;
    this.exploreButton = false;
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

    let homeButton = (!this.noHomeButton) ? 
      html`
        <div class="button svg">
          <a href="./">
            <svg id="home_white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="black" stroke-width="1">
              <rect x="0.5" y="0.5" width="23" height="23" rx="5.5" fill="none"/>
              <g id="Group_682" data-name="Group 682" transform="translate(-577 -4156)">
                <path id="Path_1238" data-name="Path 1238" d="M18.39,10.877,11.614,4.186,4.922,10.877" transform="translate(577.221 4156)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                <path id="Path_1239" data-name="Path 1239" d="M16.978,9.706v8.608H6.3V9.706" transform="translate(577.221 4156)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
              </g>
            </svg>  
          </a>
        </div>` 
      : null

    let exploreButton = (this.exploreButton) ? 
      html`
        <div class="button svg">
          <a href="./explore-the-panorama.html">
            <svg id="explore_white" width="24" height="24" version="1.1" id="home_white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
              <path class="rect" fill="none" stroke="#000000" d="M6,0.5h12c3,0,5.5,2.5,5.5,5.5v12c0,3-2.5,5.5-5.5,5.5H6c-3,0-5.5-2.5-5.5-5.5V6
              C0.5,3,3,0.5,6,0.5z"/>
                <g id="Group_685_00000040573417491633910020000017888779996977186981_" transform="translate(561.084 10.919)">
                  <g id="Group_686_00000087378306655997892350000001387088886016160949_" transform="translate(3.031 2.794)">
                    
                      <path id="Path_1242_00000085954393186421295200000004422778456213799358_" fill="none" stroke="#1A1818" stroke-miterlimit="10" d="
                      M-552.2-12.5c1,0,4.1,1.5,4.6,1.7c0.5,0.2,0.8,0.3,1,0.8c0.3,0.8,0.4,1.6,0.3,2.5c-0.1,0.8-0.3,1.9-1.3,1.9c-1,0-8.4,0-9,0
                      s-0.9-0.5-1-1.3s-0.1-1.9-0.1-2.4s0.5-1.2,1.1-1.6C-555.2-11.6-553.7-12.2-552.2-12.5z"/>
                    
                      <path id="Path_1243_00000098925756554232709080000010713879286309023673_" fill="none" stroke="#1A1818" stroke-width="0.75" stroke-miterlimit="10" d="
                      M-556.9-11.8c0.3-0.1,0.6-0.2,0.9-0.3c1.4-0.3,2.8-0.5,4.2-0.6c0.7,0.1,1.5,0.2,2.2,0.3c0.9,0.1,1.8,0.4,2.7,0.7
                      c0.2,0.1,0.2,0.2,0.4,0.4c0.7,1.3,1.2,2.6,1.5,4.1c0.2,1.1,0.2,2.1,0.1,3.2c-0.4,2.2-1.4,4.3-2.8,6.1c-0.9,1.4-2.2,2.5-3.6,3.3
                      c-0.6,0.3-1.2,0.2-2-0.3c-0.7-0.4-1.3-1-1.9-1.5c-0.7-0.7-1.3-1.5-1.8-2.4c-0.9-1.4-1.6-3-1.9-4.6c-0.1-0.9-0.2-1.8-0.2-2.7
                      c0.1-0.7,0.2-1.4,0.4-2.1c0.3-1.1,0.8-2.1,1.3-3.1C-557.3-11.5-557.1-11.6-556.9-11.8z"/>
                    <path id="Path_1244_00000032611856411441197790000009941141638634835617_" fill="#1A1818" d="M-551.4-8.9c0.2-0.9,1-1.5,1.9-1.3
                      c0.9,0.1,1.5,0.9,1.3,1.8l0,0c-0.2,0.9-1,1.5-1.9,1.3C-550.9-7.2-551.5-8-551.4-8.9C-551.4-8.8-551.4-8.9-551.4-8.9"/>
                    
                      <path id="Path_1245_00000029019046030584992970000004733917000542983331_" fill="none" stroke="#1A1818" stroke-width="0.56" stroke-miterlimit="10" d="
                      M-551.4-8.9c0.2-0.9,1-1.5,1.9-1.3c0.9,0.1,1.5,0.9,1.3,1.8l0,0c-0.2,0.9-1,1.5-1.9,1.3C-550.9-7.2-551.5-8-551.4-8.9
                      C-551.4-8.8-551.4-8.9-551.4-8.9z"/>
                    
                      <path id="Path_1246_00000010286785076194421360000012133233798028899484_" fill="none" stroke="#1A1818" stroke-linecap="round" stroke-linejoin="round" d="
                      M-561.3-7.2h-0.5c0,0-0.3,0.3-0.3,1.7c-0.1,0.5,0,1.1,0.2,1.6c0.2,0,0.3,0,0.5,0C-561.3-4-561.2-4-561-4c0.1,0,0.3,0,0.4,0
                      c0.1,1,0.3,2,0.5,3c0.4,1.3,0.9,2.5,1.5,3.7s1.5,2.3,2.4,3.2c0.8,0.7,1.4,1.5,1.9,2.4c0.1,0.3,0.1,0.6,0,0.9h4.6c0,0,0-0.4,0-0.9
                      s1.3-1.6,2.4-3.1c1-1.1,1.8-2.3,2.5-3.6c0.7-1.4,1.2-2.8,1.5-4.3c0.2-0.9,0.3-1.8,0.3-2.8c0-0.4,0-0.9-0.1-1.3
                      c-0.1-0.2-0.5-0.2-0.5-0.2h-1.2c0.1,0.8,0.1,1.5,0,2.3c-0.3,1.9-1,3.8-2,5.4c-1.1,1.8-3.9,4.8-4.8,4.8c-0.9,0-3-1.5-4.3-3.4
                      c-1.3-1.9-2.2-3.9-2.6-6.1c-0.2-0.7-0.2-1.3-0.3-2c0-0.3,0-0.7-0.1-1h-1.8c-0.1,0.2-0.2,0.3-0.2,0.4"/>
                    
                      <path id="Path_1247_00000065043198408962865980000017295229491362158779_" fill="none" stroke="#1A1818" stroke-miterlimit="10" d="
                      M-543.3-6.5c0-0.5,0.4-0.4,0.8-0.2c0.3,0.2,0.5,0.5,0.4,1.5c-0.1,1-0.1,1.6-0.4,1.6c-0.2,0.1-0.5,0-0.8,0"/>
                    <path id="Path_1248_00000122699915272330443400000006811791041879986619_" fill="#1A1818" d="M-554-10.2c0.9,0,1.6,0.7,1.6,1.6
                      S-553.1-7-554-7c-0.9,0-1.6-0.7-1.6-1.6S-554.9-10.2-554-10.2L-554-10.2"/>
                    
                      <path id="Path_1249_00000034805428652634624070000011585940557838039471_" fill="none" stroke="#1A1818" stroke-width="0.56" stroke-miterlimit="10" d="
                      M-554-10.2c0.9,0,1.6,0.7,1.6,1.6S-553.1-7-554-7c-0.9,0-1.6-0.7-1.6-1.6S-554.9-10.2-554-10.2L-554-10.2z"/>
                    
                      <path id="Path_1250_00000183938862266682380550000010993977203510467773_" fill="none" stroke="#1A1818" stroke-miterlimit="10" d="
                      M-552.1-12.5c1.7,0.1,3.3,0.6,4.5,1.6c1.7,1.2,2.6,3.3,2.5,5.4c0,3.9-3.2,7-7,7s-7-3.1-7-7S-556-12.5-552.1-12.5L-552.1-12.5z"/>
                    <path id="Path_1252_00000087389761252649666810000002334094209422613383_" fill="#1A1818" d="M-550.2-1.2h-3.9
                      c-0.1,0-0.2-0.1-0.2-0.2l0,0v-2.1c0-0.1,0.1-0.2,0.2-0.2l4-0.1c0.1,0,0.2,0.1,0.2,0.2l0,0v2.1C-550-1.3-550.1-1.2-550.2-1.2
                      L-550.2-1.2"/>
                    
                      <path id="Path_1253_00000146496477843080623750000001556782647941034120_" fill="none" stroke="#1A1818" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" d="
                      M-561-6.5c-0.1,0.5-0.1,0.9-0.1,1.4c0,0.4,0,0.8,0.2,1.2"/>
                  </g>
                </g>
              </svg>
          </a>
        </div>` 
      : null


    return html`
      <div class="nav ${this.darkBackground?'dark-background':''}">
        ${homeButton}
        ${exploreButton}
        ${backButton}
        ${forwardButton}   
      </div>`;
  }
  
}

customElements.define('panorama-nav', PanoramaNav);