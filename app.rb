require 'sinatra'
require 'serialport'

# Configure for Pi
set :bind, '0.0.0.0'
set :port, 4567

# Serial connection to laser
$laser = nil

get '/' do
  erb :control_panel
end

post '/jog' do
  return { status: 'unprocessible_entity', message: 'Please Connect Laser' } unless $laser

  direction = params[:direction]
  distance = params[:distance]

  # Send G-code jog command
  $laser.write("G91\n") # Relative positioning
  $laser.write("G0 X#{distance}\n") if direction == 'right'
  # ... handle other directions

  { status: 'ok' }.to_json
end

post '/connect' do
  return { status: 'ok' }.to_json if $laser

   $laser = SerialPort.new('/dev/ttyUSB0', 115200)
   { status: 'ok', message: 'Laser Connected' }.to_json
rescue
   { status: 'ok', message: 'laser Connections failed'}.to_json
end