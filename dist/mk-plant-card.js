import{LitElement as e,html as t,css as i}from"https://unpkg.com/lit-element@2.4.0/lit-element.js?module";const a={pl:{soil_moisture:"Wilgotność ziemi",temperature:"Temperatura",air_humidity:"Wilgotność powietrza",range:"Zakres",save_fertilize:"Zapisz nawożenie",last_time:"Ostatnio",no_description:"Brak opisu",confirm_fertilize:"Czy na pewno chcesz zapisać dzisiejszą datę nawożenia?",error_helper:"Błąd: Nie skonfigurowano pomocnika daty nawożenia!",card_description:"Karta rośliny z dziennikiem nawożenia",plant_name:"Nazwa rośliny",sun_exposure:"Nasłonecznienie",shade:"Cień",partial_shade:"Półcień",full_sun:"Pełne słońce",image_url:"URL zdjęcia",image_helper:"np. /local/images/plants/zdjecie.jpg",battery_sensor:"Sensor baterii",soil_moisture:"Wilgotność ziemi",temp:"Temperatura",air_hum:"Wilgotność powietrza",min_prefix:"Min.",max_prefix:"Max.",section_sensors:"Sensory rośliny",section_power:"Sensory Power Plant",section_helpers:"Pomocnicy",desc_sensor:"Sensor opisu (atrybut: instrukcja)",fert_helper:"Pomocnik daty nawożenia"},en:{plant_name:"Plant name",sun_exposure:"Sun exposure",shade:"Shade",partial_shade:"Partial shade",full_sun:"Full sun",image_url:"Image URL",image_helper:"e.g., /local/images/plants/photo.jpg",battery_sensor:"Battery sensor",soil_moisture:"Soil moisture",temp:"Temperature",air_hum:"Air humidity",min_prefix:"Min.",max_prefix:"Max.",section_sensors:"Plant sensors",section_power:"Power Plant sensors",section_helpers:"Helpers",desc_sensor:"Description sensor (attr: instruction)",fert_helper:"Fertilization date helper",soil_moisture:"Soil moisture",temperature:"Temperature",air_humidity:"Air humidity",range:"Range",save_fertilize:"Save fertilization",last_time:"Last time",no_description:"No description",confirm_fertilize:"Are you sure you want to save today's fertilization date?",error_helper:"Error: Fertilization helper not configured!",card_description:"Plant card with fertilization log"}};customElements.define("mk-plant-card-editor",class extends e{static get properties(){return{hass:{},_config:{}}}t(e){const t=this.hass.language||"en";return a[t]&&a[t][e]||a.en[e]||e}setConfig(e){this._config=e}_schemaPrimary(){return[{name:"plant_name",label:this.t("plant_name"),selector:{text:{}}},{name:"sun_exposure",label:this.t("sun_exposure"),selector:{select:{options:[{value:"🌑",label:this.t("shade")},{value:"⛅",label:this.t("partial_shade")},{value:"☀️",label:this.t("full_sun")}]}}}]}_schemaImage(){return[{name:"image",label:this.t("image_url"),selector:{text:{}},helper:this.t("image_helper")}]}_schemaSensors(){const e=this.t("soil_moisture"),t=this.t("temp"),i=this.t("air_hum");return[{name:"battery_sensor",label:this.t("battery_sensor"),selector:{entity:{domain:"sensor"}}},{name:"moisture_sensor",label:e,selector:{entity:{domain:"sensor"}}},{name:"temp_sensor",label:t,selector:{entity:{domain:"sensor"}}},{name:"humidity_sensor",label:i,selector:{entity:{domain:"sensor"}}}]}_schemaPowerPlant(){const e=this.t("min_prefix"),t=this.t("max_prefix");return[{name:"min_moisture",label:`${e} ${this.t("soil_moisture")}`,selector:{entity:{domain:"number"}}},{name:"max_moisture",label:`${t} ${this.t("soil_moisture")}`,selector:{entity:{domain:"number"}}},{name:"min_temp",label:`${e} ${this.t("temp")}`,selector:{entity:{domain:"number"}}},{name:"max_temp",label:`${t} ${this.t("temp")}`,selector:{entity:{domain:"number"}}},{name:"min_humidity",label:`${e} ${this.t("air_hum")}`,selector:{entity:{domain:"number"}}},{name:"max_humidity",label:`${t} ${this.t("air_hum")}`,selector:{entity:{domain:"number"}}}]}_schemaHelpers(){return[{name:"description_sensor",label:this.t("desc_sensor"),selector:{entity:{domain:"sensor"}}},{name:"fertilize_helper",label:this.t("fert_helper"),selector:{entity:{domain:"input_datetime"}}}]}render(){return this.hass&&this._config?t`
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
    `:t``}_valueChanged(e){const t=new CustomEvent("config-changed",{detail:{config:e.detail.value},bubbles:!0,composed:!0});this.dispatchEvent(t)}});const s=i`
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
`;customElements.define("mk-plant-card",class extends e{static get properties(){return{hass:{},config:{},_showDetails:{type:Boolean}}}constructor(){super(),this._showDetails=!1}t(e){const t=this.hass.language||"en";return a[t]&&a[t][e]||a.en[e]||e}static getConfigElement(){return document.createElement("mk-plant-card-editor")}setConfig(e){if(!e.plant_name)throw new Error("Musisz zdefiniować nazwę rośliny (plant_name)!");this.config={sun_exposure:"🌑",image:"",...e}}_getState(e){return this.hass.states[e]?this.hass.states[e].state:"—"}render(){const{config:e,hass:i}=this,a=this._getState(e.battery_sensor),s=parseFloat(this._getState(e.moisture_sensor)),r=parseFloat(this._getState(e.temp_sensor)),o=parseFloat(this._getState(e.humidity_sensor)),n=parseFloat(this._getState(e.min_moisture)),l=parseFloat(this._getState(e.max_moisture)),m=parseFloat(this._getState(e.min_temp)),c=parseFloat(this._getState(e.max_temp)),p=parseFloat(this._getState(e.min_humidity)),h=parseFloat(this._getState(e.max_humidity)),d=s<n?"blue":s>l?"red":"green",_=s<n||s>l?"mdi:water-alert":"mdi:water",u=r<m?"mdi:thermometer-low":r>c?"mdi:thermometer-high":"mdi:thermometer",g=r<m||r>c?"red":"green",f=o<p||o>h?"red":"green",y=o<p||o>h?"mdi:water-percent-alert":"mdi:water-percent",b=e.sun_exposure||"🌑";return t`
      <ha-card>
      <!-- Nagłówek z nazwą rośliny, ikoną słońca i poziomem baterii -->
        <div class="header">
          <div class="title">${b} ${e.plant_name} (🔋 ${a}%)</div>
          <ha-icon 
            icon="${this._showDetails?"mdi:information":"mdi:information-outline"}" 
            class="info-icon"
            style="color: ${this._showDetails?"green":"grey"}"
            @click="${()=>this._toggleDetails()}">
          </ha-icon>        
        </div>
        
        <div class="main-container">
        
          <!-- Kolumna z obrazkiem rośliny, kliknięcie otwiera więcej informacji o wilgotności -->
          <div class="image-col" @click="${()=>this._handleMoreInfo(e.moisture_sensor)}">
            <img src="${e.image}">
          </div>

          <!-- Parametry rośliny: wilgotność, temperatura, wilgotność powietrza -->
          <div class="data-col">

            <!-- Sekcja z instrukcją pielęgnacji, widoczna po kliknięciu ikony informacji -->
            ${this._showDetails?t`
              <div class="details-section">
                <hr>
                <ha-markdown
                  .content=${i.states[e.description_sensor]?.attributes.instrukcja||this.t("no_description")}>
                </ha-markdown>
              </div>
              `:""}
            
            <!-- Parametr wilgotności ziemi -->
            <div class="param-row">
              <ha-icon icon="${_}" style="color: ${d}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t("soil_moisture")}</span>
                <span class="p-state">${s} %</span>
              </div>
              <div class="range">${this.t("range")}: ${n} - ${l}%</div>
            </div>
            
            <!-- Parametr temperatury -->
            <div class="param-row">
              <ha-icon icon="${u}" style="color: ${g}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t("temperature")}</span>
                <span class="p-state">${r} °C</span>
              </div>
              <div class="range">${this.t("range")}: ${m} - ${c}°C</div>
            </div>

            <!-- Parametr wilgotności powietrza -->
            <div class="param-row">
              <ha-icon icon="${y}" style="color: ${f}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t("air_humidity")}</span>
                <span class="p-state">${o} %</span>
              </div>
              <div class="range">${this.t("range")}: ${p} - ${h}%</div>
            </div>

            <!-- Przycisk do zapisywania daty nawożenia -->
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
    `}_toggleDetails(){this._showDetails=!this._showDetails}_handleMoreInfo(e){const t=new Event("hass-more-info",{bubbles:!0,composed:!0});t.detail={entityId:e},this.dispatchEvent(t)}_callScript(e){if(e){if(confirm(this.t("confirm_fertilize"))){const t=new Date,i=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");this.hass.callService("input_datetime","set_datetime",{entity_id:e,date:`${i}-${a}-${s}`})}}else alert(this.t("error_helper"))}static get styles(){return s}}),window.customCards=window.customCards||[],window.customCards.push({type:"mk-plant-card",name:"MK Plant Card",description:a[document.querySelector("home-assistant")?.hass?.language||"en"]?.card_description||a.en.card_description,preview:!0});
