async function initMap() {
    
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer,YMapDefaultFeaturesLayer, YMapListener, DomEventHandler} = ymaps3;

    // Иницилиазируем карту
    const map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.getElementById('map'),

        // Передаём параметры инициализации карты
        {
            location: {
                // Координаты центра карты
                center: [37.588144, 55.733842],

                // Уровень масштабирования
                zoom: 10
            }
        }
    );

    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());
    
    const clickCallback = (e) => {
        console.log(e)
    };;

    const mapListener = new YMapListener({
        layer:'any',
        onClick: clickCallback,
    })
    map.addChild(mapListener);
    
}

initMap();