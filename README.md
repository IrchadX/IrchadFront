# IrchadFront

IrchadFront is the frontend application for the **Irchad** platform, a smart navigation system web dashboard designed to provide role-based access and management capabilities. The platform serves three distinct user roles: Admin, Commercial, and Decideur, each with tailored interfaces and functionalities.

## 🚀 Features

- 📊 Role-based dashboards (Admin, Commercial, Decideur)
- 🔐 Secure authentication system
- 🌍 Multilingual support
- 🌓 Theme switching (light/dark)
- 👤 User profile management
- ⚙️ Admin panel for system management
- 🔄 Real-time data updates

## 🛠️ Tech Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks, Context API
- **Icons**: Lucide-react
- **API Communication**: RESTful API via Axios
- **Localization**: i18n (multi-language support)

## 🧪 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/IrchadX/IrchadFront.git
cd IrchadFront
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env.local`
```bash
NEXT_PUBLIC_API_URL="https://apigateway-production-b99d.up.railway.app/api/v1/web"
API_URL="https://apigateway-production-b99d.up.railway.app/api/v1/web"
AUTH_URL="https://apigateway-production-b99d.up.railway.app/api/v1/web"
API_GATEWAY="https://apigateway-production-b99d.up.railway.app"
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗂️ Project Structure

```
/app
  /admin          # Admin role pages and layouts
  /commercial     # Commercial role pages and layouts
  /decideur       # Decideur role pages and layouts
  /auth           # Authentication pages (login, register, etc.)
  /api            # API route handlers for backend communication

/components
  /admin          # Admin-specific components
  /commercial     # Commercial-specific components
  /decideur       # Decideur-specific components
  /shared         # Reusable components across all roles

/data             # Static data and mock data
/providers        # Context providers (Auth, Theme, etc.)
/utils            # Utility functions and helpers
```

## 🔑 Demo Credentials

To test the application, you can use the following demo accounts:

### Admin Access
- **Email**: lw_messikh@esi.dz
- **Password**: wissal123

### Commercial Access
- **Email**: cerise@gmail.com
- **Password**: cerise

### Decideur Access
- **Email**: lb_bouchra@esi.dz
- **Password**: bouchra123

## 🎯 User Roles

### Admin
- Full system management capabilities
- User management and role assignment
- System configuration and settings
- Analytics and reporting

### Commercial
- Client management
- Sales tracking and reporting
- Commercial analytics
- Lead management

### Decideur
- Executive dashboard
- Decision-making analytics
- High-level system overview
- Strategic reporting

## 🌐 API Integration

The application connects to a deployed backend API gateway. All API endpoints are configured through environment variables, making it easy to switch between development and production environments.

## 📦 Deployment

This project is optimized for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- Docker containers
- Any Node.js hosting environment

**Note**: The frontend is currently not deployed but connects to a live backend API.

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Variables

Make sure to set up your environment variables properly:
- `NEXT_PUBLIC_API_URL`: Public API endpoint for client-side requests
- `API_URL`: Server-side API endpoint
- `AUTH_URL`: Authentication service endpoint
- `API_GATEWAY`: Main API gateway URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

All contributions are welcome! Please ensure your code follows the project's style guidelines.

## 📄 License

This project is proprietary software developed for the Irchad platform By Xceed.

## 📞 Support

For support and questions, please contact the Xceed development team or create an issue in the repository.
