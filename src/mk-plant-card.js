import { LitElement, html} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";
import './editor.js';
import { cardStyles } from './styles.js';
import { translations } from './translations.js';

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

  /* Funkcja pomocnicza do pobierania tłumaczeń */
  t(key) {
    const lang = this.hass.language || 'en';
    return (translations[lang] && translations[lang][key]) || (translations['en'][key]) || key;
  }

  static getConfigElement() {
    return document.createElement("mk-plant-card-editor");
  }

  setConfig(config) {
    if (!config.plant_name) {
      throw new Error("Musisz zdefiniować nazwę rośliny (plant_name)!");
    }
    this.config =  {
      sun_exposure: "🌑",
      image: "",
      ...config
    }
  }

  /* Pobieranie stanu encji - zwraca stan lub kreskę, jeśli encja nie istnieje */
  _getState(entity) {
    return this.hass.states[entity] ? this.hass.states[entity].state : '—';
  }

render() {
    const { config, hass } = this;

    /* Pobieranie wartości z sensorów */
    const battery = this._getState(config.battery_sensor);
    const moisture = parseFloat(this._getState(config.moisture_sensor));
    const temp = parseFloat(this._getState(config.temp_sensor));
    const humidity = parseFloat(this._getState(config.humidity_sensor));

    /* Pobieranie wartości progowych (zakresów) */
    const minM = parseFloat(this._getState(config.min_moisture));
    const maxM = parseFloat(this._getState(config.max_moisture));
    const minT = parseFloat(this._getState(config.min_temp));
    const maxT = parseFloat(this._getState(config.max_temp));
    const minH = parseFloat(this._getState(config.min_humidity));
    const maxH = parseFloat(this._getState(config.max_humidity));

    /* Logika kolorów i ikon dla parametrów */
    const mColor = moisture < minM ? "blue" : (moisture > maxM ? "red" : "green");
    const mIcon = (moisture < minM || moisture > maxM) ? "mdi:water-alert" : "mdi:water";
    const tIcon = temp < minT ? "mdi:thermometer-low" : (temp > maxT ? "mdi:thermometer-high" : "mdi:thermometer");
    const tColor = (temp < minT || temp > maxT) ? "red" : "green";
    const hColor = (humidity < minH || humidity > maxH) ? "red" : "green";
    const hIcon = (humidity < minH || humidity > maxH) ? "mdi:water-percent-alert" : "mdi:water-percent";

    const sunIcon = config.sun_exposure || "🌑";

    return html`
      <ha-card>
      <!-- Nagłówek z nazwą rośliny, ikoną słońca i poziomem baterii -->
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
        
          <!-- Kolumna z obrazkiem rośliny, kliknięcie otwiera więcej informacji o wilgotności -->
          <div class="image-col" @click="${() => this._handleMoreInfo(config.moisture_sensor)}">
            <img src="${config.image}">
          </div>

          <!-- Parametry rośliny: wilgotność, temperatura, wilgotność powietrza -->
          <div class="data-col">

            <!-- Sekcja z instrukcją pielęgnacji, widoczna po kliknięciu ikony informacji -->
            ${this._showDetails ? html`
              <div class="details-section">
                <hr>
                <ha-markdown
                  .content=${hass.states[config.description_sensor]?.attributes.instrukcja || this.t('no_description')}>
                </ha-markdown>
              </div>
              ` : ''
            }
            
            <!-- Parametr wilgotności ziemi -->
            <div class="param-row">
              <ha-icon icon="${mIcon}" style="color: ${mColor}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t('soil_moisture')}</span>
                <span class="p-state">${moisture} %</span>
              </div>
              <div class="range">${this.t('range')}: ${minM} - ${maxM}%</div>
            </div>
            
            <!-- Parametr temperatury -->
            <div class="param-row">
              <ha-icon icon="${tIcon}" style="color: ${tColor}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t('temperature')}</span>
                <span class="p-state">${temp} °C</span>
              </div>
              <div class="range">${this.t('range')}: ${minT} - ${maxT}°C</div>
            </div>

            <!-- Parametr wilgotności powietrza -->
            <div class="param-row">
              <ha-icon icon="${hIcon}" style="color: ${hColor}"></ha-icon>
              <div class="param-text">
                <span class="p-name">${this.t('air_humidity')}</span>
                <span class="p-state">${humidity} %</span>
              </div>
              <div class="range">${this.t('range')}: ${minH} - ${maxH}%</div>
            </div>

            <!-- Przycisk do zapisywania daty nawożenia -->
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

  /* Przełączanie widoczności sekcji szczegółów */
  _toggleDetails() {
    this._showDetails = !this._showDetails;
  }

  /* Otwieranie standardowego okna dialogowego "więcej informacji" Home Assistant */
  _handleMoreInfo(entityId) {
    const e = new Event("hass-more-info", { bubbles: true, composed: true });
    e.detail = { entityId };
    this.dispatchEvent(e);
  }

  /* Obsługa zapisywania daty nawożenia do pomocnika input_datetime */
  _callScript(helperEntity) {
    if (!helperEntity) {
      alert(this.t('error_helper'));
      return;
    }
    if (confirm(this.t('confirm_fertilize'))) {
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

/* Rejestracja w HA dla listy wyboru kart */
window.customCards = window.customCards || [];
window.customCards.push({
  type: "mk-plant-card",
  name: "MK Plant Card",
  description: translations[document.querySelector('home-assistant')?.hass?.language || 'en']?.card_description || translations['en'].card_description,
  preview: true
});