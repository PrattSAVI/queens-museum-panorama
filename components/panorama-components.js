import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

const navStyles = css`
  .nav {
    margin: 0;
    display:flex;
    justify-content:flex-end;
  }

  .nav div.button{
    display: inline;
    margin: 12px 8px;
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
      exploreButton: {type: Boolean},
      darkBackground: {type: Boolean}
    };
  }  
  
  static get styles() {
    return navStyles;
  }


  constructor() {
    // Always call super() first
    super();
  
    // Initialize properties
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

      let exploreButton = (this.exploreButton) ? 
        html`
          <div class="button svg justify-left">
            <a href="./explore-the-panorama.html">
              <svg id="explore_white" width="24" height="24" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                <style type="text/css">
                  .st0{fill:none;stroke:#1A1818;stroke-miterlimit:10;}
                  .st1{fill:none;stroke:#1A1818;stroke-width:0.75;stroke-miterlimit:10;}
                  .st2{fill:#1A1818;}
                  .st3{fill:none;stroke:#1A1818;stroke-width:0.56;stroke-miterlimit:10;}
                  .st4{fill:none;stroke:#1A1818;stroke-linecap:round;stroke-linejoin:round;}
                  .st5{fill:none;stroke:#1A1818;stroke-width:0.75;stroke-linecap:round;stroke-linejoin:round;}
                  .st6{fill:none;}
                  .st7{fill:none;stroke:#030303;}
                </style>
                <g id="Group_690" transform="translate(-562 -12)">
                  <g id="Group_685_00000040573417491633910020000017888779996977186981_" transform="translate(561.084 10.919)">
                    <g id="Group_686_00000087378306655997892350000001387088886016160949_" transform="translate(3.031 2.794)">
                      <path id="Path_1242_00000085954393186421295200000004422778456213799358_" class="st0" d="M13.4,2.9c1,0,4.2,1.5,4.7,1.7
                        s0.8,0.3,1,0.8c0.3,0.8,0.4,1.6,0.3,2.5c-0.1,0.8-0.3,1.9-1.3,1.9S9.6,9.8,9,9.8S8.1,9.3,8,8.5S7.9,6.6,7.9,6.1S8.4,4.9,9,4.5
                        C10.4,3.8,11.9,3.2,13.4,2.9z"/>
                      <path id="Path_1243_00000098925756554232709080000010713879286309023673_" class="st1" d="M8.6,3.6c0.3-0.1,0.6-0.2,0.9-0.3
                        c1.4-0.3,2.8-0.5,4.3-0.6c0.7,0.1,1.5,0.2,2.2,0.3c0.9,0.1,1.8,0.4,2.7,0.7c0.2,0.1,0.2,0.2,0.4,0.4c0.7,1.3,1.2,2.6,1.5,4.1
                        c0.2,1.1,0.2,2.1,0.1,3.2c-0.4,2.2-1.4,4.3-2.8,6.1c-0.9,1.4-2.2,2.5-3.6,3.3c-0.6,0.3-1.2,0.2-2-0.3c-0.7-0.4-1.3-1-1.9-1.5
                        c-0.7-0.7-1.3-1.5-1.8-2.4c-0.9-1.4-1.6-3-1.9-4.6c-0.1-0.9-0.2-1.8-0.2-2.7c0.1-0.7,0.2-1.4,0.4-2.1c0.3-1.1,0.8-2.1,1.3-3.1
                        C8.2,3.9,8.4,3.8,8.6,3.6z"/>
                      <path id="Path_1244_00000032611856411441197790000009941141638634835617_" class="st2" d="M14.2,6.5c0.2-0.9,1-1.5,1.9-1.3
                        c0.9,0.1,1.5,0.9,1.3,1.8c0,0,0,0,0,0c-0.2,0.9-1,1.5-1.9,1.3C14.7,8.2,14.1,7.4,14.2,6.5C14.2,6.6,14.2,6.5,14.2,6.5"/>
                      <path id="Path_1245_00000029019046030584992970000004733917000542983331_" class="st3" d="M14.2,6.5c0.2-0.9,1-1.5,1.9-1.3
                        c0.9,0.1,1.5,0.9,1.3,1.8c0,0,0,0,0,0c-0.2,0.9-1,1.5-1.9,1.3C14.7,8.2,14.1,7.4,14.2,6.5C14.2,6.6,14.2,6.5,14.2,6.5z"/>
                      <path id="Path_1246_00000010286785076194421360000012133233798028899484_" class="st4" d="M4.2,8.2H3.7c0,0-0.3,0.3-0.3,1.7
                        c-0.1,0.5,0,1.1,0.2,1.6c0.2,0,0.3,0,0.5,0c0.1-0.1,0.2-0.1,0.4-0.1c0.1,0,0.3,0,0.4,0c0.1,1,0.3,2,0.5,3
                        c0.4,1.3,0.9,2.5,1.5,3.7c0.6,1.2,1.5,2.3,2.4,3.2c0.8,0.7,1.4,1.5,1.9,2.4c0.1,0.3,0.1,0.6,0,0.9h4.7c0,0,0-0.4,0-0.9
                        s1.3-1.6,2.4-3.1c1-1.1,1.8-2.3,2.5-3.6c0.7-1.4,1.2-2.8,1.5-4.3c0.2-0.9,0.3-1.8,0.3-2.8c0-0.4,0-0.9-0.1-1.3
                        c-0.1-0.2-0.5-0.2-0.5-0.2l-1.2,0c0.1,0.8,0.1,1.5,0,2.3c-0.3,1.9-1,3.8-2,5.4c-1.1,1.8-4,4.8-4.9,4.8s-3-1.5-4.4-3.4
                        c-1.3-1.9-2.2-3.9-2.6-6.1c-0.2-0.7-0.2-1.3-0.3-2c0-0.3,0-0.7-0.1-1H4.7C4.6,8.6,4.5,8.7,4.5,8.8"/>
                      <path id="Path_1247_00000065043198408962865980000017295229491362158779_" class="st0" d="M22.4,8.9c0-0.5,0.4-0.4,0.8-0.2
                        c0.3,0.2,0.5,0.5,0.4,1.5s-0.1,1.6-0.4,1.6c-0.2,0.1-0.5,0-0.8,0"/>
                      <path id="Path_1248_00000122699915272330443400000006811791041879986619_" class="st2" d="M11.6,5.2c0.9,0,1.6,0.7,1.6,1.6
                        c0,0.9-0.7,1.6-1.6,1.6c-0.9,0-1.6-0.7-1.6-1.6C10,5.9,10.7,5.2,11.6,5.2C11.6,5.2,11.6,5.2,11.6,5.2"/>
                      <path id="Path_1249_00000034805428652634624070000011585940557838039471_" class="st3" d="M11.6,5.2c0.9,0,1.6,0.7,1.6,1.6
                        c0,0.9-0.7,1.6-1.6,1.6c-0.9,0-1.6-0.7-1.6-1.6C10,5.9,10.7,5.2,11.6,5.2C11.6,5.2,11.6,5.2,11.6,5.2z"/>
                      <path id="Path_1250_00000183938862266682380550000010993977203510467773_" class="st0" d="M13.5,2.9c1.7,0.1,3.3,0.6,4.6,1.6
                        c1.7,1.2,2.6,3.3,2.5,5.4c0,3.9-3.2,7-7.1,7c-3.9,0-7.1-3.1-7.1-7C6.4,6,9.6,2.9,13.5,2.9C13.5,2.9,13.5,2.9,13.5,2.9z"/>
                      <path id="Path_1252_00000087389761252649666810000002334094209422613383_" class="st2" d="M15.4,14.2l-4,0
                        c-0.1,0-0.2-0.1-0.2-0.2c0,0,0,0,0,0l0-2.1c0-0.1,0.1-0.2,0.2-0.2l4.1-0.1c0.1,0,0.2,0.1,0.2,0.2c0,0,0,0,0,0l0,2.1
                        C15.6,14.1,15.5,14.2,15.4,14.2C15.4,14.2,15.4,14.2,15.4,14.2"/>
                      <path id="Path_1253_00000146496477843080623750000001556782647941034120_" class="st5" d="M4.5,8.9c-0.1,0.5-0.1,0.9-0.1,1.4
                        c0,0.4,0,0.8,0.2,1.2"/>
                    </g>
                  </g>
                  <g id="back_00000049902655465062385290000003367921962786430593_" transform="translate(562 12)">
                    <g id="back-2_00000137133076692526496170000003678536924391411868_">
                      <g id="Rectangle_69_00000047770063321386878450000015563081813408179858_">
                        <path class="st6" d="M9.4,2.9h12c3.3,0,6,2.7,6,6v12c0,3.3-2.7,6-6,6h-12c-3.3,0-6-2.7-6-6v-12C3.4,5.6,6.1,2.9,9.4,2.9z"/>
                        <path class="st7" d="M9.4,3.4h12c3,0,5.5,2.5,5.5,5.5v12c0,3-2.5,5.5-5.5,5.5h-12c-3,0-5.5-2.5-5.5-5.5v-12
                          C3.9,5.8,6.4,3.4,9.4,3.4z"/>
                      </g>
                    </g>
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