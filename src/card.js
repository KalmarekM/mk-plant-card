import { LitElement, html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";
import { cardStyles } from './styles.js';
import { translations } from './translations.js';
import './card-editor.js';

/* --- GŁÓWNA KARTA ROŚLINY --- */
class MkPlantCard extends LitElement {

  constructor() {
    super();
    this._showDetails = false;
  }

  static get properties() {
    return {
      hass: {},
      config: {},
      _showDetails: { type: Boolean }
    };
  }

  static getConfigElement() {
    return document.createElement("mk-plant-card-editor");
  }


  t(key) {
    // Sprawdzamy, czy this.hass w ogóle istnieje
    const lang = (this.hass && this.hass.language) ? this.hass.language : 'en';
    return (translations[lang] && translations[lang][key]) || (translations['en'][key]) || key;
  }


  setConfig(config) {
    if (!config.plant_name) {
      // Pobieramy język z głównego obiektu Home Assistant lub domyślnie 'en'
      const lang = document.querySelector('home-assistant')?.hass?.language || 'en';

      // Pobieramy tłumaczenie z pliku translations.js
      const errorMsg = (translations[lang] && translations[lang]['error_missing_name']) ||
        (translations['en']['error_missing_name']);

      throw new Error(errorMsg);
    }
    this.config = config;
  }

  _getState(entity) {
    return this.hass.states[entity] ? this.hass.states[entity].state : '—';
  }

  render() {
    const { config, hass } = this;
    if (!hass || !config) {
      return html``;
    }
    const battery = this._getState(config.battery_sensor);
    const moisture = parseFloat(this._getState(config.moisture_sensor));
    const temp = parseFloat(this._getState(config.temperature_sensor));
    const humidity = parseFloat(this._getState(config.humidity_sensor));

    const minM = parseFloat(this._getState(config.min_moisture));
    const maxM = parseFloat(this._getState(config.max_moisture));
    const minT = parseFloat(this._getState(config.min_temp));
    const maxT = parseFloat(this._getState(config.max_temp));
    const minH = parseFloat(this._getState(config.min_humidity));
    const maxH = parseFloat(this._getState(config.max_humidity));

    const mColor = moisture < minM ? "red" : (moisture > maxM ? "blue" : "green");
    const mIcon = (moisture < minM || moisture > maxM) ? "mdi:water-alert" : "mdi:water";
    const tColor = (temp < minT ? "blue" : (temp > maxT ? "red" : "green"));
    const tIcon = temp < minT ? "mdi:thermometer-low" : (temp > maxT ? "mdi:thermometer-high" : "mdi:thermometer");
    const hColor = (humidity < minH || humidity > maxH) ? "red" : "green";
    const hIcon = (humidity < minH || humidity > maxH) ? "mdi:water-percent-alert" : "mdi:water-percent";

    const sunIcon = config.sun_exposure || "🌑";

    return html`
      <ha-card>
        <div class="header">
          <div class="title">${sunIcon} ${config.plant_name} (🔋 ${battery}%)</div>
          
          <div class="header-icons">
            <ha-icon 
              icon="mdi:arrow-up-circle-outline" 
              class="scroll-top-icon"
              @click="${() => this._scrollToTop()}">
            </ha-icon>
            
            <ha-icon 
              icon="${this._showDetails ? 'mdi:information' : 'mdi:information-outline'}" 
              class="info-icon"
              style="color: ${this._showDetails ? 'green' : 'grey'}"
              @click="${() => this._toggleDetails()}">
            </ha-icon>        
          </div>
        </div>
        
        <div class="main-container">
          <div class="image-col" @click="${() => this._handleMoreInfo(config.moisture_sensor)}">
            <img src="${config.image}">
          </div>

          <div class="data-col">
            
            ${this._showDetails ? html`
              <div class="details-section">
                <hr>
                <ha-markdown
                  .content=${hass.states[config.description_sensor]?.attributes.instrukcja || this.t('no_description')}>
                </ha-markdown>
              </div>
              ` : ''
            }
            
            <div class="param-row">
              <ha-icon icon="${mIcon}" style="color: ${mColor}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t('soil_moisture')}</span>
                <span class="p-state">${moisture} %</span>
              </div>
              <div class="range">${this.t('range')}: ${minM} - ${maxM}%</div>
            </div>
            
            <div class="param-row">
              <ha-icon icon="${tIcon}" style="color: ${tColor}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t('temperature')}</span>
                <span class="p-state">${temp} °C</span>
              </div>
              <div class="range">${this.t('range')}: ${minT} - ${maxT}°C</div>
            </div>

            <div class="param-row">
              <ha-icon icon="${hIcon}" style="color: ${hColor}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t('air_humidity')}</span>
                <span class="p-state">${humidity} %</span>
              </div>
              <div class="range">${this.t('range')}: ${minH} - ${maxH}%</div>
            </div>

            <div class="fertilize-btn" style="margin-top: 10px;" @click="${() => this._callScript(config.fertilize_helper)}">
              <ha-icon icon="mdi:sprinkler-variant"></ha-icon>
              <div class="btn-text">
                <span class="btn-primary">${this.t('save_fertilize')}</span>
                <span class="btn-secondary">${this.t('last_time')}: ${this._getState(config.fertilize_helper)}</span>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  _toggleDetails() { this._showDetails = !this._showDetails; }
  
  _scrollToTop() {
    // Przewijamy do samego początku strony głównej Home Assistant
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  _handleMoreInfo(entityId) {
    const e = new Event("hass-more-info", { bubbles: true, composed: true });
    e.detail = { entityId };
    this.dispatchEvent(e);
  }

  _callScript(helperEntity) {
    if (!helperEntity) {
      alert(this.t('error_helper'));
      return;
    }
    if (confirm(this.t('confirm_fertilize'))) {
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      this.hass.callService("input_datetime", "set_datetime", {
        entity_id: helperEntity,
        date: dateStr
      });
    }
  }

  static get styles() { return cardStyles; }
}
customElements.define("mk-plant-card", MkPlantCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "mk-plant-card",
  name: "MK Plant Card",
  description: translations[document.querySelector('home-assistant')?.hass?.language || 'en']?.card_description || translations['en'].card_description,
  preview: true
});

