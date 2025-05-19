import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    title: "Customizable Badges",
    description: "Create unique designs with your logo, brand colors, and specific information.",
    // icon: Icons.palette,
    color: "primary"
  },
  {
    title: "Member Management",
    description: "Easily manage badges for all members of your organization.",
    // icon: Icons.users,
    color: "accent"
  },
  {
    title: "Professional Templates",
    description: "Choose from multiple templates designed for different types of organizations.",
    // icon: Icons.template,
    color: "secondary"
  },
  {
    title: "Instant Access",
    description: "Scan the QR to instantly access contact information and profile.",
    // icon: Icons.zap,
    color: "primary"
  },
  {
    title: "Advanced Security",
    description: "Protect information with encryption and access controls.",
    // icon: Icons.shield,
    color: "accent"
  },
  {
    title: "Usage Analytics",
    description: "Get data on how many times each badge has been scanned.",
    // icon: Icons.barChart,
    color: "secondary"
  }
];


const FeaturesSection = () => {
  return (
	<section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Powerful Features for <span className="text-primary">Your Organization</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Designed for teams that need professional identification and access management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-${feature.color}/10 text-${feature.color}`}>
                      {/* <feature.icon className="h-6 w-6" /> */}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}

export default FeaturesSection