# Frontend - Online Attendance System

## Technologies Used

### Core Dependencies

- **React.js** (v18.3.1): Frontend library for building user interfaces
- **React DOM** (v18.3.1): React rendering for web applications
- **React Router DOM** (v7.1.5): Client-side routing
- **React Scripts** (v5.0.1): Configuration and scripts for Create React App

### UI and Styling

- **React Icons** (v5.4.0): Icon components library
- **React Datepicker** (v8.0.0): Date selection component

### Data Management

- **Axios** (v1.7.9): HTTP client for API requests
- **JWT Decode** (v4.0.0): JWT token decoding
- **Moment** (v2.30.1): Date manipulation library

### Development Tools

- **Web Vitals** (v4.2.4): Performance measurement
- **ESLint**: Code linting
- **Create React App**: Project bootstrapping

## Project Structure

```
frontend/
├── public/                 # Static files
├── src/                    # Source code
│   ├── assets/            # Images and static assets
│   │   ├── common/       # Shared components
│   │   ├── admin/        # Admin-specific components
│   │   └── employee/     # Employee-specific components
│   ├── pages/            # Page components
│   ├── context/          # Context providers
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utility functions
│   ├── services/         # API services
│   ├── styles/           # Global styles
│   ├── App.js            # Root component
│   └── index.js          # Entry point
└── package.json          # Dependencies and scripts
```

## Setup Instructions

1. **Installation**

   ```bash
   npm install
   ```

2. **Development**

   ```bash
   npm start
   ```

   Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

3. **Production Build**

   ```bash
   npm run build
   ```

   Creates optimized production build in `build` folder

4. **Testing**
   ```bash
   npm test
   ```
   Runs the test suite in interactive watch mode

## Key Features

### Authentication

- JWT-based authentication
- Protected routes
- Role-based access control

### User Interface

- Responsive design
- Modern UI components
- Interactive date picker
- Toast notifications

### Data Management

- API integration with Axios
- JWT token handling
- Date formatting with Moment.js

### Performance

- Code splitting
- Lazy loading
- Performance monitoring with Web Vitals

## Development Guidelines

### Code Style

- Follow ESLint configuration
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments

### Best Practices

- Use proper file structure
- Implement error boundaries
- Follow React best practices
- Maintain clean code principles

## Troubleshooting

### Common Issues

1. **Dependencies**

   ```bash
   # Clear npm cache
   npm cache clean --force

   # Remove node_modules
   rm -rf node_modules

   # Reinstall dependencies
   npm install
   ```

2. **Build Issues**

   ```bash
   # Clear build cache
   rm -rf build

   # Rebuild
   npm run build
   ```

## API Integration

The frontend communicates with the backend API running at `http://localhost:5000`. The proxy is configured in `package.json`:

```json
{
  "proxy": "http://localhost:5000"
}
```

## Browser Support

The application supports:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code style
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## License

This project is licensed under the MIT License.
