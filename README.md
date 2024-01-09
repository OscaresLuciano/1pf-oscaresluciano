# Panel administrativo de cursos, usuarios e inscripciones.

Panel de gestión de cursos, usuarios e inscripciones creado con Angular,  Material y Boostrap. Cada sección tiene su correspondiente ABM y pantalla de detalles.

### Secciones:

- Login
- Home
- Cursos
- Usuarios
- Inscripciones

## Demo desplegada en Firebase

https://pf-oscaresluciano.web.app/

### Usuarios

| Tipo | Usuario | Contraseña | Permisos |
| :-------- | :------- | :--------- | :--------|
| `Administrador` | `admin@mail.com` | `1234` | `Todos` |
| `Empleado` | `employee@mail.com` | `1234` | `Ingreso, crear cursos e inscripciones` |
| `Estudiante` | `ss@mail.com` | `1234` | `Ninguno, sin acceso` |


## Correr localmente

Clonar el proyecto

```bash
  git clone https://github.com/OscaresLuciano/PF-OscaresLuciano/
```

Ir al directorio del proyecto

```bash
  cd PF-OscaresLuciano
```

Instalar dependencias

```bash
  npm install
```

Iniciar el JSON server

```bash
json-server db.json --watch
```

Iniciar el server

```bash
  npm run start
```

## Tech Stack

**Client:** Angular, Typescript, RxJS, NgRx, Material, Bootstrap

**API:** JSON, REST

## Author

- [@oscaresluciano](https://www.github.com/oscaresluciano)
