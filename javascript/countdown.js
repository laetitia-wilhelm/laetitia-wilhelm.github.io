(function () {
  // set time in milliseconds
  const second = 1000, // 1 sec
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
        let today = new Date(),
  startOlympic = "07/26/2024";
  console.log(startOlympic);

  /*date in milliseconds*/
  const countDown = new Date(startOlympic).getTime(),
      x = setInterval(function() {    

        const now = new Date().getTime(),
          distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
        document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

      }, 0)
  }());