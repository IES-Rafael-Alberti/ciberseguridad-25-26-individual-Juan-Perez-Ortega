control 'svc-01-nginx-running' do
  title 'Nginx: Proceso en ejecucion y escuchando en puerto 80'
  desc 'El proceso nginx debe estar activo y el puerto 80 escuchando'

  describe command('pgrep nginx') do
    its('exit_status') { should eq 0 }
  end

  describe port(80) do
    it { should be_listening }
    its('protocols') { should include 'tcp' }
  end
end

control 'svc-02-fail2ban-running' do
  title 'Fail2ban: Proceso en ejecucion'
  desc 'El proceso fail2ban debe estar activo para proteger contra fuerza bruta'

  describe command('pgrep -f fail2ban') do
    its('exit_status') { should eq 0 }
  end
end

control 'svc-03-nginx-security-headers' do
  title 'Nginx: Archivo de cabeceras de seguridad configurado'
  desc 'El archivo de configuracion de cabeceras de seguridad debe existir y contener las directivas correctas'

  describe file('/etc/nginx/conf.d/security-headers.conf') do
    it { should exist }
    its('content') { should match /server_tokens off/ }
    its('content') { should match /X-Frame-Options/ }
    its('content') { should match /X-Content-Type-Options/ }
  end
end

control 'svc-04-fail2ban-ssh-jail' do
  title 'Fail2ban: Jaula SSH configurada'
  desc 'Fail2ban debe tener configurada la proteccion para SSH con maxretry=3'

  describe file('/etc/fail2ban/jail.d/sshd.conf') do
    it { should exist }
    its('content') { should match /enabled = true/ }
    its('content') { should match /maxretry = 3/ }
  end
end

control 'svc-05-iptables-log-file' do
  title 'Logging: Archivo de log de iptables existe'
  desc 'El archivo /var/log/iptables.log debe existir para almacenar los registros del cortafuegos'

  describe file('/var/log/iptables.log') do
    it { should exist }
  end
end
