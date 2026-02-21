import { LitElement, html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";
import './editor.js';
import { cardStyles } from './styles.js';
import { translations } from './translations.js';

/* --- GŁÓWNA KARTA ROŚLINY --- */
class MkPlantCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
      _showDetails: { type: Boolean }
    };
  }
  
  constructor() {
    super();
    this._showDetails = false;
  }

  t(key) {
    const lang = this.hass.language || 'en';
    return (translations[lang] && translations[lang][key]) || (translations['en'][key]) || key;
  }

  static getConfigElement() {
    return document.createElement("mk-plant-card-editor");
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

    const battery = this._getState(config.battery_sensor);
    const moisture = parseFloat(this._getState(config.moisture_sensor));
    const temp = parseFloat(this._getState(config.temperature_sensor)); // Poprawione z temp_sensor
    const humidity = parseFloat(this._getState(config.humidity_sensor));

    const minM = parseFloat(this._getState(config.min_moisture));
    const maxM = parseFloat(this._getState(config.max_moisture));
    const minT = parseFloat(this._getState(config.min_temp));
    const maxT = parseFloat(this._getState(config.max_temp));
    const minH = parseFloat(this._getState(config.min_humidity));
    const maxH = parseFloat(this._getState(config.max_humidity));

    const mColor = moisture < minM ? "blue" : (moisture > maxM ? "red" : "green");
    const mIcon = (moisture < minM || moisture > maxM) ? "mdi:water-alert" : "mdi:water";
    const tIcon = temp < minT ? "mdi:thermometer-low" : (temp > maxT ? "mdi:thermometer-high" : "mdi:thermometer");
    const tColor = (temp < minT || temp > maxT) ? "red" : "green";
    const hColor = (humidity < minH || humidity > maxH) ? "red" : "green";
    const hIcon = (humidity < minH || humidity > maxH) ? "mdi:water-percent-alert" : "mdi:water-percent";

    const sunIcon = config.sun_exposure || "🌑";

    return html`
      <ha-card>
        <div class="header">
          <div class="title">${sunIcon} ${config.plant_name} (🔋 ${battery}%)</div>
          <ha-icon 
            icon="${this._showDetails ? 'mdi:information' : 'mdi:information-outline'}" 
            class="info-icon"
            style="color: ${this._showDetails ? 'green' : 'grey'}"
            @click="${() => this._toggleDetails()}">
          </ha-icon>        
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

/* --- NOWA KARTA ALARMOWA (CHIP) --- */
class MkPlantAlertChip extends LitElement {
  static get properties() {
    return { hass: {}, config: {} };
  }

  static getConfigElement() {
    return document.createElement("mk-plant-alert-chip-editor");
  }

render() {
    const { config, hass } = this;
    const state = hass.states[config.entity];
    // Upewnij się, że używasz config.description_entity
    const descMinState = hass.states[config.description_entity];
    const descMaxState = hass.states[config.description_max_entity];

    // Jeśli sensorów nie ma, zwracamy pusty html zamiast błędu (dzięki temu edytor nie "wybucha")
    if (!state || !descMinState || !descMaxState) {
        return html`<div style="color: orange; font-size: 10px;">Oczekiwanie na dane...</div>`;
    }
    // ... reszta kodu
    const currentV = parseFloat(state.state);
    const minV = parseFloat(descMinState.attributes.min);
    const maxV = parseFloat(descMaxState.attributes.max);

    let isAlert = false;
    let iconColor = "#ff4444";
    let glowColor = "rgba(255, 68, 68, 0.5)";

    if (currentV < minV) {
      isAlert = true;
      iconColor = "#ff4444"; // Czerwony - sucho
      glowColor = "rgba(255, 68, 68, 0.5)";
    } else if (currentV > maxV) {
      isAlert = true;
      iconColor = "#44b4ff"; // Niebieski - mokro
      glowColor = "rgba(68, 180, 255, 0.5)";
    }

    if (!isAlert) return html``;

    return html`
      <style>
        :host { display: inline-block; margin-right: 8px; }
        .chip {
          display: flex; align-items: center;
          background: var(--card-background-color, #1c1c1c);
          border: 1px solid ${iconColor}; border-radius: 16px;
          padding: 4px 10px; cursor: pointer;
          animation: pulse 2s infinite;
        }
        ha-icon { color: ${iconColor}; --mdc-icon-size: 18px; margin-right: 4px; }
        span { font-size: 12px; font-weight: bold; color: var(--primary-text-color); }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 ${glowColor}; }
          70% { box-shadow: 0 0 0 8px rgba(0, 0, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
        }
      </style>
      <div class="chip" @click="${() => this._handleMoreInfo()}">
        <ha-icon icon="mdi:water-alert"></ha-icon>
        <span>${config.name || state.attributes.friendly_name}</span>
      </div>
    `;
  }

  _handleMoreInfo() {
    const e = new Event("hass-more-info", { bubbles: true, composed: true });
    e.detail = { entityId: this.config.entity };
    this.dispatchEvent(e);
  }

  setConfig(config) {
    if (!config.entity || !config.description_entity || !config.description_max_entity) {
      const lang = document.querySelector('home-assistant')?.hass?.language || 'en';
      const errorMsg = (translations[lang] && translations[lang]['error_missing_sensors']) || 
                     (translations['en']['error_missing_sensors']);
      throw new Error(errorMsg);
    }
    this.config = config;
  }

  static getStubConfig() {
    return {
      name: "Roślina",
      entity: "",
      description_entity: "",
      description_max_entity: ""
    };
  }  
}

customElements.define("mk-plant-alert-chip", MkPlantAlertChip);

/* --- REJESTRACJA KART W SYSTEMIE --- */
window.customCards = window.customCards || [];
window.customCards.push({
  type: "mk-plant-card",
  name: "MK Plant Card",
  description: translations[document.querySelector('home-assistant')?.hass?.language || 'en']?.card_description || translations['en'].card_description,
  preview: true
});

window.customCards.push({
  type: "mk-plant-alert-chip",
  name: "MK Plant Alert Chip",
  description: translations[document.querySelector('home-assistant')?.hass?.language || 'en']?.chip_description || translations['en'].chip_description,
  preview: true
});