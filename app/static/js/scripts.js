/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

async function submitFunction() {
  const duration_ms = document.getElementById("duration-ms").value;
  
  const tempo = document.getElementById("tempo").value;  
  
  const danceabilityDropDown = document.getElementById("danceability");
  const danceability = danceabilityDropDown.options[danceabilityDropDown.selectedIndex].value;

  const acousticnessDropDown = document.getElementById("acousticness");
  const acousticness = acousticnessDropDown.options[acousticnessDropDown.selectedIndex].value;

  const energyDropDown = document.getElementById("energy");
  const energy = energyDropDown.options[energyDropDown.selectedIndex].value;

  const instrumentalnessDropDown = document.getElementById("instrumentalness");
  const instrumentalness = instrumentalnessDropDown.options[instrumentalnessDropDown.selectedIndex].value;

  const livenessDropDown = document.getElementById("liveness");
  const liveness = livenessDropDown.options[livenessDropDown.selectedIndex].value;

  const speechinessDropDown = document.getElementById("speechiness");
  const speechiness = speechinessDropDown.options[speechinessDropDown.selectedIndex].value;

  const valenceDropDown = document.getElementById("valence");
  const valence = valenceDropDown.options[valenceDropDown.selectedIndex].value;

  const loudnessDropDown = document.getElementById("loudness");
  const loudness = loudnessDropDown.options[loudnessDropDown.selectedIndex].value;

  const keyDropDown = document.getElementById("key");
  const key = keyDropDown.options[keyDropDown.selectedIndex].value;

  const modeDropDown = document.getElementById("mode");
  const mode = modeDropDown.options[modeDropDown.selectedIndex].value;

  const hasFeatDropDown = document.getElementById("has-feat");
  const has_feat = hasFeatDropDown.options[hasFeatDropDown.selectedIndex].value;

  const musicGenreDropDown = document.getElementById("music-genre");
  const music_genre = musicGenreDropDown.options[musicGenreDropDown.selectedIndex].value;

  const response = await fetch("https://cocalc8.ai-camp.dev/66ddc8e4-4410-423b-929c-a2b80762c7ad/port/12345/predict", {
      method: "POST", 
      body: JSON.stringify({duration_ms, tempo, danceability, acousticness, energy, instrumentalness, liveness, speechiness, valence, loudness, key, mode, has_feat, music_genre}),
      headers: {
          'Content-Type': 'application/json',
      },

  });
  const responseObj = await response.json();
  document.getElementById("model-results").innerHTML =
    `<section class="page-section" >
          <div class="container text-center">
          <h2 class="section-heading text-uppercase">Predicted popularity score: ${JSON.stringify(responseObj)}/100</h2>
          </div>
      </section> `;
};





