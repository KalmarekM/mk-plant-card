# MK Plant Card & Alert Chip (Beta Version) 🌿

MK Plant Card is a set of Home Assistant cards for monitoring essential plant parameters. It focuses on clear data visualization and quick alerts whenever your plants need attention.

## What's Inside?
- **Smart Plant Card**: An aesthetic card displaying your plant's photo, real-time status (soil moisture, temperature, air humidity), and a quick-action button for recording fertilization.
- **Alert Chip**: A discreet badge at the top of your dashboard. It remains hidden when everything is fine but "pulses" and shows the plant's location when it's too dry or too hot.
- **One-Click Navigation**: Simply tap the alert chip, and your dashboard will smoothly scroll directly to the specific plant's card.

## Getting Started
To use the cards, you need to prepare the following:
1. **Plant Photo** (link or local file) – see: [Where and how to place plant images?](#where-and-how-to-place-plant-images)
2. **Sensors**: Soil moisture, temperature, air humidity, and battery level sensors.
3. **Plant Name & Location**: Ensure the plant name and its Area are assigned in Home Assistant.
4. **Threshold Entities (min/max)**: These are pulled directly from the **Plant Monitor** integration.

## Where and how to place plant images?

To display images on the card, you must place them in your server's local resources:

1. **Physical Folder**: Upload your image files to:  
   `\\x.x.x.x\config\www\images\plants\`  
   *Tip: You can also use plant images automatically created in this directory by the **Plant Monitor** integration.*
2. **URL Address**: Home Assistant maps the `/www/` folder as `/local/`. Your images will be accessible at:  
   `/local/images/plants/filename.jpg`
3. **Configuration**: In the card editor, enter the path above in the **image** field (remember that filenames are case-sensitive).

## Creating Plant Descriptions
To display care instructions on the card, you need to create a template sensor.

**Step 1:** Create a file named `description_of_plants.yaml` in your configuration folder.  
**Step 2:** In your `configuration.yaml`, add the following entry:  
`template: !include description_of_plants.yaml`

**Step 3:** In `description_of_plants.yaml`, add your plant description using this pattern:
```YAML
- sensor:
    # SENSOR FOR RATTLESNAKE PLANT
    - name: "Rattlesnake Plant Description"
      unique_id: description_plant_calathea_lancifolia
      icon: mdi:leaf
      state: "Active"
      attributes:
        instrukcja: >
          **Rattlesnake Plant** (*Calathea lancifolia*) is a stunningly beautiful plant.
          * **Light**: Prefers bright, indirect light or partial shade.
          * **Watering**: Keep soil consistently moist; use soft water.
          * **Temp & Humidity**: Thrives in warmth (65–78°F) and high humidity.
          * **Soil**: Prefers fertile, humus-rich, and well-draining soil.
          * **Fertilization**: Requires regular feeding every two weeks during the growing season.
```
## Fertilization Helper
The card not only tracks the last fertilization date but also acts as a smart reminder, taking seasonal cycles into account.

1. **Tracking**: Create a helper (`input_datetime`) directly in the card editor. 
2. **Interval**: Set how many weeks should pass between fertilizations.
3. **Smart Reminder**: If the time since the last fertilization exceeds the set interval, the button turns red.
4. **Seasonal Logic**: 
   - **Winter (Dec-Feb)**: The button displays a red `✖ Do not fertilize` mark (dormancy period).
   - **Autumn (Sep-Nov)**: The card suggests limiting fertilization by changing the button color to orange.
   - *The button remains active at all times, allowing you to log actions despite warnings.*

## Plant Monitor Integration
This card is supported by the **Plant Monitor** integration, which provides the necessary min/max threshold values for your sensors.

Learn more about Plant Monitor here:  
https://github.com/Ocell/plant-monitor

## Supported Languages
- English 🇺🇸
- Polish 🇵🇱  
*(Language is selected automatically based on your Home Assistant settings).*

## Credits
This project was created with the creative and technical support of **Gloria (Gemini)**, an AI assistant. She assisted in designing the code architecture, navigation logic (Shadow DOM), and project documentation.

## Important Note
⚠️ **Beta Version**: We are still growing! Some features are still being refined, but your plants are already safer with us.

---
*Happy planting!* 🌿