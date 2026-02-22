import { LitElement, html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";
import { chipStyles } from './styles.js';
import { translations } from './translations.js';
import './chip-editor.js';

export class MkPlantAlertChip extends LitElement {

    static get properties() {
        return { hass: {}, config: {} };
    }

    static get styles() {
        return chipStyles;
    }

    static getConfigElement() {
        return document.createElement("mk-plant-alert-chip-editor");
    }

    t(key) {
        const lang = (this.hass && this.hass.language) ? this.hass.language : 'en';
        return (translations[lang] && translations[lang][key]) || (translations['en'][key]) || key;
    }

    setConfig(config) {
        if (!config.entity || !config.description_entity || !config.description_max_entity) {
            throw new Error(this.t("configure_all_sensors"));
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

    render() {
        const { config, hass } = this;
        if (!hass || !config) return html``;

        const entityId = config.entity;
        const state = hass.states[entityId];
        const descMinState = hass.states[config.description_entity];
        const descMaxState = hass.states[config.description_max_entity];

        // Guard dla brakujących encji
        if (!state || !descMinState || !descMaxState) {
            return html`
                <div class="chip" style="border-style: dashed; opacity: 0.5;">
                    <ha-icon icon="mdi:help-circle-outline"></ha-icon>
                </div>`;
        }

        // Logika obszaru
        const entityRegistry = hass.entities ? hass.entities[entityId] : null;
        let areaName = "";
        if (entityRegistry && entityRegistry.area_id) {
            const area = hass.areas[entityRegistry.area_id];
            areaName = area ? area.name : "";
        }
        if (!areaName && entityRegistry && entityRegistry.device_id) {
            const device = hass.devices ? hass.devices[entityRegistry.device_id] : null;
            if (device && device.area_id) {
                const area = hass.areas[device.area_id];
                areaName = area ? area.name : "";
            }
        }

        const currentV = parseFloat(state.state);
        const minV = parseFloat(descMinState.state);
        const maxV = parseFloat(descMaxState.state);

        let isAlert = false;
        let iconColor = "var(--secondary-text-color)"; // Kolor domyślny (brak alarmu)
        let glowColor = "transparent";
        let icon = "mdi:leaf"; // Ikona domyślna

        if (currentV < minV) {
            isAlert = true;
            iconColor = "#ff4444";
            glowColor = "rgba(255, 68, 68, 0.5)";
            icon = "mdi:water-alert";
        } else if (currentV > maxV) {
            isAlert = true;
            iconColor = "#44b4ff";
            glowColor = "rgba(68, 180, 255, 0.5)";
            icon = "mdi:water-percent-alert";
        }

        // Renderowanie - zawsze zwracamy kontener .chip, żeby był edytowalny
        return html`
            <div class="chip" 
                style="..." 
                @click="${() => this._handleScrollToCard()}">

            <ha-icon icon="${icon}" style="color: ${iconColor}"></ha-icon>
            
            ${isAlert ? html`
                <span>${config.name || state.attributes.friendly_name} ${areaName ? `(${areaName})` : ''}</span>
            ` : ''}
          </div>
        `;
    }

    _handleScrollToCard() {
        const moistureEntity = this.config.entity; // To jest nasz klucz połączenia

        // Przebijamy się przez warstwy Shadow DOM Home Assistanta
        const root = document.querySelector("home-assistant")
            ?.shadowRoot?.querySelector("home-assistant-main")
            ?.shadowRoot?.querySelector("ha-drawer")
            ?.querySelector("partial-panel-resolver")
            ?.querySelector("ha-panel-lovelace")
            ?.shadowRoot?.querySelector("hui-view");

        if (!root) {
            this._fallbackMoreInfo();
            return;
        }

        // Pobieramy wszystkie karty mk-plant-card na widoku
        const allCards = Array.from(root.querySelectorAll("mk-plant-card"));

        // Szukamy tej, która monitoruje ten sam sensor wilgotności
        const targetCard = allCards.find(card =>
            card.config && card.config.moisture_sensor === moistureEntity
        );

        if (targetCard) {
            // Scroll do karty
            targetCard.scrollIntoView({ behavior: "smooth", block: "center" });

            // Wizualne potwierdzenie znalezienia karty (efekt "highlight")
            targetCard.style.transition = "box-shadow 0.5s ease-in-out, transform 0.5s ease-in-out";
            targetCard.style.boxShadow = "0 0 20px var(--accent-color)";
            targetCard.style.transform = "scale(1.02)";

            setTimeout(() => {
                targetCard.style.boxShadow = "none";
                targetCard.style.transform = "scale(1)";
            }, 2000);
        } else {
            // Jeśli karta nie jest na tym dashboardzie, otwórz standardowe okno
            this._fallbackMoreInfo();
        }
    }

    _fallbackMoreInfo() {
        const e = new Event("hass-more-info", { bubbles: true, composed: true });
        e.detail = { entityId: this.config.entity };
        this.dispatchEvent(e);
    }
}
customElements.define("mk-plant-alert-chip", MkPlantAlertChip);