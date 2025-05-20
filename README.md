# Qraft - Smart Digital Identity Platform

[![Built with Clerk](https://img.shields.io/badge/Built%20with-Clerk-blue)](https://clerk.com/)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb.svg)](https://reactjs.org/)
[![Database: Supabase](https://img.shields.io/badge/Database-Supabase-green)](https://supabase.com/)

## 🌟 Overview

Qraft is a modern solution for digital identity management, combining powerful QR code generation with organizational badge systems. Built for the [Clerk Hackathon 2025](https://github.com/midudev/hackaton-clerk-2025), Qraft helps organizations create, manage, and distribute digital identifications seamlessly.

## ✨ Key Features

- 🎨 **Custom QR Designer**
  - Rich customization options
  - Real-time preview
  - Multiple design templates
  - Logo integration

- 🆔 **Digital Badge System**
  - Organization-specific templates
  - Role-based management
  - Automated QR code generation
  - Secure sharing options

- 🔐 **Smart Authentication**
  - Secure organization management
  - Role-based access control
  - Protected routes
  - Member invitations

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [Supabase](https://supabase.com/)
- **Styling:** TailwindCSS + [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** Framer Motion
## 📸 Screenshots

![QRaft Code home](/public/qraft-home.png)

![QRaft Code home](/public/qraft-signin.png)

![QRaft Code home](/public/qraft-qr-demo.png)

![QRaft Code home](/public/qraft-badge-demo.png)

![QRaft Code home](/public/qraft-qr-saved.png)

![QRaft Code home](/public/qraft-dashboard.png)

### Click [ 🌐 here](https://qraft-two.vercel.app/) to see the app. 🚀


## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/nkaryoli/qraft.git
cd qraft
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```
4. Update the `.env` file with your credentials:
- Get your Clerk keys from [Clerk Dashboard](https://dashboard.clerk.com)
- Get your Supabase keys from [Supabase Dashboard](https://app.supabase.com)

5. **Configure environment variables**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

6. **Run the development server**
```bash
pnpm run dev
```

## 📱 Usage Examples

### Creating a Custom QR Code
1. Navigate to the QR Designer
2. Enter your content
3. Customize design options
4. Preview and download

### Managing Organization Badges
1. Create an organization
2. Select a badge template
3. Invite members
4. Manage badge distribution

## 🎯 Project Goals

- Simplify digital identity management
- Provide secure and customizable solutions
- Enable easy organization management
- Create beautiful, functional designs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Submission

This project was created for the [Clerk Hackathon 2025](https://github.com/midudev/hackaton-clerk-2025), focusing on innovative authentication implementations and user management solutions.



## 👥 Author

- Karyoli Nieves
- [GitHub Profile](https://github.com/nkaryoli)
