import{LitElement as e,html as t,css as a}from"https://unpkg.com/lit-element@2.4.0/lit-element.js?module";customElements.define("mk-plant-card-editor",class extends e{static get properties(){return{hass:{},_config:{}}}setConfig(e){this._config=e}_schema(){return[{name:"plant_name",label:"Nazwa rośliny",selector:{text:{}}},{name:"image",label:"URL zdjęcia",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"battery_sensor",label:"Sensor baterii",selector:{entity:{domain:"sensor"}}},{name:"moisture_sensor",label:"Wilgotność ziemi",selector:{entity:{domain:"sensor"}}},{name:"temp_sensor",label:"Temperatura",selector:{entity:{domain:"sensor"}}},{name:"humidity_sensor",label:"Wilgotność powietrza",selector:{entity:{domain:"sensor"}}}]},{type:"grid",name:"",schema:[{name:"min_moisture",label:"Min. Wilgotność ziemi",selector:{entity:{domain:"number"}}},{name:"max_moisture",label:"Max. Wilgotność ziemi",selector:{entity:{domain:"number"}}},{name:"min_temp",label:"Min. Temperatura",selector:{entity:{domain:"number"}}},{name:"max_temp",label:"Max. Temperatura",selector:{entity:{domain:"number"}}}]},{name:"details_boolean",label:"Przełącznik szczegółów",selector:{entity:{domain:"input_boolean"}}},{name:"description_sensor",label:"Sensor opisu (atrybut: instrukcja)",selector:{entity:{domain:"sensor"}}},{name:"fertilize_script",label:"Skrypt nawożenia",selector:{entity:{domain:"script"}}},{name:"fertilize_helper",label:"Pomocnik daty nawożenia",selector:{entity:{domain:"input_datetime"}}}]}render(){return this.hass&&this._config?t`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${e=>e.label}
        @value-changed=${this._valueChanged}
      ></ha-form>
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
`;customElements.define("mk-plant-card",class extends e{static get properties(){return{hass:{},config:{}}}static getConfigElement(){return document.createElement("mk-plant-card-editor")}setConfig(e){if(!e.plant_name)throw new Error("Musisz zdefiniować 'plant_name'");this.config=e}_getState(e){return this.hass.states[e]?this.hass.states[e].state:"—"}render(){const{config:e,hass:a}=this,i=this._getState(e.battery_sensor),s=parseFloat(this._getState(e.moisture_sensor)),n=parseFloat(this._getState(e.temp_sensor)),o=parseFloat(this._getState(e.humidity_sensor)),r=parseFloat(this._getState(e.min_moisture)),l=parseFloat(this._getState(e.max_moisture)),c=parseFloat(this._getState(e.min_temp)),m=parseFloat(this._getState(e.max_temp)),d=parseFloat(this._getState(e.min_humidity)),p=parseFloat(this._getState(e.max_humidity)),h=s<r?"blue":s>l?"red":"green",g=s<r||s>l?"mdi:water-alert":"mdi:water",u=n<c?"mdi:thermometer-low":n>m?"mdi:thermometer-high":"mdi:thermometer",_=n<c||n>m?"red":"green",b=o<d||o>p?"red":"green",f=o<d||o>p?"mdi:water-percent-alert":"mdi:water-percent";return t`
      <ha-card>
        <div class="header">
          <div class="title">🌑 ${e.plant_name} (🔋 ${i}%)</div>
          <ha-icon 
            icon="${"on"===a.states[e.details_boolean]?.state?"mdi:information":"mdi:information-outline"}" 
            class="info-icon"
            style="color: ${"on"===a.states[e.details_boolean]?.state?"green":"grey"}"
            @click="${()=>this._toggleDetails(e.details_boolean)}">
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
                <span class="p-state">${n} °C</span>
              </div>
              <div class="range">### ${c}-${m}°C</div>
            </div>

            <div class="param-row">
              <ha-icon icon="${f}" style="color: ${b}"></ha-icon>
              <div class="param-text">
                <span class="p-name">Wilgotność powietrza</span>
                <span class="p-state">${o} %</span>
              </div>
              <div class="range">### ${d}-${p}%</div>
            </div>
          </div>
        </div>

        <div class="fertilize-btn" @click="${()=>this._callScript(e.fertilize_script,e.fertilize_helper)}">
           <ha-icon icon="mdi:sprinkler-variant"></ha-icon>
           <div class="btn-text">
             <span class="btn-primary">Zapisz nawożenie</span>
             <span class="btn-secondary">Ostatnio: ${this._getState(e.fertilize_helper)}</span>
           </div>
        </div>

        ${"on"===a.states[e.details_boolean]?.state?t`
          <div class="details-section">
            <hr>
            <ha-markdown
              .content=${a.states[e.description_sensor]?.attributes.instrukcja||"Brak opisu"}>
            </ha-markdown>
          </div>
        `:""}
      </ha-card>
    `}_toggleDetails(e){this.hass.callService("input_boolean","toggle",{entity_id:e})}_handleMoreInfo(e){const t=new Event("hass-more-info",{bubbles:!0,composed:!0});t.detail={entityId:e},this.dispatchEvent(t)}_callScript(e,t){confirm("Czy na pewno chcesz zapisać dzisiejszą datę nawożenia?")&&this.hass.callService("script","turn_on",{entity_id:e,variables:{pomocnik:t}})}static get styles(){return i}});
