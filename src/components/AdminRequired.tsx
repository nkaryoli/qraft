import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";
import { CreateOrganization } from "@clerk/clerk-react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

const AdminRequired = () => {
    const navigate = useNavigate();
    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            <motion.div 
                className="max-w-md text-center space-y-6 p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div 
                    className="mx-auto w-fit text-primary p-4 rounded-full bg-primary/10"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Building2 size={42} />
                </motion.div>

                <div className="space-y-3">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Organization Admin Required
                    </h2>
                    <p className="text-muted-foreground">
                        To create badges, you need to be an organization administrator. 
                        Create an organization or join one as an admin to access this feature.
                    </p>
                </div>

                <div className="space-y-3">
                    <Dialog>
							<DialogTrigger asChild>
								<Button className="w-full group">
									<Building2 className="h-4 w-4" />
									Create Organization
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Button>
							</DialogTrigger>
						<DialogContent className="w-fit">
							<div className="w-full max-w-5xl flex flex-col items-center justify-center gap-9">
								<DialogTitle></DialogTitle>
								<CreateOrganization
									afterCreateOrganizationUrl={'/customize'}
									skipInvitationScreen
									appearance={{
										variables: {
											colorPrimary: '#db073d',
											colorBackground: '#040708',
											colorTextOnPrimaryBackground: '#ffffff',
											colorText: '#eaeaea',
										},
										elements: {
											card: {
												background: 'linear-gradient(to bottom right, #000000, #060c0f)',
											},
										},
									}}
								/>
							</div>
						</DialogContent>
					</Dialog>
                    <Button 
                        variant="ghost" 
                        className="w-full"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </Button>
                </div>
            </motion.div>
			
        </div>
    );
};

export default AdminRequired;