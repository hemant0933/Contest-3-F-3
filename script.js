let fetchLocation = document.getElementById("fetchBtn");
let container = document.getElementById("map");
var errorDisplay = document.getElementById("status");
let removeLocation = document.getElementById("removeLocation");
fetchLocation.addEventListener("click", getLocation);
let data = [];

function getLocation() {
    navigator.geolocation.getCurrentPosition(getPosition , gotFailed);
}



function gotFailed(){
    alert('There was some issue')
}

function getPosition(position) {
  if (localStorage.getItem("userdata") == null) {
    console.log(1);
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let UserLocation = { lat, long };
    data.push(UserLocation);
    localStorage.setItem("userdata", JSON.stringify(data));
    console.log(lat, long);
    container.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat},${long}&output=embed" width="900" height="400" frameborder="0" style="border:0"></iframe> `;
  } 
  else{
    console.log(2);
    let retrievedData = JSON.parse(localStorage.getItem("userdata"));
    retrievedData.map((p) => {
      let lat = p.lat;
      let long = p.long;
      container.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat},${long}&output=embed" width="900" height="400" frameborder="0" style="border:0"></iframe> `;
    });
    fetchLocation.disabled = true;
  }
}

// removing location from local storage

removeLocation.addEventListener("click", remove);

function remove() {
  localStorage.removeItem('userdata');

  if (localStorage.getItem("userdata") == null) {
    console.log("Empty");
  }
}
