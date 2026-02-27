import{css as e,LitElement as t,html as a}from"https://unpkg.com/lit-element@2.4.0/lit-element.js?module";const i=e`
  ha-card { padding: 16px; font-family: 'Roboto', sans-serif; border-radius: 12px; }
  
  /* ---- NAGŁÓWEK ---- */
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }   
  
  .header-icons { display: flex; gap: 12px; align-items: center; }

  /* ---- NAZWA ROŚLINY ---- */
  .title { font-weight: bold; font-size: 18px; }
  
  /* IKONY AKCJI */
  .info-icon, .scroll-top-icon { 
    cursor: pointer; 
    transition: 0.3s; 
    --mdc-icon-size: 24px; 
  }
  
  .scroll-top-icon { color: var(--secondary-text-color); opacity: 0.7; }
  .scroll-top-icon:hover { opacity: 1; color: var(--primary-color); transform: translateY(-2px); }
      
  .main-container { display: flex; gap: 12px; }
  .image-col { flex: 1; cursor: pointer; } 
  .data-col { flex: 2; display: flex; flex-direction: column; gap: 6px; } 
      
  img { width: 100%; height: 100%; border-radius: 10px; object-fit: cover; }
      
  .param-row { display: flex; align-items: center; gap: 10px; background: var(--secondary-background-color); padding: 6px 10px; border-radius: 8px; }
  .param-text { display: flex; flex-direction: column; flex-grow: 1; }
  
  .p-name { font-size: 16px; color: var(--secondary-text-color); }
  .p-state { font-weight: bold; font-size: 19px; }
  .range { font-size: 19px; font-weight: bold; white-space: nowrap; }
      
  .fertilize-btn { margin-top: 12px; display: flex; align-items: center; gap: 12px; padding: 10px; background: var(--primary-color); color: white; border-radius: 8px; cursor: pointer; }
  .btn-text { display: flex; flex-direction: column; }
  .btn-primary { font-weight: bold; font-size: 18px; }
  .btn-secondary { font-size: 15px; opacity: 0.9; }
  
  .details-section { font-size: 16px; line-height: 1.6; color: var(--primary-text-color); }
  .details-section ha-markdown { display: block; font-size: 16px;}
  
  hr { border: 0; border-top: 1px solid var(--divider-color); margin: 10px 0; }
`,s=e`
  :host {
    display: inline-block;
  }
  
  .chip {
    display: flex;
    align-items: center;
    border-radius: 16px;
    padding: 4px 10px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.3s ease; /* Płynne pojawianie się tła i ramki */
    border: 1px solid transparent; /* Domyślnie brak ramki */
  }

  ha-icon {
    --mdc-icon-size: 18px;
    /* Usuwamy margines, jeśli nie ma tekstu (spanu) */
  }

  /* Margines tylko gdy po ikonie następuje span z tekstem */
  ha-icon + span {
    margin-left: 4px;
  }

  span {
    font-size: 12px;
    font-weight: bold;
    color: var(--primary-text-color);
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 var(--glow-color); }
    70% { box-shadow: 0 0 0 8px rgba(0, 0, 0, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
  }
`;e`
  .card-config {
    padding: 4px;
  }
  .preview-section {
    margin-top: 20px;
    border-top: 1px solid var(--divider-color);
    padding-top: 10px;
  }
  .preview-label {
    font-size: 10px;
    color: var(--secondary-text-color);
    margin-bottom: 8px;
    text-transform: uppercase;
  }
`;const r={pl:{section_sensors:"Sensory rośliny",section_power:"Sensory progowe (Power Plant)",section_helpers:"Pomocnicy i opisy",plant_name:"Nazwa rośliny",sun_exposure:"Nasłonecznienie",image_url:"URL zdjęcia",image_helper:"np. /local/images/plants/zdjecie.jpg",battery_sensor:"Sensor baterii",soil_moisture:"Wilgotność ziemi",temperature:"Temperatura",air_humidity:"Wilgotność powietrza",min_prefix:"Min.",max_prefix:"Max.",range:"Zakres",fert_interval:"Interwał nawożenia (tygodnie)",desc_sensor:"Sensor opisu (atrybut: instrukcja)",fert_helper:"Pomocnik daty nawożenia",save_fertilize:"Zapisz nawożenie",last_time:"Ostatnio",no_description:"Brak opisu",confirm_fertilize:"Czy na pewno chcesz zapisać dzisiejszą datę nawożenia?",error_helper:"Błąd: Nie skonfigurowano pomocnika daty nawożenia!",shade:"Cień",partial_shade:"Półcień",full_sun:"Pełne słońce",card_description:"Pełna karta rośliny z instrukcją i nawożeniem",chip_description:"Mały alert (chip) - widoczny tylko gdy roślina wymaga podlewania",error_missing_name:"Błąd: Nazwa rośliny jest wymagana!",error_missing_sensors:"Skonfiguruj wszystkie sensory (Wilgotność, Próg Min, Próg Max)",chip_label_name:"Etykieta (opcjonalnie)",chip_label_moisture:"Sensor wilgotności gleby",chip_label_desc_min:"Sensor progu MIN (atrybut: min)",chip_label_desc_max:"Sensor progu MAX (atrybut: max)",preview_title:"Podgląd (jeśli występuje alarm)",chip_label_show_name:"Zawsze pokazuj nazwę i obszar"},en:{section_sensors:"Plant sensors",section_power:"Threshold sensors",section_helpers:"Helpers and descriptions",plant_name:"Plant name",sun_exposure:"Sun exposure",image_url:"Image URL",image_helper:"e.g., /local/images/plants/photo.jpg",battery_sensor:"Battery sensor",soil_moisture:"Soil moisture",temperature:"Temperature",air_humidity:"Air humidity",min_prefix:"Min.",max_prefix:"Max.",range:"Range",fert_interval:"Fertilization interval (weeks)",desc_sensor:"Description sensor (attr: instruction)",fert_helper:"Fertilization date helper",save_fertilize:"Save fertilization",last_time:"Last time",no_description:"No description",confirm_fertilize:"Are you sure you want to save today's fertilization date?",error_helper:"Error: Fertilization helper not configured!",shade:"Shade",partial_shade:"Partial shade",full_sun:"Full sun",card_description:"Full plant card with instructions and fertilization",chip_description:"Small alert chip - visible only when watering is needed",error_missing_sensors:"Please configure all sensors (Moisture, Min Threshold, Max Threshold)",error_missing_name:"Error: Plant name is required!",chip_label_name:"Label (optional)",chip_label_moisture:"Soil moisture sensor",chip_label_desc_min:"MIN threshold sensor (min attr)",chip_label_desc_max:"MAX threshold sensor (max attr)",preview_title:"Preview (if alert is active)",chip_label_show_name:"Always show name and area"}};customElements.define("mk-plant-card-editor",class extends t{static get properties(){return{hass:{},_config:{}}}t(e){const t=this.hass&&this.hass.language?this.hass.language:"en";return r[t]&&r[t][e]||r.en[e]||e}setConfig(e){this._config=e}_schemaPrimary(){return[{name:"plant_name",label:this.t("plant_name"),selector:{text:{}}},{name:"sun_exposure",label:this.t("sun_exposure"),selector:{select:{options:[{value:"🌑",label:this.t("shade")},{value:"⛅",label:this.t("partial_shade")},{value:"☀️",label:this.t("full_sun")}]}}}]}_schemaImage(){return[{name:"image",label:this.t("image_url"),selector:{text:{}},helper:this.t("image_helper")}]}_schemaSensors(){return[{name:"battery_sensor",label:this.t("battery_sensor"),selector:{entity:{domain:"sensor"}}},{name:"moisture_sensor",label:this.t("soil_moisture"),selector:{entity:{domain:"sensor"}}},{name:"temperature_sensor",label:this.t("temperature"),selector:{entity:{domain:"sensor"}}},{name:"humidity_sensor",label:this.t("air_humidity"),selector:{entity:{domain:"sensor"}}}]}_schemaPowerPlant(){const e=this.t("min_prefix"),t=this.t("max_prefix");return[{name:"min_moisture",label:`${e} ${this.t("soil_moisture")}`,selector:{entity:{domain:"number"}}},{name:"max_moisture",label:`${t} ${this.t("soil_moisture")}`,selector:{entity:{domain:"number"}}},{name:"min_temp",label:`${e} ${this.t("temperature")}`,selector:{entity:{domain:"number"}}},{name:"max_temp",label:`${t} ${this.t("temperature")}`,selector:{entity:{domain:"number"}}},{name:"min_humidity",label:`${e} ${this.t("air_humidity")}`,selector:{entity:{domain:"number"}}},{name:"max_humidity",label:`${t} ${this.t("air_humidity")}`,selector:{entity:{domain:"number"}}}]}_schemaHelpers(){return[{name:"description_sensor",label:this.t("desc_sensor"),selector:{entity:{domain:"sensor"}}},{name:"fertilize_helper",label:this.t("fert_helper"),selector:{entity:{domain:"input_datetime"}}},{name:"fertilize_interval",label:this.t("fert_interval"),selector:{number:{min:1,max:52,mode:"box",unit_of_measurement:"weeks"}}}]}render(){return this.hass&&this._config?a`
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
    `:a``}_valueChanged(e){const t=new CustomEvent("config-changed",{detail:{config:e.detail.value},bubbles:!0,composed:!0});this.dispatchEvent(t)}});customElements.define("mk-plant-card",class extends t{constructor(){super(),this._showDetails=!1}static get properties(){return{hass:{},config:{},_showDetails:{type:Boolean}}}static getConfigElement(){return document.createElement("mk-plant-card-editor")}t(e){const t=this.hass&&this.hass.language?this.hass.language:"en";return r[t]&&r[t][e]||r.en[e]||e}setConfig(e){if(!e.plant_name){const e=document.querySelector("home-assistant")?.hass?.language||"en",t=r[e]&&r[e].error_missing_name||r.en.error_missing_name;throw new Error(t)}this.config=e}_getState(e){return this.hass.states[e]?this.hass.states[e].state:"—"}render(){const{config:e,hass:t}=this;if(!t||!e)return a``;const i=this._getState(e.battery_sensor),s=parseFloat(this._getState(e.moisture_sensor)),r=parseFloat(this._getState(e.temperature_sensor)),n=parseFloat(this._getState(e.humidity_sensor)),o=parseFloat(this._getState(e.min_moisture)),l=parseFloat(this._getState(e.max_moisture)),c=parseFloat(this._getState(e.min_temp)),d=parseFloat(this._getState(e.max_temp)),h=parseFloat(this._getState(e.min_humidity)),m=parseFloat(this._getState(e.max_humidity)),p=s<o?"red":s>l?"blue":"green",_=s<o||s>l?"mdi:water-alert":"mdi:water",u=r<c?"blue":r>d?"red":"green",g=r<c?"mdi:thermometer-low":r>d?"mdi:thermometer-high":"mdi:thermometer",f=n<h||n>m?"red":"green",y=n<h||n>m?"mdi:water-percent-alert":"mdi:water-percent",b=e.sun_exposure||"🌑",w=e.fertilize_helper?t.states[e.fertilize_helper]?.state:null;let x=!1;if(w&&"unknown"!==w&&"unavailable"!==w){const t=new Date(w),a=new Date;Math.floor((a-t)/864e5)>7*(e.fertilize_interval||2)&&(x=!0)}return a`
      <ha-card>
        <div class="header">
          <div class="title">${b} ${e.plant_name} (🔋 ${i}%)</div>
          
          <div class="header-icons">
            <ha-icon 
              icon="mdi:arrow-up-circle-outline" 
              class="scroll-top-icon"
              @click="${()=>this._scrollToTop()}">
            </ha-icon>
            
            <ha-icon 
              icon="${this._showDetails?"mdi:information":"mdi:information-outline"}" 
              class="info-icon"
              style="color: ${this._showDetails?"green":"grey"}"
              @click="${()=>this._toggleDetails()}">
            </ha-icon>        
          </div>
        </div>
        
        <div class="main-container">
          <div class="image-col" @click="${()=>this._handleMoreInfo(e.moisture_sensor)}">
            <img src="${e.image}">
          </div>

          <div class="data-col">
            
            ${this._showDetails?a`
              <div class="details-section">
                <hr>
                <ha-markdown
                  .content=${t.states[e.description_sensor]?.attributes.instrukcja||this.t("no_description")}>
                </ha-markdown>
              </div>
              `:""}
            
            <div class="param-row">
              <ha-icon icon="${_}" style="color: ${p}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t("soil_moisture")}</span>
                <span class="p-state">${s} %</span>
              </div>
              <div class="range">${this.t("range")}: ${o} - ${l}%</div>
            </div>
            
            <div class="param-row">
              <ha-icon icon="${g}" style="color: ${u}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t("temperature")}</span>
                <span class="p-state">${r} °C</span>
              </div>
              <div class="range">${this.t("range")}: ${c} - ${d}°C</div>
            </div>

            <div class="param-row">
              <ha-icon icon="${y}" style="color: ${f}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t("air_humidity")}</span>
                <span class="p-state">${n} %</span>
              </div>
              <div class="range">${this.t("range")}: ${h} - ${m}%</div>
            </div>

            <div class="fertilize-btn" 
                 style="margin-top: 10px; background-color: ${x?"#ff4444":""};" 
                 @click="${()=>this._callScript(e.fertilize_helper)}">
              <ha-icon icon="mdi:sprinkler-variant"></ha-icon>
              <div class="btn-text">
                <span class="btn-primary">${this.t("save_fertilize")}</span>
                <span class="btn-secondary">${this.t("last_time")}: ${this._getState(e.fertilize_helper)}</span>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `}_toggleDetails(){this._showDetails=!this._showDetails}_scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}_handleMoreInfo(e){const t=new Event("hass-more-info",{bubbles:!0,composed:!0});t.detail={entityId:e},this.dispatchEvent(t)}_callScript(e){if(e){if(confirm(this.t("confirm_fertilize"))){const t=new Date,a=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;this.hass.callService("input_datetime","set_datetime",{entity_id:e,date:a})}}else alert(this.t("error_helper"))}static get styles(){return i}}),window.customCards=window.customCards||[],window.customCards.push({type:"mk-plant-card",name:"MK Plant Card",description:r[document.querySelector("home-assistant")?.hass?.language||"en"]?.card_description||r.en.card_description,preview:!0});customElements.define("mk-plant-alert-chip-editor",class extends t{static get properties(){return{hass:{},_config:{}}}t(e){const t=this.hass&&this.hass.language?this.hass.language:"en";return r[t]&&r[t][e]||r.en[e]||e}setConfig(e){this._config=e}_schema(){return[{name:"name",label:this.t("chip_label_name"),selector:{text:{}}},{name:"show_name",label:this.t("chip_label_show_name"),selector:{boolean:{}}},{name:"entity",label:this.t("chip_label_moisture"),selector:{entity:{domain:"sensor"}}},{name:"description_entity",label:this.t("chip_label_desc_min"),selector:{entity:{domain:"number"}}},{name:"description_max_entity",label:this.t("chip_label_desc_max"),selector:{entity:{domain:"number"}}}]}render(){return this.hass&&this._config?a`
            <div class="card-config">
                <ha-form
                    .hass=${this.hass}
                    .data=${this._config}
                    .schema=${this._schema()}
                    .computeLabel=${e=>e.label}
                    @value-changed=${this._valueChanged}
                ></ha-form>
            </div>
        `:a``}_valueChanged(e){const t=new CustomEvent("config-changed",{detail:{config:e.detail.value},bubbles:!0,composed:!0});this.dispatchEvent(t)}});customElements.define("mk-plant-alert-chip",class extends t{static get properties(){return{hass:{},config:{}}}static get styles(){return s}static getConfigElement(){return document.createElement("mk-plant-alert-chip-editor")}t(e){const t=this.hass&&this.hass.language?this.hass.language:"en";return r[t]&&r[t][e]||r.en[e]||e}setConfig(e){if(!e.entity||!e.description_entity||!e.description_max_entity)throw new Error(this.t("configure_all_sensors"));this.config=e}static getStubConfig(){return{name:"Roślina",show_name:!1,entity:"",description_entity:"",description_max_entity:""}}render(){const{config:e,hass:t}=this;if(!t||!e)return a``;const i=e.entity,s=t.states[i],r=t.states[e.description_entity],n=t.states[e.description_max_entity];if(!s||!r||!n)return a`
                <div class="chip" style="border-style: dashed; opacity: 0.5;">
                    <ha-icon icon="mdi:help-circle-outline"></ha-icon>
                </div>`;const o=t.entities?t.entities[i]:null;let l="";if(o&&o.area_id){const e=t.areas[o.area_id];l=e?e.name:""}if(!l&&o&&o.device_id){const e=t.devices?t.devices[o.device_id]:null;if(e&&e.area_id){const a=t.areas[e.area_id];l=a?a.name:""}}const c=parseFloat(s.state),d=parseFloat(r.state),h=parseFloat(n.state);let m=!1,p="var(--secondary-text-color)",_="transparent",u="mdi:leaf";c<d?(m=!0,p="#ff4444",_="rgba(255, 68, 68, 0.5)",u="mdi:water-alert"):c>h&&(m=!0,p="#44b4ff",_="rgba(68, 180, 255, 0.5)",u="mdi:water-percent-alert");const g=m||e.show_name;return a`
            <div class="chip" 
                style="--glow-color: ${_};" 
                @click="${e=>this._handleScrollToCard(e)}">
                <ha-icon icon="${u}" style="color: ${p}"></ha-icon>
                ${g?a`
                    <span>${e.name||s.attributes.friendly_name} ${l?`(${l})`:""}</span>
                `:""}
            </div>
        `}_handleScrollToCard(e){e&&(e.preventDefault(),e.stopPropagation());const t=this.config.entity,a=((e,t)=>{const a=[],i=e=>{e&&(e.tagName&&e.tagName.toLowerCase()===t&&a.push(e),e.children&&Array.from(e.children).forEach(i),e.shadowRoot&&Array.from(e.shadowRoot.children).forEach(i))};return i(e),a})(document.querySelector("home-assistant"),"mk-plant-card").find(e=>e.config&&e.config.moisture_sensor===t);a?(a.scrollIntoView({behavior:"smooth",block:"center"}),a.style.transition="box-shadow 0.5s ease-in-out, transform 0.3s ease",a.style.boxShadow="0 0 30px var(--accent-color)",a.style.transform="scale(1.03)",a.style.zIndex="999",setTimeout(()=>{a.style.boxShadow="none",a.style.transform="scale(1)"},2e3)):(console.warn("Gloria: Nie znalazłam karty dla encji:",t),this._fallbackMoreInfo())}_fallbackMoreInfo(){const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:this.config.entity},this.dispatchEvent(e)}}),window.customCards=window.customCards||[],window.customCards.push({type:"mk-plant-card",name:"MK Plant Card",description:r[document.querySelector("home-assistant")?.hass?.language||"en"]?.card_description||r.en.card_description,preview:!0}),window.customBadges=window.customBadges||[],window.customBadges.push({type:"mk-plant-alert-chip",name:"MK Plant Alert Badge",description:r[document.querySelector("home-assistant")?.hass?.language||"en"]?.chip_description||r.en.chip_description,preview:!0});
