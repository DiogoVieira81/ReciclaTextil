const Donor = require("../models/Donor");

const donors = await Donor.find({});

const donorChart = document.getElementById("canvas");

      new Chart(donorChart, {
        type: "bar",
        data: {
          labels: [donors[0].name, "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "Top donors",
              data: [donors[0].kg, 19, 3, 5, 2, 3],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });