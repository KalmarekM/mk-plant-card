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

    static get getConfigElement() {
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
            show_name: false,
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

        // Renderowanie stanu błędu/braku konfiguracji
        if (!state || !descMinState || !descMaxState) {
            return html`
                <div class="chip" style="border-style: dashed; opacity: 0.5;">
                    <ha-icon icon="mdi:help-circle-outline"></ha-icon>
                </div>`;
        }

        // Pobieranie nazwy obszaru (Area) z rejestru encji lub urządzenia
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

        // Logika sprawdzania progów wilgotności
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

        // Decyzja o wyświetlaniu tekstu: jeśli jest alarm LUB użytkownik wymusił widoczność nazwy
        const shouldShowText = isAlert || config.show_name;

        // Renderowanie - zawsze zwracamy kontener .chip, żeby był edytowalny
        return html`
            <div class="chip" 
                style="--glow-color: ${glowColor};" 
                @click="${(ev) => this._handleScrollToCard(ev)}">
                <ha-icon icon="${icon}" style="color: ${iconColor}"></ha-icon>
                ${shouldShowText ? html`
                    <span>${config.name || state.attributes.friendly_name} ${areaName ? `(${areaName})` : ''}</span>
                ` : ''}
            </div>
        `;
    }

    _handleScrollToCard(ev) {
        if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
        }

        const moistureEntity = this.config.entity;

        // Funkcja rekurencyjna do przeszukiwania Shadow DOM
        const findComponentDeep = (root, tagName) => {
            const found = [];
            const search = (node) => {
                if (!node) return;
                // Sprawdź czy to nasz element
                if (node.tagName && node.tagName.toLowerCase() === tagName) {
                    found.push(node);
                }
                // Szukaj w dzieciach
                if (node.children) {
                    Array.from(node.children).forEach(search);
                }
                // PRZEBIJ SIĘ PRZEZ SHADOW ROOT
                if (node.shadowRoot) {
                    Array.from(node.shadowRoot.children).forEach(search);
                }
            };
            search(root);
            return found;
        };

        // Szukamy w całym dokumencie, zaczynając od samej góry
        const allPlantCards = findComponentDeep(document.querySelector("home-assistant"), "mk-plant-card");

        // Znajdź kartę z pasującym sensorem
        const targetCard = allPlantCards.find(card =>
            card.config && card.config.moisture_sensor === moistureEntity
        );

        if (targetCard) {
            targetCard.scrollIntoView({ behavior: "smooth", block: "center" });

            // Highlight (opcjonalny efekt wizualny po przewinięciu)
            targetCard.style.transition = "box-shadow 0.5s ease-in-out, transform 0.3s ease";
            targetCard.style.boxShadow = "0 0 30px var(--accent-color)";
            targetCard.style.transform = "scale(1.03)";
            targetCard.style.zIndex = "999"; // Wyciągnij ją na wierzch

            setTimeout(() => {
                targetCard.style.boxShadow = "none";
                targetCard.style.transform = "scale(1)";
            }, 2000);
        } else {
            console.warn("Gloria: Nie znalazłam karty dla encji:", moistureEntity);
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