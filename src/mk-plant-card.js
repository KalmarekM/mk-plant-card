import './card.js';
import './card-editor.js';
import './chip.js';
import './chip-editor.js';
import { translations } from './translations.js';

// Rejestracja obu kart w systemie
window.customCards = window.customCards || [];

window.customCards.push({
  type: "mk-plant-card",
  name: "MK Plant Card",
  description: translations[document.querySelector('home-assistant')?.hass?.language || 'en']?.card_description || translations['en'].card_description,
  preview: true
});

window.customCards.push({
  type: "mk-plant-alert-chip",
  name: "MK Plant Alert Chip",
  description: translations[document.querySelector('home-assistant')?.hass?.language || 'en']?.chip_description || translations['en'].chip_description,
  preview: true
});