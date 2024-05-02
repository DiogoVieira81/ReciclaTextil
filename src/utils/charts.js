const donorChart = document.getElementById("canvas");
      var names = new Array();
      var kgsDonated = new Array();

      <% for (var i = 0; i < donors.length; i++) { %>
        names[<%= i %>] = "<%= donors[i].name %>";
        kgsDonated[<%= i %>] = parseInt("<%= donors[i].kg %>");
      <% } %>

      new Chart(donorChart, {
        type: "bar",
        data: {
          labels: names,
          datasets: [
            {
              label: "Kilograms donated",
              data: kgsDonated,
              borderWidth: 1,
              backgroundColor: ['lightyellow', 'darkblue', 'yellowgreen', 'darkgreen', 'lightgreen'],
              hoverOffset: 5
            },
          ],
        },
        options: {
          scales: {
            xAxes: [
              {
                beginAtZero: true,
                ticks: {
                  autoSkip: false,
                },
              },
            ],
            y: {
              beginAtZero: true,
            },
          },
        },
      });
