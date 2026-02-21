import { LitElement, html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";
import { cardStyles } from './styles.js';
import { translations } from './translations.js';

class MkPlantCardEditor extends LitElement {
  static get properties() {
    return { hass: {}, _config: {} };
  }

  t(key) {
    // Sprawdzamy, czy this.hass w ogóle istnieje
    const lang = (this.hass && this.hass.language) ? this.hass.language : 'en';
    return (translations[lang] && translations[lang][key]) || (translations['en'][key]) || key;
  }

  setConfig(config) {
    this._config = config;
  }

  _schemaPrimary() {
    return [
      { name: "plant_name", label: this.t('plant_name'), selector: { text: {} } },
      {
        name: "sun_exposure", label: this.t('sun_exposure'),
        selector: {
          select: {
            options: [
              { value: "🌑", label: this.t('shade') },
              { value: "⛅", label: this.t('partial_shade') },
              { value: "☀️", label: this.t('full_sun') }
            ]
          }
        }
      },
    ];
  }

  _schemaImage() {
    return [{
      name: "image",
      label: this.t('image_url'),
      selector: { text: {} },
      helper: this.t('image_helper')
    }];
  }

  _schemaSensors() {
    return [
      { name: "battery_sensor", label: this.t('battery_sensor'), selector: { entity: { domain: "sensor" } } },
      { name: "moisture_sensor", label: this.t('soil_moisture'), selector: { entity: { domain: "sensor" } } },
      { name: "temperature_sensor", label: this.t('temperature'), selector: { entity: { domain: "sensor" } } },
      { name: "humidity_sensor", label: this.t('air_humidity'), selector: { entity: { domain: "sensor" } } },
    ];
  }

  _schemaPowerPlant() {
    const min = this.t('min_prefix');
    const max = this.t('max_prefix');
    return [
      { name: "min_moisture", label: `${min} ${this.t('soil_moisture')}`, selector: { entity: { domain: "number" } } },
      { name: "max_moisture", label: `${max} ${this.t('soil_moisture')}`, selector: { entity: { domain: "number" } } },
      { name: "min_temp", label: `${min} ${this.t('temperature')}`, selector: { entity: { domain: "number" } } },
      { name: "max_temp", label: `${max} ${this.t('temperature')}`, selector: { entity: { domain: "number" } } },
      { name: "min_humidity", label: `${min} ${this.t('air_humidity')}`, selector: { entity: { domain: "number" } } },
      { name: "max_humidity", label: `${max} ${this.t('air_humidity')}`, selector: { entity: { domain: "number" } } },
    ];
  }

  _schemaHelpers() {
    return [
      { name: "description_sensor", label: this.t('desc_sensor'), selector: { entity: { domain: "sensor" } } },
      { name: "fertilize_helper", label: this.t('fert_helper'), selector: { entity: { domain: "input_datetime" } } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;

    return html`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaPrimary()}
          .computeLabel=${(s) => s.label}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaImage()}
          .computeLabel=${(s) => s.label}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <p style="font-weight: bold; color: var(--primary-color); margin: 15px 0 8px 0;">${this.t('section_sensors')}</p>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaSensors()}
          .computeLabel=${(s) => s.label}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <hr style="border: 0; border-top: 1px solid var(--divider-color); margin: 20px 0;">
        <p style="font-weight: bold; color: var(--primary-color); margin-bottom: 8px;">${this.t('section_power')}</p>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaPowerPlant()}
          .computeLabel=${(s) => s.label}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <hr style="border: 0; border-top: 1px solid var(--divider-color); margin: 20px 0;">
        <p style="font-weight: bold; color: var(--primary-color); margin-bottom: 8px;">${this.t('section_helpers')}</p>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaHelpers()}
          .computeLabel=${(s) => s.label}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
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
customElements.define("mk-plant-card-editor", MkPlantCardEditor);
