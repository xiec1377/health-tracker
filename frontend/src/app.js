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
        alert('Health data saved successfully!')
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
})

// set default date to today
$(function () {
  const today = new Date().toISOString().split('T')[0]
  $('#date').val(today)
})
