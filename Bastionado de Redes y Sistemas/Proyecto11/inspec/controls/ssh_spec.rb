control 'ssh-01-root-login' do
  title 'SSH: Login de root deshabilitado'
  desc 'El login directo de root por SSH debe estar deshabilitado'

  describe sshd_config do
    its('PermitRootLogin') { should eq 'no' }
  end
end

control 'ssh-02-max-auth-tries' do
  title 'SSH: Maximo de intentos de autenticacion limitado a 3'
  desc 'Los intentos de autenticacion SSH deben limitarse para evitar fuerza bruta'

  describe sshd_config do
    its('MaxAuthTries') { should eq '3' }
  end
end

control 'ssh-03-x11-forwarding' do
  title 'SSH: X11 Forwarding deshabilitado'
  desc 'X11 Forwarding debe estar deshabilitado para reducir la superficie de ataque'

  describe sshd_config do
    its('X11Forwarding') { should eq 'no' }
  end
end

control 'ssh-04-empty-passwords' do
  title 'SSH: Contrasenas vacias deshabilitadas'
  desc 'No se deben permitir contrasenas vacias en SSH'

  describe sshd_config do
    its('PermitEmptyPasswords') { should eq 'no' }
  end
end

control 'ssh-05-service-running' do
  title 'SSH: Proceso en ejecucion y escuchando en puerto 22'
  desc 'El proceso sshd debe estar activo y escuchando en el puerto 22'

  describe command('pgrep sshd') do
    its('exit_status') { should eq 0 }
  end

  describe port(22) do
    it { should be_listening }
    its('protocols') { should include 'tcp' }
  end
end
