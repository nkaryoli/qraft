/* eslint-disable @typescript-eslint/no-explicit-any */
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSideBar from './components/DashboardSideBar';
import { useIsMobile } from '@/hooks/useIsMobile';
import CustomTrigger from './components/CustomTrigger';
import { useEffect, useState } from 'react';
import MyTemplates from './components/userTemplates/MyTemplates';
import MyQRs from './components/userQRs/MyQRs';
import type { QRCode } from '@/supabase/types';
import { useQRManager } from '@/hooks/useQRManager';
import { BarLoader, PacmanLoader } from 'react-spinners';
import MyOrganizations from './components/organizations/MyOrganizations';
import CreateOrganization from './components/organizations/CreateOrg';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import OrgProfile from './components/organizations/orgProfile/OrgProfile';

type DashboardComponent = {
    component: React.ComponentType<any>;
    props?: Record<string, any>;
};

const DashboardPage = () => {
    const [active, setActive] = useState<string>('saved-qr');
    const isMobile = useIsMobile(975);
    const [qrs, setQrs] = useState<QRCode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { loadQRs } = useQRManager();
    const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
    const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);

    useEffect(() => {
        const fetchQRs = async () => {
            setIsLoading(true);
            try {
                const data = await loadQRs();
                setQrs(data);
            } catch (error) {
                console.error('Error loading QRs:', error);
                setQrs([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQRs();
    }, [loadQRs]);

    const handleSidebarSelect = (id: string) => {
        setActive(id);
        if (id === 'my-orgs') {
            if (selectedOrgId) {
                setActive('my-orgs');
            }
        }
    };

    const handleOpenOrgModal = () => {
        setIsOrgModalOpen(true);
    };

    const handleOrgSelect = (orgId: string) => {
        setSelectedOrgId(orgId);
        setActive('my-orgs');
        setIsOrgModalOpen(false);
    };

    const components: Record<string, DashboardComponent> = {
        'saved-qr': { component: MyQRs, props: { qrs } },
        'my-templates': { component: MyTemplates, props: { qrs } },
        'my-orgs': {
            component: selectedOrgId ? OrgProfile : MyQRs,
            props: selectedOrgId ? {} : { qrs },
        },
        'create-org': { component: CreateOrganization },
    };

    const { component: ActiveComponent, props } = components[active] || components['saved-qr'];

    return (
        <SidebarProvider open>
            <DashboardSideBar
                onSelect={handleSidebarSelect}
                active={active}
                onOpenOrgModal={handleOpenOrgModal}
            />
            {isMobile && <CustomTrigger className="left-3" />}
            <section className="w-full flex justify-center py-32 px-6">
                {isLoading && (
                    <div className="fixed top-16 left-0 w-full z-50 pointer-events-none">
                        <BarLoader width="100%" color="#db073d" speedMultiplier={0.5} />
                    </div>
                )}
                {qrs?.length === 0 ? (
                    <div className="w-full h-full flex flex-col justify-center max-w-5xl space-y-4">
                        <PacmanLoader
                            size={50}
                            color="#db073d"
                            className="absolute left-[40%]"
                            speedMultiplier={0.5}
                        />
                    </div>
                ) : (
                    <div className="w-full max-w-5xl">
                        {selectedOrgId && active === 'my-orgs' && (
                            <Button
                                variant="ghost"
                                className="mb-4 gap-1.5 text-sm hover:bg-transparent"
                                onClick={() => {
                                    setIsOrgModalOpen(true);
                                }}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Back to organizations list
                            </Button>
                        )}

                        <ActiveComponent {...props} />
                    </div>
                )}
            </section>
            {isOrgModalOpen && (
                <MyOrganizations
                    onOrgSelect={handleOrgSelect}
                    onClose={() => setIsOrgModalOpen(false)}
                />
            )}
        </SidebarProvider>
    );
};

export default DashboardPage;
