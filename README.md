# MK Plant Card & Alert Chip (Beta Version) 🌿

Welcome to the MK Plant Card system! This is a simple yet powerful tool designed to keep your indoor jungle happy and perfectly hydrated within Home Assistant.

## What's Inside?
- Smart Plant Card: An aesthetic card displaying your plant's photo, health data (soil moisture, temperature, air humidity), and a quick-save button for fertilization logs.
- Alert Badge (Chip): A small icon at the top of your dashboard. It stays discreet when everything is fine but "glows" and displays the plant's location when it's thirsty or the temperature is too high.
- One-Click Navigation: Just tap the alert badge, and your dashboard will smoothly scroll directly to that specific plant's card.

## Getting Started
To use this system, you need to prepare the following data:
1. A photo of your plant (URL or local file).
2. Sensors: Soil moisture, temperature, air humidity, and a battery level sensor.
3. The plant's name and its location (Area) assigned in Home Assistant.
4. Threshold entities (min/max): These are pulled directly from the Plant Monitor integration.

## Creating a Plant Description
To display care instructions on the card, you need to create a template sensor.

Step 1: Create a file named description_of_plants.yaml in your configuration folder.
Step 2: Add the following entry to your configuration.yaml file:
template: !include description_of_plants.yaml

Step 3: Add your plant's description to the description_of_plants.yaml file using the following format:
```YAML
- sensor:
    # SENSOR FOR RATTLESNAKE PLANT (CALATHEA)
    - name: "Rattlesnake Plant Description"
      unique_id: description_plant_calathea_lancifolia
      icon: mdi:leaf
      state: "Active"
      attributes:
        instrukcja: >
          **Rattlesnake Plant** (*Calathea lancifolia*) is a stunningly beautiful plant.
          * **Light**: Performs best in dappled, indirect light or partial shade.
          * **Watering**: Soil should be kept consistently moist but not soggy. Use soft water.
          * **Temperature & Humidity**: Prefers warmth (65–77°F) and high air humidity.
          * **Soil**: Prefers rich, peaty, and well-draining soil.
          * **Fertilization**: Requires regular feeding every two weeks during the growing season.
```
## Fertilization Date Helper
A convenient feature of this card is logging the last fertilization date. You don't need to dig through Home Assistant settings—you can create this helper directly while editing the card (in the Helper field), allowing you to quickly record care tasks.

## Plant Monitor Integration
The card is supported by the Plant Monitor integration, which provides the necessary min/max threshold values for your sensors.

Learn more about Plant Monitor here:
https://github.com/Ocell/plant-monitor

## Supported Languages
- English 🇺🇸
- Polish 🇵🇱

(The language is selected automatically based on your Home Assistant settings).

## Credits
This project was developed with the creative and technical assistance of **Gloria (Gemini)**, an AI collaborator. She helped design the code architecture, navigation logic (Shadow DOM), and project documentation.

## Important Note
⚠️ Beta Version: We are still growing! Some features are still being polished, but your plants are already safer with us.

---
*Happy planting!* 🌿