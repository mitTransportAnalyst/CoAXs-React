# Getting started

    npm install
    npm start


Then open your [http://localhost:8080/](http://localhost:8080/) to see the app.

# Files structure

```
src
├── Data
│   ├── LoadData.js
│   ├── corridors.json
│   ├── lines.geojson
│   ├── priority.geojson
│   ├── proposed.geojson
│   ├── routes.geojson
│   ├── scenario
│   │   ├── A.json
│   │   ├── B.json
│   │   ├── BaseCombined.json
│   │   ├── C.json
│   │   ├── D.json
│   │   ├── E.json
│   │   └── UpCombined.json
│   ├── stations.geojson
│   ├── stops.geojson
│   └── trunks.geojson
├── components
│   ├── Bottom
│   │   ├── Bottom.css
│   │   ├── Bottom.js
│   │   ├── Common
│   │   │   └── Slider
│   │   │       ├── Slider.css
│   │   │       └── Slider.js
│   │   ├── RouteSelector
│   │   │   ├── RouteSelector.css
│   │   │   └── RouteSelector.js
│   │   ├── RouteTable
│   │   │   ├── RouteTable.css
│   │   │   └── RouteTable.js
│   │   ├── Scenario
│   │   │   ├── Scenario.css
│   │   │   └── Scenario.js
│   │   ├── ServiceEditor
│   │   │   ├── ServiceEditor.css
│   │   │   └── ServiceEditor.js
│   │   └── TimeFilter
│   │       ├── TimeFilter.css
│   │       └── TimeFilter.js
│   ├── Home.js
│   ├── Map
│   │   ├── RouteMap
│   │   │   ├── RouteMap.css
│   │   │   └── RouteMap.js
│   │   └── ScenarioMap
│   │       ├── ScenarioMap.css
│   │       ├── ScenarioMap.js
│   │       ├── lib
│   │       │   ├── index.css
│   │       │   ├── index.js
│   │       │   └── transitive-layer.js
│   │       └── transitive-layer.js
│   ├── NotFound.js
│   └── TopleftPanel
│       ├── TopleftPanel.css
│       └── TopleftPanel.js
├── config.js
├── img
│   ├── alignment.jpg
│   ├── dwelltime.png
│   ├── frequency.png
│   ├── logo.svg
│   ├── marker-flag-end-shadowed.png
│   ├── marker-flag-shadow.png
│   ├── marker-flag-start-shadowed.png
│   ├── mfc_qr.png
│   ├── phil
│   │   ├── brt_black_yellow.svg
│   │   ├── heart.svg
│   │   ├── home_icon.svg
│   │   ├── platform_black_yellow.svg
│   │   ├── pole_black_yellow.svg
│   │   └── shopping_cart.svg
│   ├── runningtime.png
│   ├── start.png
│   ├── stop.png
│   ├── stop0.png
│   ├── stop1.png
│   ├── stop2.png
│   ├── stops
│   │   ├── 0.png
│   │   ├── 1.png
│   │   └── 2.png
│   ├── userHeart.png
│   ├── userHome.png
│   └── userShop.png
├── index.js
├── reducers
│   ├── action.js
│   └── index.js
├── router.js
├── sagas
│   └── index.js
├── store.js
└── style
    └── main.css
```
