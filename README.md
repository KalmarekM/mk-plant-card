## MK Plant Card 🌿
Zaawansowana i estetyczna karta dla Home Assistant, dedykowana monitorowaniu roślin. Pozwala na bieżąco śledzić parametry życiowe rośliny oraz prowadzić prosty dziennik pielęgnacji.

## Główne Funkcje
- 📊 **Monitorowanie parametrów**: Wilgotność ziemi, temperatura oraz wilgotność powietrza.
- 🎨 **Inteligentne kolory**: Ikony zmieniają kolory w zależności od zdefiniowanych norm.
- 🔋 **Poziom baterii**: Podgląd stanu baterii sensora w nagłówku.
- 📖 **Instrukcje pielęgnacji**: Wyświetlanie opisów z obsługą Markdown (pogrubienia, listy).
- 📅 **Zapis nawożenia**: Przycisk zapisu dzisiejszej daty do pomocnika input_datetime.
- ⚙️ **Edytor wizualny**: Pełna obsługa konfiguracji przez interfejs graficzny.

## Instalacja
1. Pobierz plik dist/mk-plant-card.js.
2. Umieść go w folderze /config/www/ swojego Home Assistant.
3. Dodaj zasób w HA:
    - **Ustawienia** -> **Pulpity nawigacyjne** -> **Trzy kropki** -> **Zasoby**.
    - Dodaj nowy zasób:
        - **URL**: `/local/mk-plant-card.js`
        - **Typ**: `JavaScript Module`
4. Odśwież stronę w przeglądarce (`Ctrl + F5`).

## Przygotowanie sensorów (Backend)
### 1. Sensory opisu i instrukcji
Karta pobiera opisy z atrybutu instrukcja. W folderze /config/ utwórz plik description_of_plants.yaml i dodaj w nim:
```yaml
platform: template
sensors:
opis_rosliny_zamiokulkas:
friendly_name: "Zamiokulkas - Instrukcja"
value_template: "Ok"
attribute_templates:
instrukcja: >
### Zamiokulkas Zamiolistny
* **Światło**: Cień lub półcień.
* **Podlewanie**: Raz na 2-3 tygodnie.
* **Nawożenie**: Raz w miesiącu w sezonie.
```
Aby powyższy plik działał, w pliku `configuration.yaml` dodaj odwołanie:
```yaml
sensor: !include description_of_plants.yaml
```
### 2. Pomocnik nawożenia
1. Wejdź w Ustawienia -> Urządzenia oraz usługi -> Pomocnicy.
2. Utwórz pomocnika -> Data i/lub czas.
3. Wybierz opcję Data.
4. Nazwij go np. `Zamiokulkas Nawożenie`.

## Konfiguracja karty (YAML)
Przykładowa konfiguracja ręczna:
```yaml
type: custom:mk-plant-card
plant_name: "Zamiokulkas"
image: "/local/images/plants/zamiokulkas.jpg"
battery_sensor: sensor.roslina_1_battery
moisture_sensor: sensor.roslina_1_soil_moisture
temp_sensor: sensor.roslina_1_temperature
humidity_sensor: sensor.roslina_1_humidity
min_moisture: number.min_moisture_zami
max_moisture: number.max_moisture_zami
details_boolean: input_boolean.szczegoly_rosliny
description_sensor: sensor.opis_rosliny_zamiokulkas
fertilize_helper: input_datetime.zamiokulkas_nawozenie
```
## Rozwój (Development)
1. `npm install`
2. Edytuj pliki w folderze `src/`
3. Buduj projekt poleceniem: `npm run build`