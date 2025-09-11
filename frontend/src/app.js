// import { formatDateToMonthDay } from './utils/dateUtils.js'

function formatDateToMonthDay(dateStr) {
  const date = new Date(dateStr)
  if (!date) return ''

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]

  const month = months[date.getMonth()]
  const day = date.getDate()

  return `${month} ${day}`
}

$(document).ready(function () {
  const today = new Date().toISOString().split('T')[0]
  $('#date').val(today)
  $('#getMessage').click(function () {
    $.get('http://localhost:8080/api/hello', function (data) {
      console.log('Message from backend:', data)
      $('#message').text(data)
    }).fail(function () {
      $('#message').text('Failed to connect to backend.')
    })
  })

  // $('#dataForm').on('submit', function (event) {
  $('#logData').click(function (event) {
    event.preventDefault()
    console.log('logging data...')
    const data = {
      date: $('#date').val(),
      steps: parseInt($('#steps').val()) || null,
      calories: parseInt($('#calories').val()) || null,
      sleep: parseFloat($('#sleep').val()) || null,
      mood: $('#mood').val(),
    }
    console.log('Data to be sent:', data)

    $.ajax({
      url: 'http://localhost:8080/api/health/log',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (response) {
        // alert('Health data saved successfully!')
        console.log('logged:', response)
        $('#dataForm')[0].reset()
        $('#date').val(today)
      },
      error: function () {
        alert('Failed to save data.')
      },
    })
  })

  $('#cancelData').click(function () {
    console.log('cancelling data entry...')

    $('#dataForm')[0].reset()
    console.log('today:', today)
    $('#date').val(today)
  })

  // chart
  $.ajax({
    url: 'http://localhost:8080/api/health/logs/week',
    type: 'GET',
    contentType: 'application/json',
    data: { date: today },
    success: function (response) {
      console.log('weekly response:', response)
      // alert('Health data for week retrieved successfully!')
      response.sort((a, b) => new Date(a.date) - new Date(b.date))
      const labels = response.map((log) => formatDateToMonthDay(log.date))
      console.log('labels:', labels)
      const stepsData = response.map((log) => log.steps || 0)
      const caloriesData = response.map((log) => log.calories || 0)
      const sleepData = response.map((log) => log.sleep || 0)
      const moodData = response.map((log) => log.mood || 0)

      const ctx = document.getElementById('chart').getContext('2d')
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Steps',
              data: stepsData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.3,
              yAxisID: 'ySteps',
              hidden: false,
            },
            {
              label: 'Calories',
              data: caloriesData,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
              tension: 0.3,
              yAxisID: 'yCalories',
              hidden: true,
            },
            {
              label: 'Sleep (hours)',
              data: sleepData,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
              tension: 0.3,
              yAxisID: 'ySleep',
              hidden: true,
            },
            {
              label: 'Mood',
              data: moodData,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
              tension: 0.3,
              yAxisID: 'yMood',
              hidden: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                font: {
                  size: 14,
                },
                color: function (legendItem, chart) {
                  const ds = chart.data.datasets[legendItem.datasetIndex]
                  return ds.borderColor
                },
                generateLabels: function (chart) {
                  return chart.data.datasets.map((ds, i) => ({
                    text: ds.label,
                    // text: `${ds.label} ${ds.hidden ? '' : ''}`, 
                    fillStyle: `${ds.backgroundColor} ${ds.hidden ? 'red' : ''}`, //ds.backgroundColor, //'transparent',
                    strokeStyle: 'transparent',
                    lineWidth: 1,
                    hidden: ds.hidden,
                    datasetIndex: i,
                    hidden: false, // get rid of default strikethrough
                  }))
                },
              },
              onClick: function (e, legendItem, legend) {
                const index = legendItem.datasetIndex
                const ci = legend.chart
                ci.data.datasets.forEach((ds, i) => {
                  ds.hidden = true
                })
                ci.data.datasets[index].hidden = false
                const axes = ci.options.scales
                for (let axisID in axes) {
                  if (axisID === 'x') {
                    continue
                  }
                  axes[axisID].display =
                    ci.data.datasets[index].yAxisID === axisID
                }
                ci.update()
              },
            },
          },
          scales: {
            ySteps: {
              type: 'linear',
              display: true,
              position: 'left',
              beginAtZero: true,
              //   title: {
              //     display: true,
              //     text: 'Steps',
              //   },
            },
            yCalories: {
              display: false,
              type: 'linear',
              position: 'left',
              beginAtZero: true,
              //   title: {
              //     display: true,
              //     text: 'Calories',
              //   },
              grid: {
                drawOnChartArea: false,
              },
            },
            ySleep: {
              display: false,
              type: 'linear',
              position: 'left',
              beginAtZero: true,
              //   title: {
              //     display: true,
              //     text: 'Sleep (hours)',
              //   },
              grid: {
                drawOnChartArea: false,
              },
            },
            yMood: {
              display: false,
              type: 'linear',
              position: 'left',
              beginAtZero: true,
              //   title: {
              //     display: true,
              //     text: 'Mood',
              //   },
              grid: {
                drawOnChartArea: false,
              },
            },
            x: {
              title: {
                display: true,
                //   text: 'Date',
              },
            },
          },
        },
      })
    },
    error: function () {
      alert('Failed to save data.')
    },
  })
})

// set default date to today
$(function () {
  const today = new Date().toISOString().split('T')[0]
  $('#date').val(today)
})
