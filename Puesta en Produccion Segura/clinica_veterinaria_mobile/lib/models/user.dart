class User {
  final String email;
  final String role;

  const User({required this.email, required this.role});

  factory User.fromJson(Map<String, dynamic> json) => User(
        email: json['email'] as String,
        role: json['role'] as String,
      );
}
