import{LitElement as e,html as t,css as a}from"https://unpkg.com/lit-element@2.4.0/lit-element.js?module";customElements.define("mk-plant-card-editor",class extends e{static get properties(){return{hass:{},_config:{}}}setConfig(e){this._config=e}_schemaPrimary(){return[{name:"plant_name",label:"Nazwa rośliny",selector:{text:{}}},{name:"sun_exposure",label:"Nasłonecznienie",selector:{select:{options:[{value:"🌑",label:"Cień"},{value:"⛅",label:"Półcień"},{value:"☀️",label:"Pełne słońce"}]}}}]}_schemaImage(){return[{name:"image",label:"URL zdjęcia",selector:{text:{}},helper:"np. /local/images/plants/zdjecie.jpg"}]}_schemaSensors(){return[{name:"battery_sensor",label:"Sensor baterii",selector:{entity:{domain:"sensor"}}},{name:"moisture_sensor",label:"Wilgotność ziemi",selector:{entity:{domain:"sensor"}}},{name:"temp_sensor",label:"Temperatura",selector:{entity:{domain:"sensor"}}},{name:"humidity_sensor",label:"Wilgotność powietrza",selector:{entity:{domain:"sensor"}}}]}_schemaPowerPlant(){return[{name:"min_moisture",label:"Min. Wilgotność ziemi",selector:{entity:{domain:"number"}}},{name:"max_moisture",label:"Max. Wilgotność ziemi",selector:{entity:{domain:"number"}}},{name:"min_temp",label:"Min. Temperatura",selector:{entity:{domain:"number"}}},{name:"max_temp",label:"Max. Temperatura",selector:{entity:{domain:"number"}}},{name:"min_humidity",label:"Min. Wilgotność powietrza",selector:{entity:{domain:"number"}}},{name:"max_humidity",label:"Max. Wilgotność powietrza",selector:{entity:{domain:"number"}}}]}_schemaHelpers(){return[{name:"description_sensor",label:"Sensor opisu (atrybut: instrukcja)",selector:{entity:{domain:"sensor"}}},{name:"fertilize_helper",label:"Pomocnik daty nawożenia",selector:{entity:{domain:"input_datetime"}}}]}render(){return this.hass&&this._config?t`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaPrimary()}
          .computeLabel=${e=>e.label}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaImage()}
          .computeLabel=${e=>e.label}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <p style="font-weight: bold; color: var(--primary-color); margin: 15px 0 8px 0;">Sensory rośliny</p>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaSensors()}
          .computeLabel=${e=>e.label}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <hr style="border: 0; border-top: 1px solid var(--divider-color); margin: 20px 0;">
        <p style="font-weight: bold; color: var(--primary-color); margin-bottom: 8px;">Sensory Power Plant</p>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaPowerPlant()}
          .computeLabel=${e=>e.label}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <hr style="border: 0; border-top: 1px solid var(--divider-color); margin: 20px 0;">
        <p style="font-weight: bold; color: var(--primary-color); margin-bottom: 8px;">Pomocnicy</p>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaHelpers()}
          .computeLabel=${e=>e.label}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `:t``}_valueChanged(e){const t=new CustomEvent("config-changed",{detail:{config:e.detail.value},bubbles:!0,composed:!0});this.dispatchEvent(t)}});const i=a`
  ha-card { padding: 16px; font-family: 'Roboto', sans-serif; border-radius: 12px; }
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }  
  .title { font-weight: bold; font-size: 1.1em; }
  .info-icon { cursor: pointer; transition: 0.3s; }
      
  .main-container { display: flex; gap: 12px; }
  .image-col { flex: 1; cursor: pointer; } /* 1/3 szerokości */
  .data-col { flex: 2; display: flex; flex-direction: column; gap: 6px; } /* 2/3 szerokości */
      
  img { width: 100%; height: 100%; border-radius: 10px; object-fit: cover; }
      
  .param-row { display: flex; align-items: center; gap: 10px; background: var(--secondary-background-color); padding: 6px 10px; border-radius: 8px; }
  .param-text { display: flex; flex-direction: column; flex-grow: 1; }
  .p-name { font-size: 0.75em; color: var(--secondary-text-color); }
  .p-state { font-weight: bold; font-size: 0.9em; }
  .range { font-size: 0.8em; font-weight: bold; white-space: nowrap; }
      
  .fertilize-btn { margin-top: 12px; display: flex; align-items: center; gap: 12px; padding: 10px; background: var(--primary-color); color: white; border-radius: 8px; cursor: pointer; }
  .btn-text { display: flex; flex-direction: column; }
  .btn-primary { font-weight: bold; font-size: 0.9em; }
  .btn-secondary { font-size: 0.7em; opacity: 0.9; }
      
  .details-section { font-size: 0.85em; line-height: 1.4; color: var(--primary-text-color); }
  .details-section ha-markdown { display: block; font-size: 0.9em;}
  
  hr { border: 0; border-top: 1px solid var(--divider-color); margin: 10px 0; }
`;customElements.define("mk-plant-card",class extends e{static get properties(){return{hass:{},config:{},_showDetails:{type:Boolean}}}constructor(){super(),this._showDetails=!1}static getConfigElement(){return document.createElement("mk-plant-card-editor")}setConfig(e){if(!e.plant_name)throw new Error("Musisz zdefiniować 'plant_name'");this.config={sun_exposure:"🌑",image:"",...e}}_getState(e){return this.hass.states[e]?this.hass.states[e].state:"—"}render(){const{config:e,hass:a}=this,i=this._getState(e.battery_sensor),s=parseFloat(this._getState(e.moisture_sensor)),o=parseFloat(this._getState(e.temp_sensor)),n=parseFloat(this._getState(e.humidity_sensor)),r=parseFloat(this._getState(e.min_moisture)),l=parseFloat(this._getState(e.max_moisture)),c=parseFloat(this._getState(e.min_temp)),m=parseFloat(this._getState(e.max_temp)),d=parseFloat(this._getState(e.min_humidity)),p=parseFloat(this._getState(e.max_humidity)),h=s<r?"blue":s>l?"red":"green",g=s<r||s>l?"mdi:water-alert":"mdi:water",u=o<c?"mdi:thermometer-low":o>m?"mdi:thermometer-high":"mdi:thermometer",_=o<c||o>m?"red":"green",b=n<d||n>p?"red":"green",f=n<d||n>p?"mdi:water-percent-alert":"mdi:water-percent",v=e.sun_exposure||"🌑";return t`
      <ha-card>
        <div class="header">
          <div class="title">${v} ${e.plant_name} (🔋 ${i}%)</div>
          <ha-icon 
            icon="${this._showDetails?"mdi:information":"mdi:information-outline"}" 
            class="info-icon"
            style="color: ${this._showDetails?"green":"grey"}"
            @click="${()=>this._toggleDetails()}">
          </ha-icon>        
        </div>

        <div class="main-container">
          <div class="image-col" @click="${()=>this._handleMoreInfo(e.moisture_sensor)}">
            <img src="${e.image}">
          </div>

          <div class="data-col">
            <div class="param-row">
              <ha-icon icon="${g}" style="color: ${h}"></ha-icon>
              <div class="param-text">
                <span class="p-name">Wilgotność ziemi</span>
                <span class="p-state">${s} %</span>
              </div>
              <div class="range">### ${r}-${l}%</div>
            </div>

            <div class="param-row">
              <ha-icon icon="${u}" style="color: ${_}"></ha-icon>
              <div class="param-text">
                <span class="p-name">Temperatura</span>
                <span class="p-state">${o} °C</span>
              </div>
              <div class="range">### ${c}-${m}°C</div>
            </div>

            <div class="param-row">
              <ha-icon icon="${f}" style="color: ${b}"></ha-icon>
              <div class="param-text">
                <span class="p-name">Wilgotność powietrza</span>
                <span class="p-state">${n} %</span>
              </div>
              <div class="range">### ${d}-${p}%</div>
            </div>

            <div class="fertilize-btn" style="margin-top: 10px;" @click="${()=>this._callScript(e.fertilize_helper)}">
              <ha-icon icon="mdi:sprinkler-variant"></ha-icon>
              <div class="btn-text">
                <span class="btn-primary">Zapisz nawożenie</span>
                <span class="btn-secondary">Ostatnio: ${this._getState(e.fertilize_helper)}</span>
              </div>
            </div>
          </div>
        </div>

        ${this._showDetails?t`
          <div class="details-section">
            <hr>
            <ha-markdown
              .content=${a.states[e.description_sensor]?.attributes.instrukcja||"Brak opisu"}>
            </ha-markdown>
          </div>
        `:""}
      </ha-card>
    `}_toggleDetails(){this._showDetails=!this._showDetails}_handleMoreInfo(e){const t=new Event("hass-more-info",{bubbles:!0,composed:!0});t.detail={entityId:e},this.dispatchEvent(t)}_callScript(e){if(e){if(confirm("Czy na pewno chcesz zapisać dzisiejszą datę nawożenia?")){const t=new Date,a=t.getFullYear(),i=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");this.hass.callService("input_datetime","set_datetime",{entity_id:e,date:`${a}-${i}-${s}`})}}else alert("Błąd: Nie skonfigurowano pomocnika daty nawożenia!")}static get styles(){return i}}),window.customCards=window.customCards||[],window.customCards.push({type:"mk-plant-card",name:"MK Plant Card",description:"Karta rośliny z dziennikiem nawożenia",preview:!0});
