import { LitElement, html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

class MkPlantCardEditor extends LitElement {
  static get properties() {
    return { hass: {}, _config: {} };
  }

  setConfig(config) {
    this._config = config;
  }

  _schemaPrimary() {
    return [
        { name: "plant_name", label: "Nazwa rośliny", selector: { text: {} } },
        { name: "sun_exposure", label: "Nasłonecznienie",
            selector:{
                select: {
                    options: [
                        { value: "🌑", label: "Cień" },
                        { value: "⛅", label: "Półcień" },
                        { value: "☀️", label: "Pełne słońce" }
                    ]
                }
            }
        },
    ];
  }

  _schemaImage() {
    return [{ 
      name: "image", 
      label: "URL zdjęcia", 
      selector: { text: {} },
      helper: "np. /local/images/plants/zdjecie.jpg" 
    }];
  }

  _schemaSensors() {
    return [
        { name: "battery_sensor", label: "Sensor baterii", selector: { entity: { domain: "sensor" } } },
        { name: "moisture_sensor", label: "Wilgotność ziemi", selector: { entity: { domain: "sensor" } } },
        { name: "temp_sensor", label: "Temperatura", selector: { entity: { domain: "sensor" } } },
        { name: "humidity_sensor", label: "Wilgotność powietrza", selector: { entity: { domain: "sensor" } } },
    ];
  }

  _schemaPowerPlant() {
    return [
      { name: "min_moisture", label: "Min. Wilgotność ziemi", selector: { entity: { domain: "number" } } },
      { name: "max_moisture", label: "Max. Wilgotność ziemi", selector: { entity: { domain: "number" } } },
      { name: "min_temp", label: "Min. Temperatura", selector: { entity: { domain: "number" } } },
      { name: "max_temp", label: "Max. Temperatura", selector: { entity: { domain: "number" } } },
      { name: "min_humidity", label: "Min. Wilgotność powietrza", selector: { entity: { domain: "number" } } },
      { name: "max_humidity", label: "Max. Wilgotność powietrza", selector: { entity: { domain: "number" } } },
    ];
  }

  _schemaHelpers() {
    return [
      { name: "description_sensor", label: "Sensor opisu (atrybut: instrukcja)", selector: { entity: { domain: "sensor" } } },
      { name: "fertilize_helper", label: "Pomocnik daty nawożenia", selector: { entity: { domain: "input_datetime" } } },
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

        <p style="font-weight: bold; color: var(--primary-color); margin: 15px 0 8px 0;">Sensory rośliny</p>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaSensors()}
          .computeLabel=${(s) => s.label}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <hr style="border: 0; border-top: 1px solid var(--divider-color); margin: 20px 0;">
        <p style="font-weight: bold; color: var(--primary-color); margin-bottom: 8px;">Sensory Power Plant</p>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schemaPowerPlant()}
          .computeLabel=${(s) => s.label}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <hr style="border: 0; border-top: 1px solid var(--divider-color); margin: 20px 0;">
        <p style="font-weight: bold; color: var(--primary-color); margin-bottom: 8px;">Pomocnicy</p>
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