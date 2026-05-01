import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:clinica_veterinaria_mobile/main.dart';
import 'package:clinica_veterinaria_mobile/services/auth_service.dart';

void main() {
  testWidgets('App arranca y muestra pantalla de login', (tester) async {
    await tester.pumpWidget(
      ChangeNotifierProvider(
        create: (_) => AuthService(),
        child: const ClinicaVetApp(),
      ),
    );
    await tester.pump();
    expect(find.text('Clínica Veterinaria'), findsOneWidget);
  });
}
