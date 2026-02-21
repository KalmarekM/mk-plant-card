import { LitElement, html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";
import { cardStyles } from './styles.js';
import { translations } from './translations.js';

export class MkPlantAlertChipEditor extends LitElement {
  static get properties() {
    return { hass: {}, _config: {} };
  }

  t(key) {
    const lang = this.hass.language || 'en';
    return (translations[lang] && translations[lang][key]) || (translations['en'][key]) || key;
  }

  setConfig(config) {
    this._config = config;
  }

  _schema() {
    return [
      { name: "name", label: this.t('chip_label_name'), selector: { text: {} } },
      { name: "entity", label: this.t('chip_label_moisture'), selector: { entity: { domain: "sensor" } } },
      { name: "description_entity", label: this.t('chip_label_desc_min'), selector: { entity: { domain: "number" } } },
      { name: "description_max_entity", label: this.t('chip_label_desc_max'), selector: { entity: { domain: "number" } } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${(s) => s.label}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  _valueChanged(ev) {
    const event = new CustomEvent("config-changed", {
      detail: { config: ev.detail.value },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

customElements.define("mk-plant-alert-chip-editor", MkPlantAlertChipEditor);