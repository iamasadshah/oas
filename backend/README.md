# Backend - Online Attendance System

## Technologies Used

### Core Dependencies

- **Node.js**: JavaScript runtime environment
- **Express.js** (v4.21.2): Web application framework
- **MongoDB**: NoSQL database
- **Mongoose** (v8.10.0): MongoDB object modeling

### Security

- **bcryptjs** (v2.4.3): Password hashing
- **jsonwebtoken** (v9.0.2): JWT authentication
- **cors** (v2.8.5): Cross-origin resource sharing

### Development

- **nodemon** (v3.1.9): Development server with auto-reload
- **dotenv** (v16.4.7): Environment variable management

## Project Structure

```
backend/
├── middleware/              # Express middleware
│   ├── auth.js             # Authentication middleware
│   └── validator.js        # Request validation
├── models/                 # Database models
│   ├── User.js            # User schema
│   └── Attendance.js      # Attendance schema
├── routes/                # API routes
│   ├── auth.js           # Authentication routes
│   ├── attendance.js     # Attendance routes
│   └── admin.js          # Admin routes
├── config/               # Configuration files
│   └── db.js            # Database configuration
├── utils/               # Utility functions
│   └── helpers.js       # Helper functions
├── .env.local          # Environment variables
└── server.js           # Server entry point
```

## Setup Instructions

1. **Installation**

   ```bash
   npm install
   ```

2. **Environment Setup**
   Create `.env.local` file with:

   ```
   PORT=5000
   MONGO_URI=Your mongoDB URI
   JWT_SECRET=your_secret_key_here
   ```

3. **Development**

   ```bash
   npx nodemon server.js
   ```

4. **Production**
   ```bash
   node server.js
   ```

## API Endpoints

### Authentication

```javascript
POST / api / auth / register; // Register new user
POST / api / auth / login; // User login
GET / api / auth / me; // Get current user
```

### Attendance

```javascript
GET /api/attendance/:userId    // Get user attendance
POST /api/attendance          // Mark attendance
PUT /api/attendance/:id       // Update attendance
DELETE /api/attendance/:id    // Delete attendance
```

### Admin

```javascript
GET /api/admin/users          // Get all users
POST /api/admin/users         // Create user
PUT /api/admin/users/:id      // Update user
DELETE /api/admin/users/:id   // Delete user
```

## Database Schema

### User Model

```javascript
{
  name: String,
  email: String,
  password: String,
  role: String,
  department: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Attendance Model

```javascript
{
  userId: ObjectId,
  date: Date,
  checkIn: Date,
  checkOut: Date,
  status: String,
  notes: String
}
```

## Security Implementation

### Authentication

- JWT-based authentication
- Password hashing with bcrypt
- Token expiration and refresh

### Authorization

- Role-based access control
- Route protection middleware
- Permission checking

### Data Protection

- Input validation
- XSS prevention
- CORS configuration

## Error Handling

### Global Error Handler

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message,
  });
});
```

### Validation Errors

```javascript
if (!errors.isEmpty()) {
  return res.status(400).json({
    success: false,
    errors: errors.array(),
  });
}
```

## Performance Optimization

### Database

- Indexing on frequently queried fields
- Query optimization
- Connection pooling

### API

- Response compression
- Caching strategies
- Rate limiting

## Testing

### API Testing

- Use Postman or similar tools
- Test all endpoints
- Verify error handling
- Check authentication

### Database Testing

- Test CRUD operations
- Verify data integrity
- Check indexing performance

## Troubleshooting

### Common Issues

1. **MongoDB Connection**

   ```bash
   # Check MongoDB service
   sudo service mongod status

   # Verify connection string
   mongodb://localhost:27017/attendance-system
   ```

2. **Port Conflicts**

   ```bash
   # Check if port is in use
   netstat -ano | findstr :5000

   # Kill process using port
   taskkill /PID <process_id> /F
   ```

3. **Dependencies**

   ```bash
   # Clear npm cache
   npm cache clean --force

   # Reinstall dependencies
   rm -rf node_modules
   npm install
   ```

## Best Practices

### Code Organization

- Follow MVC pattern
- Use middleware effectively
- Implement proper error handling
- Write meaningful comments

### Security

- Keep dependencies updated
- Use environment variables
- Implement proper validation
- Follow security best practices

## Contributing

1. Follow the existing code style
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## License

This project is licensed under the MIT License.
