export type Length = "short" | "moderate" | "long";

export interface CodeSnippet {
  short: string;
  moderate: string;
  long: string;
}

export interface CodeSnippets {
  [language: string]: CodeSnippet;
}

export const CODE_SNIPPETS: CodeSnippets = {
  TypeScript: {
    short: `const add = (a: number, b: number): number => a + b;`,
    moderate: `function greet(name: string): string {
  const greeting = \`Hello, \${name}!\`;
  return greeting;
}

const message = greet("World");
console.log(message);`,
    long: `interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(name: string, email: string): User {
  return {
    id: Math.random(),
    name,
    email
  };
}`,
  },
  JavaScript: {
    short: `const add = (a, b) => a + b;`,
    moderate: `function greet(name) {
  const greeting = \`Hello, \${name}!\`;
  return greeting;
}

const message = greet("World");
console.log(message);`,
    long: `class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getEmail() {
    return this.email;
  }
}`,
  },
  Python: {
    short: `def add(a, b): return a + b`,
    moderate: `def greet(name):
    greeting = f"Hello, {name}!"
    return greeting

message = greet("World")
print(message)`,
    long: `class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
    
    def get_email(self):
        return self.email`,
  },
  Rust: {
    short: `fn add(a: i32, b: i32) -> i32 { a + b }`,
    moderate: `fn greet(name: &str) -> String {
    let greeting = format!("Hello, {}!", name);
    greeting
}

fn main() {
    let message = greet("World");
    println!("{}", message);
}`,
    long: `struct User {
    id: u32,
    name: String,
    email: String,
}

impl User {
    fn new(name: String, email: String) -> Self {
        User { id: 0, name, email }
    }
}`,
  },
  Go: {
    short: `func add(a, b int) int { return a + b }`,
    moderate: `func greet(name string) string {
    greeting := "Hello, " + name + "!"
    return greeting
}

func main() {
    message := greet("World")
    fmt.Println(message)
}`,
    long: `type User struct {
    ID    int
    Name  string
    Email string
}

func NewUser(name, email string) User {
    return User{Name: name, Email: email}
}`,
  },
  Java: {
    short: `int add(int a, int b) { return a + b; }`,
    moderate: `public static String greet(String name) {
    String greeting = "Hello, " + name + "!";
    return greeting;
}

public static void main(String[] args) {
    String message = greet("World");
    System.out.println(message);
}`,
    long: `public class User {
    private int id;
    private String name;
    private String email;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
}`,
  },
  C: {
    short: `int add(int a, int b) { return a + b; }`,
    moderate: `char* greet(char* name) {
    return name;
}

int main() {
    printf("%s\\n", greet("World"));
    return 0;
}`,
    long: `struct User {
    int id;
    char name[50];
    char email[100];
};

struct User create_user(char* name, char* email) {
    struct User u;
    strcpy(u.name, name);
    strcpy(u.email, email);
    return u;
}`,
  },
  "C#": {
    short: `int Add(int a, int b) => a + b;`,
    moderate: `public static string Greet(string name) {
    string greeting = $"Hello, {name}!";
    return greeting;
}

public static void Main() {
    string message = Greet("World");
    Console.WriteLine(message);
}`,
    long: `public class User {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public User(string name, string email) {
        Name = name;
        Email = email;
    }
}`,
  },
  "C++": {
    short: `int add(int a, int b) { return a + b; }`,
    moderate: `std::string greet(const std::string& name) {
    std::string greeting = "Hello, " + name + "!";
    return greeting;
}

int main() {
    std::cout << greet("World") << std::endl;
    return 0;
}`,
    long: `class User {
private:
    int id;
    std::string name;
    std::string email;

public:
    User(const std::string& name, const std::string& email)
        : name(name), email(email) {}
};`,
  },
  SQL: {
    short: `SELECT * FROM users;`,
    moderate: `SELECT name, email 
FROM users 
WHERE id = 1 
ORDER BY name ASC;`,
    long: `CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE
);

INSERT INTO users (name, email) VALUES ('John', 'john@example.com');`,
  },
};

export const DEFAULT_CODE = CODE_SNIPPETS.TypeScript.moderate;
