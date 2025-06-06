import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useSupabase } from '@/hooks/useSupabaseAuth';
import { OrganizationsAPI } from '@/api/apiOrganizations';
import type { Organization, OrganizationInput, QRCode } from '@/supabase/types';
import { BarLoader } from 'react-spinners';
import { QRCodeAPI } from '@/api/apiQRCode';
import QRDisplay from '@/components/qrCode/QRDisplay';

const Dashboard = () => {
    const { user } = useUser();
    const supabase = useSupabase();
    const [orgs, setOrgs] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);
    const [qr, setQr] = useState<QRCode[]>([]);

    console.log(user);
    // Cargar organizaciones del usuario
    useEffect(() => {
        if (!supabase || !user?.id) return;

        const loadOrgs = async () => {
            try {
                setLoading(true);
                const orgApi = OrganizationsAPI(supabase);
                const userOrgs = await orgApi.getUserOrganizations(user.id);
                setOrgs(userOrgs);
            } catch (error) {
                console.error('Error loading organizations:', error);
            } finally {
                setLoading(false);
            }
        };

        const loadQRs = async () => {
            try {
                setLoading(true);
                const qrApi = QRCodeAPI(supabase);
                const userQR = await qrApi.getQRCode(user.id);
                setQr(userQR);
            } catch (error) {
                console.error('Error loading qrs:', error);
            } finally {
                setLoading(false);
            }
        };

        loadQRs();
        loadOrgs();
    }, [supabase, user?.id]);
    console.log(qr);
    // Crear nueva organización
    const handleCreateOrg = async () => {
        if (!supabase || !user?.id) return;

        try {
            const newOrg: OrganizationInput = {
                name: 'Mippp Nueva Escuela',
                slug: 'mi-escuela-' + Math.random().toString(36).substring(2, 6),
                logo_url:
                    'https://ujchqjqvkworevjmpefo.supabase.co/storage/v1/object/public/organization-logo//qrNK.svg',
                theme: {
                    background: '#3b82f6',
                },
                owner_id: user.id,
            };

            const orgApi = OrganizationsAPI(supabase);
            const createdOrg = await orgApi.create(newOrg);
            setOrgs([...orgs, createdOrg]);
        } catch (error) {
            alert('Error creating organization: ' + (error as Error).message);
        }
    };

    const handleDeleteQR = async (qrId: number) => {
        if (!supabase || !user?.id) return;

        try {
            const qrApi = QRCodeAPI(supabase);
            await qrApi.delete(qrId);
        } catch (error) {
            alert('Error deleting QRCODE: ' + (error as Error).message);
        }
    };

    if (loading) return <div>Loading organizations...</div>;

    return (
        <>
            {loading && <BarLoader className="absolute mb-4" width={'100%'} color="#db073d" />}
            {!loading && (
                <div className="p-32">
                    <h1 className="text-2xl font-bold mb-4">Your QR Codes</h1>

                    <button
                        onClick={handleCreateOrg}
                        className="hidden bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    >
                        Create New Organization
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {qr.map((qr) => (
                            <div key={qr.id} className="border p-4 rounded-lg">
                                <h2 className="text-xl font-semibold">
                                    {qr.qr_data}
                                    {qr.title}
                                </h2>
                                <QRDisplay config={qr.qr_template} />
                                <button
                                    onClick={() => handleDeleteQR(qr.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded mb-4"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                // <div className="p-32">
                //     <h1 className="text-2xl font-bold mb-4">Your Organizations</h1>

                //     <button
                //         onClick={handleCreateOrg}
                //         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                //     >
                //         Create New Organization
                //     </button>

                //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                //         {orgs.map((org) => (
                //             <div key={org.id} className="border p-4 rounded-lg">
                //                 <h2 className="text-xl font-semibold">{org.name}</h2>
                //                 <p className="text-gray-600">qraft.dev/orgs/{org.slug}</p>
                //                 <div
                //                     className="h-4 mt-2 rounded"
                //                     style={{ backgroundColor: org.theme.background }}
                //                 />
                //             </div>
                //         ))}
                //     </div>
                // </div>
            )}
        </>
    );
};

export default Dashboard;
