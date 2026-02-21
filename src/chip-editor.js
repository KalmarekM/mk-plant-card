import { LitElement, html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";
import { translations } from './translations.js';
// Importujemy chip.js, aby edytor mógł wyrenderować podgląd
import './chip.js';

export class MkPlantAlertChipEditor extends LitElement {
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

    _schema() {
        return [
            { name: "name", label: this.t('chip_label_name'), selector: { text: {} } },
            {
                name: "entity",
                label: this.t('chip_label_moisture'),
                selector: { entity: { domain: "sensor" } }
            },
            {
                name: "description_entity",
                label: this.t('chip_label_desc_min'),
                selector: { entity: { domain: "number" } }
            },
            {
                name: "description_max_entity",
                label: this.t('chip_label_desc_max'),
                selector: { entity: { domain: "number" } }
            },
        ];
    }

    render() {
        if (!this.hass || !this._config) return html``;

        return html`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${this._schema()}
          .computeLabel=${(s) => s.label}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="preview-section">
          <p class="preview-label">${this.t('preview_title')}</p>
          <mk-plant-alert-chip
            .hass=${this.hass}
            .config=${this._config}
          ></mk-plant-alert-chip>
        </div>
      </div>
    `;
    }

    _valueChanged(ev) {
        // Standardowe wysłanie nowej konfiguracji do Home Assistant
        const event = new CustomEvent("config-changed", {
            detail: { config: ev.detail.value },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
}

customElements.define("mk-plant-alert-chip-editor", MkPlantAlertChipEditor);