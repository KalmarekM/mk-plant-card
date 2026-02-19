import { LitElement, html} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";
import './editor.js';
import { cardStyles } from './styles.js';

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

  static getConfigElement() {
    return document.createElement("mk-plant-card-editor");
  }

  setConfig(config) {
    this.config =  {
      sun_exposure: "🌑"
    }
    if (!config.plant_name) {
      throw new Error("Musisz zdefiniować 'plant_name'");
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
    const temp = parseFloat(this._getState(config.temp_sensor));
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
            <div class="param-row">
              <ha-icon icon="${mIcon}" style="color: ${mColor}"></ha-icon>
              <div class="param-text">
                <span class="p-name">Wilgotność ziemi</span>
                <span class="p-state">${moisture} %</span>
              </div>
              <div class="range">### ${minM}-${maxM}%</div>
            </div>

            <div class="param-row">
              <ha-icon icon="${tIcon}" style="color: ${tColor}"></ha-icon>
              <div class="param-text">
                <span class="p-name">Temperatura</span>
                <span class="p-state">${temp} °C</span>
              </div>
              <div class="range">### ${minT}-${maxT}°C</div>
            </div>

            <div class="param-row">
              <ha-icon icon="${hIcon}" style="color: ${hColor}"></ha-icon>
              <div class="param-text">
                <span class="p-name">Wilgotność powietrza</span>
                <span class="p-state">${humidity} %</span>
              </div>
              <div class="range">### ${minH}-${maxH}%</div>
            </div>

            <div class="fertilize-btn" style="margin-top: 10px;" @click="${() => this._callScript(config.fertilize_helper)}">
              <ha-icon icon="mdi:sprinkler-variant"></ha-icon>
              <div class="btn-text">
                <span class="btn-primary">Zapisz nawożenie</span>
                <span class="btn-secondary">Ostatnio: ${this._getState(config.fertilize_helper)}</span>
              </div>
            </div>
          </div>
        </div>

        ${this._showDetails ? html`
          <div class="details-section">
            <hr>
            <ha-markdown
              .content=${hass.states[config.description_sensor]?.attributes.instrukcja || 'Brak opisu'}>
            </ha-markdown>
          </div>
        ` : ''}
      </ha-card>
    `;
  }

  _toggleDetails() {
    this._showDetails = !this._showDetails;
  }

  _handleMoreInfo(entityId) {
    const e = new Event("hass-more-info", { bubbles: true, composed: true });
    e.detail = { entityId };
    this.dispatchEvent(e);
  }

  _callScript(helperEntity) {
    if (!helperEntity) {
      alert("Błąd: Nie skonfigurowano pomocnika daty nawożenia!");
      return;
    }
    if (confirm("Czy na pewno chcesz zapisać dzisiejszą datę nawożenia?")) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      this.hass.callService("input_datetime", "set_datetime", {
        entity_id: helperEntity,
        date: `${year}-${month}-${day}`
      });
    }
  }
  
  static get styles() {
    return cardStyles;
  }
}

customElements.define("mk-plant-card", MkPlantCard);

// Rejestracja w HA dla listy wyboru kart
window.customCards = window.customCards || [];
window.customCards.push({
  type: "mk-plant-card",
  name: "MK Plant Card",
  description: "Karta rośliny z dziennikiem nawożenia",
  preview: true
});