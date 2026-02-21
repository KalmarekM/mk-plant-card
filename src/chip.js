import { LitElement, html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";
import { cardStyles } from './styles.js';
import { translations } from './translations.js';
import './chip-editor.js';

export class MkPlantAlertChip extends LitElement {
  static get properties() {
    return { hass: {}, config: {} };
  }

  static getConfigElement() {
    return document.createElement("mk-plant-alert-chip-editor");
  }

  static getStubConfig() {
    return {
      name: "Roślina",
      entity: "",
      description_entity: "",
      description_max_entity: ""
    };
  }
    t(key) {
        const lang = this.hass.language || 'en';
        return (translations[lang] && translations[lang][key]) || (translations['en'][key]) || key;
  }

  render() {
    const { config, hass } = this;
    const state = hass.states[config.entity];
    const descMinState = hass.states[config.description_entity];
    const descMaxState = hass.states[config.description_max_entity];

    if (!state || !descMinState || !descMaxState) {
      return html`<div style="color: orange; font-size: 10px; border: 1px dashed orange; padding: 4px;">
          ${config.name}: ${this.t('waiting_for_data')}
      </div>`;
    }

    const currentV = parseFloat(state.state);
    const minV = parseFloat(descMinState.state);
    const maxV = parseFloat(descMaxState.state);

    let isAlert = false;
    let iconColor = "#ff4444";
    let glowColor = "rgba(255, 68, 68, 0.5)";

    if (currentV < minV) {
      isAlert = true;
      iconColor = "#ff4444";
    } else if (currentV > maxV) {
      isAlert = true;
      iconColor = "#44b4ff";
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
      throw new Error(this.t("configure_all_sensors"));
    }
    this.config = config;
  }
}
customElements.define("mk-plant-alert-chip", MkPlantAlertChip);
