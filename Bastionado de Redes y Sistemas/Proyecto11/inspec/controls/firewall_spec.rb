control 'fw-01-input-policy-drop' do
  title 'Cortafuegos: Politica INPUT por defecto en DROP'
  desc 'La cadena INPUT de iptables debe tener politica DROP para bloquear trafico no autorizado'

  describe command('iptables -L INPUT -n') do
    its('stdout') { should match /Chain INPUT \(policy DROP\)/ }
    its('exit_status') { should eq 0 }
  end
end

control 'fw-02-forward-policy-drop' do
  title 'Cortafuegos: Politica FORWARD por defecto en DROP'
  desc 'La cadena FORWARD de iptables debe tener politica DROP para evitar enrutamiento no autorizado'

  describe command('iptables -L FORWARD -n') do
    its('stdout') { should match /Chain FORWARD \(policy DROP\)/ }
    its('exit_status') { should eq 0 }
  end
end

control 'fw-03-ssh-allowed' do
  title 'Cortafuegos: SSH permitido desde red interna'
  desc 'El puerto SSH (22) debe estar permitido solo desde la red 172.20.0.0/24'

  describe command('iptables -L INPUT -n --line-numbers') do
    its('stdout') { should match /ACCEPT.*tcp.*172\.20\.0\.0\/24.*dpt:22/ }
  end
end

control 'fw-04-http-allowed' do
  title 'Cortafuegos: HTTP permitido en puerto 80'
  desc 'El puerto HTTP (80) debe estar accesible para servir contenido web'

  describe command('iptables -L INPUT -n --line-numbers') do
    its('stdout') { should match /ACCEPT.*tcp.*dpt:80/ }
  end
end

control 'fw-05-logging-enabled' do
  title 'Cortafuegos: Registro de paquetes rechazados activo'
  desc 'Los paquetes rechazados deben registrarse con el prefijo IPT-DROP para analisis posterior'

  describe command('iptables -L INPUT -n') do
    its('stdout') { should match /LOG/ }
  end
end
