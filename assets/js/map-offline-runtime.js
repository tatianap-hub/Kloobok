function addOfflineBasemap(map) {
  const template = document.getElementById('map-offline-geography');
  const data = JSON.parse(document.getElementById('map-offline-labels').textContent);
  const svg = template.content.firstElementChild.cloneNode(true);
  const geographyPane = map.createPane('offlineGeography');
  geographyPane.style.zIndex = '210';
  geographyPane.style.pointerEvents = 'none';
  const labelPane = map.createPane('offlineLabels');
  labelPane.style.zIndex = '410';
  labelPane.style.pointerEvents = 'none';
  L.svgOverlay(svg, data.bounds, {
    pane:'offlineGeography', interactive:false,
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> · <a href="https://opendatacommons.org/licenses/odbl/1-0/">ODbL</a>'
  }).addTo(map);
  const extent = L.latLngBounds(data.bounds);
  map.setMaxBounds(extent);
  map.options.maxBoundsViscosity = 1;
  map.setMinZoom(11);
  map.setMaxZoom(18);
  const labels = L.layerGroup().addTo(map);
  const roadWidths = [2.4,1.8,1.4,1.05,.65,.5];
  const roads = roadWidths.map((_,i)=>svg.querySelector('.map-road-'+i));
  function renderLabels() {
    labels.clearLayers();
    const zoom = map.getZoom(), bounds = map.getBounds(), size = map.getSize();
    const boxes = [], seen = new Set();
    const growth = Math.min(2.5,Math.pow(1.2,zoom-12));
    roads.forEach((road,i)=>road.setAttribute('stroke-width',(roadWidths[i]*growth).toFixed(2)));
    function put(label, street) {
      const position = L.latLng(label[1],label[2]);
      if (!bounds.contains(position)) return;
      let name = label[0];
      if (street && seen.has(name)) return;
      const kind = street ? 'street' : label[3];
      if (kind==='park' && zoom<13) return;
      if (kind==='suburb' && zoom<13 && !/arrondissement/i.test(name)) return;
      const point = map.latLngToContainerPoint(position);
      const font = street ? 10.5 : name==='Paris' ? 17 : kind==='park' ? 10.5 : 12;
      const width = Math.min(street ? 205 : 165, name.length*font*.53+12);
      const height = name.length*font*.53>width ? 31 : 19;
      const box = [point.x-width/2,point.y-height/2,point.x+width/2,point.y+height/2];
      if (box[0]<4 || box[1]<4 || box[2]>size.x-4 || box[3]>size.y-4) return;
      if (boxes.some(b=>box[0]<b[2]+12 && box[2]>b[0]-12 && box[1]<b[3]+7 && box[3]>b[1]-7)) return;
      boxes.push(box);seen.add(name);
      const span = document.createElement('span');
      span.textContent = name;
      span.style.width = width+'px';
      span.style.fontSize = font+'px';
      L.marker(position, {pane:'offlineLabels',interactive:false,keyboard:false,
        icon:L.divIcon({className:'map-base-label map-base-label-'+kind,html:span,iconSize:[0,0],iconAnchor:[0,0]})
      }).addTo(labels);
    }
    data.places.slice().sort((a,b)=>
      (a[0]==='Paris'?-1:a[3]==='city'?0:a[3]==='town'?1:a[3]==='suburb'?2:3)-
      (b[0]==='Paris'?-1:b[3]==='city'?0:b[3]==='town'?1:b[3]==='suburb'?2:3)
    ).forEach(label=>put(label,false));
    if (zoom>=14) {
      const maxRank = zoom<15 ? 2 : zoom<16 ? 3 : 5;
      for (const label of data.streets) {
        if (label[3]>maxRank) break;
        if (boxes.length>100) break;
        put(label,true);
      }
    }
  }
  map.on('moveend zoomend resize',renderLabels);
  renderLabels();
}
