export const translations = {
  'pl': {
    // Nagłówki sekcji w edytorze
    'section_sensors': 'Sensory rośliny',
    'section_power': 'Sensory progowe (Power Plant)',
    'section_helpers': 'Pomocnicy i opisy',
    
    // Parametry rośliny
    'plant_name': 'Nazwa rośliny',
    'sun_exposure': 'Nasłonecznienie',
    'image_url': 'URL zdjęcia',
    'image_helper': 'np. /local/images/plants/zdjecie.jpg',
    'battery_sensor': 'Sensor baterii',
    'soil_moisture': 'Wilgotność ziemi',
    'temperature': 'Temperatura',
    'air_humidity': 'Wilgotność powietrza',
    
    // Progi i zakresy
    'min_prefix': 'Min.',
    'max_prefix': 'Max.',
    'range': 'Zakres',
    
    // Pomocnicy i akcje
    'desc_sensor': 'Sensor opisu (atrybut: instrukcja)',
    'fert_helper': 'Pomocnik daty nawożenia',
    'save_fertilize': 'Zapisz nawożenie',
    'last_time': 'Ostatnio',
    'no_description': 'Brak opisu',
    'confirm_fertilize': 'Czy na pewno chcesz zapisać dzisiejszą datę nawożenia?',
    'error_helper': 'Błąd: Nie skonfigurowano pomocnika daty nawożenia!',
    
    // Ekspozycja słoneczna
    'shade': 'Cień',
    'partial_shade': 'Półcień',
    'full_sun': 'Pełne słońce',
    
    // Opisy kart (widoczne przy dodawaniu w HA)
    'card_description': 'Pełna karta rośliny z instrukcją i nawożeniem',
    'chip_description': 'Mały alert (chip) - widoczny tylko gdy roślina wymaga podlewania',
    'error_missing_name': 'Błąd: Nazwa rośliny jest wymagana!',
    'error_missing_sensors': 'Skonfiguruj wszystkie sensory (Wilgotność, Próg Min, Próg Max)',
    
    // Edytor Chipa
    'chip_label_name': 'Etykieta (opcjonalnie)',
    'chip_label_moisture': 'Sensor wilgotności gleby',
    'chip_label_desc_min': 'Sensor progu MIN (atrybut: min)',
    'chip_label_desc_max': 'Sensor progu MAX (atrybut: max)',
    'preview_title': 'Podgląd (jeśli występuje alarm)'
  },
  'en': {
    'section_sensors': 'Plant sensors',
    'section_power': 'Threshold sensors',
    'section_helpers': 'Helpers and descriptions',
    'plant_name': 'Plant name',
    'sun_exposure': 'Sun exposure',
    'image_url': 'Image URL',
    'image_helper': 'e.g., /local/images/plants/photo.jpg',
    'battery_sensor': 'Battery sensor',
    'soil_moisture': 'Soil moisture',
    'temperature': 'Temperature',
    'air_humidity': 'Air humidity',
    'min_prefix': 'Min.',
    'max_prefix': 'Max.',
    'range': 'Range',
    'desc_sensor': 'Description sensor (attr: instruction)',
    'fert_helper': 'Fertilization date helper',
    'save_fertilize': 'Save fertilization',
    'last_time': 'Last time',
    'no_description': 'No description',
    'confirm_fertilize': 'Are you sure you want to save today\'s fertilization date?',
    'error_helper': 'Error: Fertilization helper not configured!',
    'shade': 'Shade',
    'partial_shade': 'Partial shade',
    'full_sun': 'Full sun',
    'card_description': 'Full plant card with instructions and fertilization',
    'chip_description': 'Small alert chip - visible only when watering is needed',
    'error_missing_sensors': 'Please configure all sensors (Moisture, Min Threshold, Max Threshold)',
    'error_missing_name': 'Error: Plant name is required!',
    'chip_label_name': 'Label (optional)',
    'chip_label_moisture': 'Soil moisture sensor',
    'chip_label_desc': 'MIN threshold sensor (min attr)',
    'chip_label_desc_max': 'MAX threshold sensor (max attr)',
    'preview_title': 'Preview (if alert is active)'
  }
};