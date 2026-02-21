import{LitElement as e,html as t,css as i}from"https://unpkg.com/lit-element@2.4.0/lit-element.js?module";const s={pl:{section_sensors:"Sensory rośliny",section_power:"Sensory progowe (Power Plant)",section_helpers:"Pomocnicy i opisy",plant_name:"Nazwa rośliny",sun_exposure:"Nasłonecznienie",image_url:"URL zdjęcia",image_helper:"np. /local/images/plants/zdjecie.jpg",battery_sensor:"Sensor baterii",soil_moisture:"Wilgotność ziemi",temperature:"Temperatura",air_humidity:"Wilgotność powietrza",min_prefix:"Min.",max_prefix:"Max.",range:"Zakres",desc_sensor:"Sensor opisu (atrybut: instrukcja)",fert_helper:"Pomocnik daty nawożenia",save_fertilize:"Zapisz nawożenie",last_time:"Ostatnio",no_description:"Brak opisu",confirm_fertilize:"Czy na pewno chcesz zapisać dzisiejszą datę nawożenia?",error_helper:"Błąd: Nie skonfigurowano pomocnika daty nawożenia!",shade:"Cień",partial_shade:"Półcień",full_sun:"Pełne słońce",card_description:"Pełna karta rośliny z instrukcją i nawożeniem",chip_description:"Mały alert (chip) - widoczny tylko gdy roślina wymaga podlewania",error_missing_name:"Błąd: Nazwa rośliny jest wymagana!",error_missing_sensors:"Skonfiguruj wszystkie sensory (Wilgotność, Próg Min, Próg Max)",chip_label_name:"Etykieta (opcjonalnie)",chip_label_moisture:"Sensor wilgotności gleby",chip_label_desc_min:"Sensor progu MIN (atrybut: min)",chip_label_desc_max:"Sensor progu MAX (atrybut: max)"},en:{section_sensors:"Plant sensors",section_power:"Threshold sensors",section_helpers:"Helpers and descriptions",plant_name:"Plant name",sun_exposure:"Sun exposure",image_url:"Image URL",image_helper:"e.g., /local/images/plants/photo.jpg",battery_sensor:"Battery sensor",soil_moisture:"Soil moisture",temperature:"Temperature",air_humidity:"Air humidity",min_prefix:"Min.",max_prefix:"Max.",range:"Range",desc_sensor:"Description sensor (attr: instruction)",fert_helper:"Fertilization date helper",save_fertilize:"Save fertilization",last_time:"Last time",no_description:"No description",confirm_fertilize:"Are you sure you want to save today's fertilization date?",error_helper:"Error: Fertilization helper not configured!",shade:"Shade",partial_shade:"Partial shade",full_sun:"Full sun",card_description:"Full plant card with instructions and fertilization",chip_description:"Small alert chip - visible only when watering is needed",error_missing_sensors:"Please configure all sensors (Moisture, Min Threshold, Max Threshold)",error_missing_name:"Error: Plant name is required!",chip_label_name:"Label (optional)",chip_label_moisture:"Soil moisture sensor",chip_label_desc:"MIN threshold sensor (min attr)",chip_label_desc_max:"MAX threshold sensor (max attr)"}};customElements.define("mk-plant-card-editor",class extends e{static get properties(){return{hass:{},_config:{}}}t(e){const t=this.hass.language||"en";return s[t]&&s[t][e]||s.en[e]||e}setConfig(e){this._config=e}_schemaPrimary(){return[{name:"plant_name",label:this.t("plant_name"),selector:{text:{}}},{name:"sun_exposure",label:this.t("sun_exposure"),selector:{select:{options:[{value:"🌑",label:this.t("shade")},{value:"⛅",label:this.t("partial_shade")},{value:"☀️",label:this.t("full_sun")}]}}}]}_schemaImage(){return[{name:"image",label:this.t("image_url"),selector:{text:{}},helper:this.t("image_helper")}]}_schemaSensors(){return[{name:"battery_sensor",label:this.t("battery_sensor"),selector:{entity:{domain:"sensor"}}},{name:"moisture_sensor",label:this.t("soil_moisture"),selector:{entity:{domain:"sensor"}}},{name:"temperature_sensor",label:this.t("temperature"),selector:{entity:{domain:"sensor"}}},{name:"humidity_sensor",label:this.t("air_humidity"),selector:{entity:{domain:"sensor"}}}]}_schemaPowerPlant(){const e=this.t("min_prefix"),t=this.t("max_prefix");return[{name:"min_moisture",label:`${e} ${this.t("soil_moisture")}`,selector:{entity:{domain:"number"}}},{name:"max_moisture",label:`${t} ${this.t("soil_moisture")}`,selector:{entity:{domain:"number"}}},{name:"min_temp",label:`${e} ${this.t("temperature")}`,selector:{entity:{domain:"number"}}},{name:"max_temp",label:`${t} ${this.t("temperature")}`,selector:{entity:{domain:"number"}}},{name:"min_humidity",label:`${e} ${this.t("air_humidity")}`,selector:{entity:{domain:"number"}}},{name:"max_humidity",label:`${t} ${this.t("air_humidity")}`,selector:{entity:{domain:"number"}}}]}_schemaHelpers(){return[{name:"description_sensor",label:this.t("desc_sensor"),selector:{entity:{domain:"sensor"}}},{name:"fertilize_helper",label:this.t("fert_helper"),selector:{entity:{domain:"input_datetime"}}}]}render(){return this.hass&&this._config?t`
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

        <p style="font-weight: bold; color: var(--primary-color); margin: 15px 0 8px 0;">${this.t("section_sensors")}</p>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaSensors()}
          .computeLabel=${e=>e.label}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <hr style="border: 0; border-top: 1px solid var(--divider-color); margin: 20px 0;">
        <p style="font-weight: bold; color: var(--primary-color); margin-bottom: 8px;">${this.t("section_power")}</p>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaPowerPlant()}
          .computeLabel=${e=>e.label}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <hr style="border: 0; border-top: 1px solid var(--divider-color); margin: 20px 0;">
        <p style="font-weight: bold; color: var(--primary-color); margin-bottom: 8px;">${this.t("section_helpers")}</p>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaHelpers()}
          .computeLabel=${e=>e.label}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `:t``}_valueChanged(e){const t=new CustomEvent("config-changed",{detail:{config:e.detail.value},bubbles:!0,composed:!0});this.dispatchEvent(t)}}),customElements.define("mk-plant-alert-chip-editor",class extends e{static get properties(){return{hass:{},_config:{}}}t(e){const t=this.hass.language||"en";return s[t]&&s[t][e]||s.en[e]||e}setConfig(e){this._config=e}_schema(){return[{name:"name",label:this.t("chip_label_name"),selector:{text:{}}},{name:"entity",label:this.t("chip_label_moisture"),selector:{entity:{domain:"sensor"}}},{name:"description_entity",label:this.t("chip_label_desc_min"),selector:{entity:{domain:"number"}}},{name:"description_max_entity",label:this.t("chip_label_desc_max"),selector:{entity:{domain:"number"}}}]}render(){const{config:e,hass:i}=this,s=i.states[e.entity],a=i.states[e.description_entity],r=i.states[e.description_max_entity];if(!s||!a||!r)return t`<div style="color: #444; font-size: 10px; border: 1px dashed #444; padding: 4px; border-radius: 8px;">
            ${e.name||"Plant"}: Brak sensorów...
        </div>`;const n=parseFloat(s.state),o=parseFloat(a.state),l=parseFloat(r.state);let c=!1;return(n<o||n>l)&&(c=!0),c?t`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${e=>e.label}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:t``}_valueChanged(e){const t=new CustomEvent("config-changed",{detail:{config:e.detail.value},bubbles:!0,composed:!0});this.dispatchEvent(t)}});const a=i`
  ha-card { padding: 16px; font-family: 'Roboto', sans-serif; border-radius: 12px; }
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }  
  
  /* ---- NAZWA ROŚLINY ---- */
  .title { font-weight: bold; font-size: 18px; }
  .info-icon { cursor: pointer; transition: 0.3s; }
      
  .main-container { display: flex; gap: 12px; }
  .image-col { flex: 1; cursor: pointer; } /* 1/3 szerokości */
  .data-col { flex: 2; display: flex; flex-direction: column; gap: 6px; } /* 2/3 szerokości */
      
  img { width: 100%; height: 100%; border-radius: 10px; object-fit: cover; }
      
  .param-row { display: flex; align-items: center; gap: 10px; background: var(--secondary-background-color); padding: 6px 10px; border-radius: 8px; }
  .param-text { display: flex; flex-direction: column; flex-grow: 1; }
  
  /* ---- CZUJNIKI (WARTOŚCI I NAZWY) ---- */
  .p-name { font-size: 16px; color: var(--secondary-text-color); }
  
  /* --- WARTOŚĆ CZUJNIKA --- */
  .p-state { font-weight: bold; font-size: 19px; }
  
  /* --- WARTOŚCI OD - DO --- */
  .range { font-size: 19px; font-weight: bold; white-space: nowrap; }
      
  /* ---- PRZYCISK NAWOŻENIA ---- */
  .fertilize-btn { margin-top: 12px; display: flex; align-items: center; gap: 12px; padding: 10px; background: var(--primary-color); color: white; border-radius: 8px; cursor: pointer; }
  .btn-text { display: flex; flex-direction: column; }
  .btn-primary { font-weight: bold; font-size: 18px; }
  .btn-secondary { font-size: 15px; opacity: 0.9; }
      
  
  /* ---- SEKCJA SZCZEGÓŁÓW ---- */
  .details-section { font-size: 16px; line-height: 1.6; color: var(--primary-text-color); }
  .details-section ha-markdown { display: block; font-size: 16px;}
  
  hr { border: 0; border-top: 1px solid var(--divider-color); margin: 10px 0; }
`;customElements.define("mk-plant-card",class extends e{static get properties(){return{hass:{},config:{},_showDetails:{type:Boolean}}}constructor(){super(),this._showDetails=!1}t(e){const t=this.hass.language||"en";return s[t]&&s[t][e]||s.en[e]||e}static getConfigElement(){return document.createElement("mk-plant-card-editor")}setConfig(e){if(!e.plant_name){const e=document.querySelector("home-assistant")?.hass?.language||"en",t=s[e]&&s[e].error_missing_name||s.en.error_missing_name;throw new Error(t)}this.config=e}_getState(e){return this.hass.states[e]?this.hass.states[e].state:"—"}render(){const{config:e,hass:i}=this,s=this._getState(e.battery_sensor),a=parseFloat(this._getState(e.moisture_sensor)),r=parseFloat(this._getState(e.temperature_sensor)),n=parseFloat(this._getState(e.humidity_sensor)),o=parseFloat(this._getState(e.min_moisture)),l=parseFloat(this._getState(e.max_moisture)),c=parseFloat(this._getState(e.min_temp)),m=parseFloat(this._getState(e.max_temp)),d=parseFloat(this._getState(e.min_humidity)),h=parseFloat(this._getState(e.max_humidity)),p=a<o?"blue":a>l?"red":"green",_=a<o||a>l?"mdi:water-alert":"mdi:water",u=r<c?"mdi:thermometer-low":r>m?"mdi:thermometer-high":"mdi:thermometer",g=r<c||r>m?"red":"green",f=n<d||n>h?"red":"green",b=n<d||n>h?"mdi:water-percent-alert":"mdi:water-percent",y=e.sun_exposure||"🌑";return t`
      <ha-card>
        <div class="header">
          <div class="title">${y} ${e.plant_name} (🔋 ${s}%)</div>
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
            ${this._showDetails?t`
              <div class="details-section">
                <hr>
                <ha-markdown
                  .content=${i.states[e.description_sensor]?.attributes.instrukcja||this.t("no_description")}>
                </ha-markdown>
              </div>
              `:""}
            
            <div class="param-row">
              <ha-icon icon="${_}" style="color: ${p}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t("soil_moisture")}</span>
                <span class="p-state">${a} %</span>
              </div>
              <div class="range">${this.t("range")}: ${o} - ${l}%</div>
            </div>
            
            <div class="param-row">
              <ha-icon icon="${u}" style="color: ${g}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t("temperature")}</span>
                <span class="p-state">${r} °C</span>
              </div>
              <div class="range">${this.t("range")}: ${c} - ${m}°C</div>
            </div>

            <div class="param-row">
              <ha-icon icon="${b}" style="color: ${f}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t("air_humidity")}</span>
                <span class="p-state">${n} %</span>
              </div>
              <div class="range">${this.t("range")}: ${d} - ${h}%</div>
            </div>

            <div class="fertilize-btn" style="margin-top: 10px;" @click="${()=>this._callScript(e.fertilize_helper)}">
              <ha-icon icon="mdi:sprinkler-variant"></ha-icon>
              <div class="btn-text">
                <span class="btn-primary">${this.t("save_fertilize")}</span>
                <span class="btn-secondary">${this.t("last_time")}: ${this._getState(e.fertilize_helper)}</span>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `}_toggleDetails(){this._showDetails=!this._showDetails}_handleMoreInfo(e){const t=new Event("hass-more-info",{bubbles:!0,composed:!0});t.detail={entityId:e},this.dispatchEvent(t)}_callScript(e){if(e){if(confirm(this.t("confirm_fertilize"))){const t=new Date,i=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;this.hass.callService("input_datetime","set_datetime",{entity_id:e,date:i})}}else alert(this.t("error_helper"))}static get styles(){return a}});customElements.define("mk-plant-alert-chip",class extends e{static get properties(){return{hass:{},config:{}}}static getConfigElement(){return document.createElement("mk-plant-alert-chip-editor")}render(){const{config:e,hass:i}=this,s=i.states[e.entity],a=i.states[e.description_entity],r=i.states[e.description_max_entity];if(!s||!a||!r)return t`<div style="color: orange; font-size: 10px;">Oczekiwanie na dane...</div>`;const n=parseFloat(s.state),o=parseFloat(a.attributes.min),l=parseFloat(r.attributes.max);let c=!1,m="#ff4444",d="rgba(255, 68, 68, 0.5)";return n<o?(c=!0,m="#ff4444",d="rgba(255, 68, 68, 0.5)"):n>l&&(c=!0,m="#44b4ff",d="rgba(68, 180, 255, 0.5)"),c?t`
      <style>
        :host { display: inline-block; margin-right: 8px; }
        .chip {
          display: flex; align-items: center;
          background: var(--card-background-color, #1c1c1c);
          border: 1px solid ${m}; border-radius: 16px;
          padding: 4px 10px; cursor: pointer;
          animation: pulse 2s infinite;
        }
        ha-icon { color: ${m}; --mdc-icon-size: 18px; margin-right: 4px; }
        span { font-size: 12px; font-weight: bold; color: var(--primary-text-color); }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 ${d}; }
          70% { box-shadow: 0 0 0 8px rgba(0, 0, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
        }
      </style>
      <div class="chip" @click="${()=>this._handleMoreInfo()}">
        <ha-icon icon="mdi:water-alert"></ha-icon>
        <span>${e.name||s.attributes.friendly_name}</span>
      </div>
    `:t``}_handleMoreInfo(){const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:this.config.entity},this.dispatchEvent(e)}setConfig(e){if(!e.entity||!e.description_entity||!e.description_max_entity){const e=document.querySelector("home-assistant")?.hass?.language||"en",t=s[e]&&s[e].error_missing_sensors||s.en.error_missing_sensors;throw new Error(t)}this.config=e}static getStubConfig(){return{name:"Roślina",entity:"",description_entity:"",description_max_entity:""}}}),window.customCards=window.customCards||[],window.customCards.push({type:"mk-plant-card",name:"MK Plant Card",description:s[document.querySelector("home-assistant")?.hass?.language||"en"]?.card_description||s.en.card_description,preview:!0}),window.customCards.push({type:"mk-plant-alert-chip",name:"MK Plant Alert Chip",description:s[document.querySelector("home-assistant")?.hass?.language||"en"]?.chip_description||s.en.chip_description,preview:!0});
