import { SignIn, SignUp } from '@clerk/clerk-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dark } from '@clerk/themes';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignInPage = () => {
    const location = useLocation();
    const urlData = location.state || {};
    const redirect = typeof urlData === 'string' ? `/${urlData}` : '/';

    return (
        <motion.section 
            className="flex justify-center items-center w-full py-32 lg:pt-52 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="hover:shadow-lg transition-shadow bg-gradient-to-r from-primary via-background to-muted rounded-xl p-0.5"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                <Tabs
                    defaultValue="signIn"
                    className="lg:flex-row-reverse bg-gradient-to-r from-black via-background to-muted rounded-xl gap-3 lg:gap-0"
                >
                    <motion.div 
                        className="w-full lg:w-1/2 flex flex-col items-center gap-9 rounded-xl pt-16 lg:pt-32 px-[10vw] lg:px-[5vw]"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <motion.div
                            className="text-center space-y-3 max-w-md"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                        >
                            <TabsContent value="signIn">
                                <h2 className="text-4xl font-bold mb-6 text-foreground">
                                    Welcome Back to Qraft
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    Sign in to manage your QR badges, access your templates, and continue creating amazing digital identities.
                                </p>
                            </TabsContent>

                            <TabsContent value="signUp">
                                <h2 className="text-4xl font-bold mb-6 text-foreground">
                                    Join Qraft Today
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    Create an account to start designing professional QR badges, manage organizations, and streamline your digital identity workflow.
                                </p>
                            </TabsContent>
                        </motion.div>

                        <TabsList className="w-full h-13 max-w-xl bg-card p-2 mt-4">
                            <TabsTrigger value="signIn" className="text-bold text-primary-foreground hover:scale-[1.01} transition-transform">
                                Sign In
                            </TabsTrigger>
                            <TabsTrigger value="signUp" className="text-bold text-primary-foreground hover:scale-[1.01] transition-transform">
                                Sign Up
                            </TabsTrigger>
                        </TabsList>
                    </motion.div>

                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <TabsContent
                            value="signIn"
                            className="flex items-center justify-center  px-[10vw] pb-[10vw] lg:p-20"
                        >
                            <SignIn
                                fallbackRedirectUrl={redirect}
                                appearance={{
                                    baseTheme: [dark],
                                    variables: {
                                        colorPrimary: '#db073d',
                                        colorBackground: '#0d1317',
                                        colorTextOnPrimaryBackground: '#ffffff',
                                    },
                                    elements: {
                                        headerSubtitle: {
                                            display: 'none',
                                        },
                                        cardBox: {
                                            boxShadow:
                                                'rgba(0, 0, 0, 0.08) 0px 5px 15px 0px, rgba(255, 255, 255, 0.07) 0px 0px 0px 1px',
                                        },
                                        formFieldInput: {
                                            height: '40px',
                                        },
                                        footerAction: {
                                            display: 'none',
                                        },
                                        formButtonPrimary: {
                                            height: '40px',
                                        },
                                        card: {
                                            backgroundColor: '#0d1317aa',
                                        },
                                    },
                                }}
                            />
                        </TabsContent>

                        <TabsContent
                            value="signUp"
                            className="flex items-center justify-center px-[10vw] pb-[10vw] lg:p-20"
                        >
                            <SignUp
                                fallbackRedirectUrl={redirect}
                                appearance={{
                                    baseTheme: [dark],
                                    variables: {
                                        colorPrimary: '#db073d',
                                        colorBackground: '#0d1317',
                                        colorTextOnPrimaryBackground: '#ffffff',
                                    },
                                    elements: {
                                        headerSubtitle: {
                                            display: 'none',
                                        },
                                        footerAction: {
                                            display: 'none',
                                        },
                                        formButtonPrimary: {
                                            height: '40px',
                                        },
                                        formFieldInput: {
                                            height: '40px',
                                        },
                                    },
                                }}
                            />
                        </TabsContent>
                    </motion.div>
                </Tabs>
            </motion.div>
        </motion.section>
    );
};

export default SignInPage;
