async function jog(direction) {
  await fetch('/jog', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({direction: direction, distance: 10})
  });
}

async function testFire() {
  if(confirm('Fire laser for 0.5s?')) {
    await fetch('/laser/fire', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({power: 10, duration: 0.5})
    });
  }
}

function refreshPage() {
  window.location.reload()
}

document.addEventListener('DOMContentLoaded', async () => {
  let laserConnecting = document.querySelector('.laser-connecting')

  laserConnecting.style.display = 'block'

  let response = await fetch('/connect', { headers: {}, method: 'POST', body: JSON.stringify({}) })

  let data = await response.json()

  if(data.message){
    laserConnecting.innerText = data.message
  } else {
    laserConnecting.innerText = 'Laser Connected'
  }
})