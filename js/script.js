if (document.getElementById("map") != null) {
    let map;

    async function initMap() {
        //@ts-ignore
        const {
            Map
        } = await google.maps.importLibrary("maps");
        var myCenter = new google.maps.LatLng(41.878876, -87.635918);
        map = new Map(document.getElementById("map"), {
            center: {
                lat: 41.878876,
                lng: -87.635918
            },
            zoom: 20,
        });
        const centerToWillisTower = new google.maps.Marker({
            icon: "media/WT.png",
            position: myCenter,
            map,
            title: "Willis Tower",
        });
        centerToWillisTower.addListener("click", () => {
            map.setZoom(20);
            map.setCenter(centerToWillisTower.getPosition());
        });
        centerToWillisTower.addListener("click", Bounce);

        function Bounce() {
            if (centerToWillisTower.getAnimation() !== null) {
                centerToWillisTower.setAnimation(null);
                infowindow.close()
            } else {
                centerToWillisTower.setAnimation(google.maps.Animation.BOUNCE);
                infowindow.open({
                    anchor: centerToWillisTower,
                    map,
                });
            }

        }
        const contentString =
            '<h2>The Sears Tower</h2>' +
            '<center>' +
            '<div id="bodyContent">' +
            '<p>Willis Tower, formerly (1973–2009) Sears Tower, skyscraper office building in Chicago, Illinois, located at 233 South Wacker Drive, that is one of the world’s tallest buildings.</p>' +
            '</center>' +
            "</div>" +
            "</div>";
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
            ariaLabel: "Uluru",
        });
        const cityCircle = new google.maps.Circle({
            draggable: true,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            center: {
                lat: 41.877876,
                lng: -87.635918
            },
            radius: 100,
        });

    }

    initMap();
}
async function pictureSlider() {
    let listofPictures = document.getElementsByClassName("picture");
    let selectedPicture = 0;

    document.getElementById("forward").addEventListener("click", () => {
        //document.write(forward):
        //selectedPicture = selectedPicture+1
        reduceOpacity(selectedPicture + 1)
    });


    document.getElementById("back").addEventListener("click", () => {
        //document.write(back):
        //selectedPicture = selectedPicture-1
        reduceOpacity(selectedPicture - 1)
    });

    function reduceOpacity(newSelection) {
        if (newSelection >= listofPictures.length) {
            newSelection = 0;
            alert("Restarting Slideshow!");
        }
        if (newSelection < 0) {
            newSelection = listofPictures.length - 1;
            alert("Restarting Slideshow!");
        }

        listofPictures[selectedPicture].classList.toggle("active");
        listofPictures[newSelection].classList.toggle("active");
        selectedPicture = newSelection;
    }

}
pictureSlider();
