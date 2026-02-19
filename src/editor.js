import { LitElement, html, css } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";
class MkPlantCardEditor extends LitElement {
  static get properties() {
    return { hass: {}, _config: {} };
  }

  setConfig(config) {
    this._config = config;
  }

  // Definicja pól formularza
  _schema() {
    return [
      { name: "plant_name", label: "Nazwa rośliny", selector: { text: {} } },
      { name: "image", label: "URL zdjęcia", selector: { text: {} } },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "battery_sensor", label: "Sensor baterii", selector: { entity: { domain: "sensor" } } },
          { name: "moisture_sensor", label: "Wilgotność ziemi", selector: { entity: { domain: "sensor" } } },
          { name: "temp_sensor", label: "Temperatura", selector: { entity: { domain: "sensor" } } },
          { name: "humidity_sensor", label: "Wilgotność powietrza", selector: { entity: { domain: "sensor" } } },
        ],
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "min_moisture", label: "Min. Wilgotność ziemi", selector: { entity: { domain: "number" } } },
          { name: "max_moisture", label: "Max. Wilgotność ziemi", selector: { entity: { domain: "number" } } },
          { name: "min_temp", label: "Min. Temperatura", selector: { entity: { domain: "number" } } },
          { name: "max_temp", label: "Max. Temperatura", selector: { entity: { domain: "number" } } },
        ],
      },
      { name: "details_boolean", label: "Przełącznik szczegółów", selector: { entity: { domain: "input_boolean" } } },
      { name: "description_sensor", label: "Sensor opisu (atrybut: instrukcja)", selector: { entity: { domain: "sensor" } } },
//      { name: "fertilize_script", label: "Skrypt nawożenia", selector: { entity: { domain: "script" } } },
      { name: "fertilize_helper", label: "Pomocnik daty nawożenia", selector: { entity: { domain: "input_datetime" } } },
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

customElements.define("mk-plant-card-editor", MkPlantCardEditor);
export { MkPlantCardEditor };