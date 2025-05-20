import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent } from '@/components/ui/dialog';
import { OrganizationList } from '@clerk/clerk-react';

interface MyOrganizationsProps {
    onOrgSelect: (orgId: string) => void;
    onClose: () => void;
}

const MyOrganizations: React.FC<MyOrganizationsProps> = ({ onOrgSelect, onClose }) => {
    return (
        <Dialog
            open
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <DialogContent className="w-fit">
                <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-9">
                    <DialogTitle>
                        <h2>My Organizations</h2>
                    </DialogTitle>
                    <OrganizationList
                        hidePersonal
                        afterSelectOrganizationUrl={(org) => {
                            onOrgSelect(org.id);
                            return '#';
                        }}
                        appearance={{
                            variables: {
                                colorPrimary: '#db073d',
                                colorBackground: '#040708',
                                colorTextOnPrimaryBackground: '#ffffff',
                                borderRadius: '4px',
                                colorText: '#eaeaea',
                            },
                            elements: {
                                card: {
                                    padding: '0',
                                    background:
                                        'linear-gradient(to bottom right, #000000, #060c0f)',
                                },
                                header: {
                                    display: 'none',
                                },
                                organizationListCreateOrganizationActionButton: {
                                    display: 'none',
                                },
                            },
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MyOrganizations;
