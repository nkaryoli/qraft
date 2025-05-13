import { SignIn, SignUp } from '@clerk/clerk-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dark } from '@clerk/themes';

const SignInPage = () => {
    return (
        <section className="flex justify-center items-center w-full py-32 lg:pt-52 px-6">
            <Tabs
                defaultValue="signIn"
                className="lg:flex-row-reverse bg-gradient-to-br from-background via-muted/80 to-background lg:bg-gradient-to-br lg:from-background lg:via-background lg:to-background  rounded-xl lg:border-2 gap-3 lg:gap-0"
            >
                <div className="w-full lg:w-1/2 flex flex-col items-center gap-9 lg:bg-gradient-to-br lg:from-background lg:via-muted/80 to-background rounded-xl pt-16 lg:pt-32 px-[10vw] lg:px-[5vw]">
                    <h1 className="text-4xl lg:text-5xl text-center font-extrabold">
                        Welcome back!
                    </h1>
                    <TabsList className="w-full h-13 max-w-xl bg-card p-2">
                        <TabsTrigger value="signIn" className="text-bold text-primary-foreground">
                            Sign In
                        </TabsTrigger>
                        <TabsTrigger value="signUp" className="text-bold text-primary-foreground">
                            Sign Up
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="signIn">
                        <h1>esto es SigIn</h1> {/* <= ToDo: textos */}
                    </TabsContent>
                    <TabsContent value="signUp">
                        <h1>esto es SignUp</h1> {/* <= ToDo: textos */}
                    </TabsContent>
                </div>
                <TabsContent
                    value="signIn"
                    className="flex items-center justify-center  px-[10vw] pb-[10vw] lg:p-20"
                >
                    <SignIn
                        fallbackRedirectUrl="/"
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
                            },
                        }}
                    />
                </TabsContent>
                <TabsContent
                    value="signUp"
                    className="flex items-center justify-center px-[10vw] pb-[10vw] lg:p-20"
                >
                    <SignUp
                        fallbackRedirectUrl="/"
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
            </Tabs>
        </section>
    );
};

export default SignInPage;
