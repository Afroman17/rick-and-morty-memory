# Rick and Morty — Juego de Memoria

Aplicación web desarrollada con React y TypeScript que permite autenticarse y jugar un juego de memoria con personajes de Rick and Morty.

---

## Credenciales de acceso

| Campo | Valor |
|-------|-------|
| Correo | `admin@rickandmorty.com` |
| Contraseña | `rick123` |

---

## Instrucciones para correr el proyecto

### Requisitos

- Node.js `>= 20.9.0`
- npm `>= 10`

### Instalación y ejecución

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd rick-and-morty-memory

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

```bash
# Build de producción
npm run build

# Preview del build
npm run preview
```

---

## Enfoque de desarrollo

El desarrollo siguió un flujo feature-first, planificando cada vista antes de implementarla:

1. **Scaffolding** — Vite + React + TypeScript como base
2. **Autenticación** — Firebase Auth antes de cualquier vista protegida
3. **Vista Home** — Preview de personajes con fetch desde la API
4. **Vista de Juego** — Lógica del memory game encapsulada en un custom hook
5. **Vista de Resultado** — Pantalla final con opción de repetir o volver al inicio
6. **Pulido** — Estandarización de tokens CSS, interceptors de Axios, corrección de bugs

La UI se construyó fielmente al diseño de Figma provisto, adaptando colores, tipografía y espaciados como variables CSS centralizadas.

---

## Decisiones técnicas

### Vite en lugar de Create React App
CRA está deprecado. Vite ofrece HMR instantáneo y build significativamente más rápido.

### CSS Modules en lugar de una UI library
El enunciado prohíbe UI frameworks como Bootstrap o Material UI. CSS Modules permite estilos completamente personalizados, con scope automático por componente y sin riesgo de colisiones de nombres.

### React Hook Form
Manejo de formularios sin re-renders innecesarios. Validación declarativa y acceso directo a errores por campo, ideal para el formulario de login.

### TanStack Query + Axios
- **TanStack Query** gestiona el estado del servidor: cache, loading, error y refetch de forma declarativa. `refetchOnWindowFocus: false` evita fetches inesperados al cambiar de pestaña. `gcTime: 0` en la query de Home garantiza que al volver desde el resultado no se muestren personajes cacheados de la partida anterior.
- **Axios** centraliza la configuración HTTP. El interceptor de request obtiene el JWT real de Firebase (`user.getIdToken()`) y lo adjunta como `Authorization: Bearer` en cada petición. El interceptor de respuesta redirige al login ante un 401.

### Firebase Authentication
La autenticación usa Firebase Auth (`signInWithEmailAndPassword`, `signOut`, `onAuthStateChanged`). Firebase gestiona el ciclo de vida del JWT (emisión, refresco automático, expiración) de forma completamente transparente. El estado de autenticación persiste entre recargas gracias al listener `onAuthStateChanged`, que también es la fuente de verdad para el objeto `User` expuesto en el contexto.

### Custom hook `useGameLogic`
Toda la lógica del juego (shuffle, preview, flip, match, contadores, condición de victoria) vive en un hook independiente del componente. Esto facilita el testing y mantiene los componentes enfocados en renderizado.

### Personajes aleatorios por partida
La API de Rick and Morty expone personajes por ID. Se generan 6 IDs únicos aleatorios entre 1 y 826 para cada partida, usando `queryKey` con timestamp para evitar que TanStack Query sirva datos cacheados de partidas anteriores.

### Consistencia Home → Juego
Los personajes del preview en Home se pasan al Game vía `navigation state` de React Router. Así el usuario ve exactamente los mismos personajes que jugará. Al usar "Repetir", el Game fetchea personajes nuevos directamente.

---

## Estructura del proyecto

```
src/
├── api/
│   ├── client.ts          # Instancia Axios + interceptors
│   └── characters.ts      # Fetch de personajes aleatorios
├── auth/
│   ├── AuthContext.tsx     # Firebase Auth: login, logout, estado
│   └── ProtectedRoute.tsx # Redirige si no autenticado
├── components/
│   ├── Button/            # Variantes: teal, game, inverted
│   ├── CharacterCard/     # Card del preview en Home
│   ├── GameCard/          # Card con flip 3D para el juego
│   ├── Header/            # Logo + badge compartido
│   ├── LoginForm/         # Form con React Hook Form
│   └── ScoreBar/          # Aciertos y Turnos
├── hooks/
│   └── useGameLogic.ts    # Lógica completa del juego
├── lib/
│   └── firebase.ts        # Inicialización de Firebase
├── pages/
│   ├── LoginPage/
│   ├── HomePage/
│   ├── GamePage/
│   └── ResultPage/
├── styles/
│   └── variables.css      # Design tokens (colores, spacing, radios)
└── types/
    └── index.ts           # Interfaces TypeScript
```

---

## Stack

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| React | 19 | UI |
| TypeScript | 5.9 | Tipado estático |
| Vite | 5.4 | Build tool |
| React Router | 7 | Navegación |
| TanStack Query | 5 | Estado del servidor |
| Axios | 1.13 | Cliente HTTP |
| React Hook Form | 7 | Formularios |
| Firebase Auth | 12 | Autenticación |
| CSS Modules | — | Estilos scoped |

---

## API utilizada

[The Rick and Morty API](https://rickandmortyapi.com/) — API pública REST. Se consumen personajes por ID aleatorio: `GET /character/{ids}`.
