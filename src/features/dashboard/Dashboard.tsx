import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useSupabase } from '@/hooks/useSupabaseAuth';
import { OrganizationsAPI } from '@/api/apiOrganizations';
import type { Member, MemberInput, Organization, OrganizationInput } from '@/supabase/types';
import { BarLoader } from 'react-spinners';
import { MembersAPI } from '@/api/apiMembers';

const OrgDashboard = () => {
	const { user } = useUser();
	const supabase = useSupabase();
	const [orgs, setOrgs] = useState<Organization[]>([]);
	const [loading, setLoading] = useState(true);

	const [members, setMembers] = useState<Member[]>([]);
	console.log(user)
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

		const loadMembers = async () => {
			try {
				setLoading(true);
				const membersApi = MembersAPI(supabase);
				const dataMembers = await membersApi.getMembers();
				setMembers(dataMembers);
			} catch (error) {
				console.error('Error loading Members:', error);
			} finally {
				setLoading(false);
			}
		};

		loadMembers();
		loadOrgs();
	}, [supabase, user?.id]);

	// Crear nueva organización
	const handleCreateOrg = async () => {
		if (!supabase || !user?.id) return;

		try {
			const newOrg: OrganizationInput = {
				name: 'Mippp Nueva Escuela',
				slug: 'mi-escuela-' + Math.random().toString(36).substring(2, 6),
				logo_url: 'https://ujchqjqvkworevjmpefo.supabase.co/storage/v1/object/public/organization-logo//qrNK.svg',
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

	if (loading) return <div>Loading organizations...</div>;

	const handleCreateMember = async () => {
		if (!supabase || !user?.id) return;

		try {
			const newMember: MemberInput = {
				user_id: user.id,
				role: 'member',
				organization_id: 5,
			};

			const memberApi = MembersAPI(supabase);
			const createdMember = await memberApi.create(newMember);
			setMembers([...members, createdMember]);

		} catch (error) {
			alert('Error creating Member: ' + (error as Error).message);
		}
	};

	return (
		<>
			{loading && <BarLoader className='absolute mb-4' width={'100%'} color='#db073d' />}
			{!loading &&
				<div className="p-4">
					<h1 className="text-2xl font-bold mb-4">Your Organizations</h1>
					
					<button 
						onClick={handleCreateOrg}
						className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
					>
						Create New Organization
					</button>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{orgs.map((org) => (
							<div key={org.id} className="border p-4 rounded-lg">
								<h2 className="text-xl font-semibold">{org.name}</h2>
								<p className="text-gray-600">qraft.dev/orgs/{org.slug}</p>
								<div 
									className="h-4 mt-2 rounded" 
									style={{ backgroundColor: org.theme.background }}
								/>
							</div>
						))}
					</div>
				</div>
			}
			{!loading &&
				<div className="p-4">
					<h1 className="text-2xl font-bold mb-4">Members</h1>
					<button 
						onClick={handleCreateMember}
						className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
					>
						Create New Member
					</button>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{members.map((member) => (
							<div key={member.id} className="border p-4 rounded-lg">
								<h2 className="text-xl font-semibold">{member.role}</h2>
								<p className="text-gray-600">{member.organization_id}</p>
								<p className="text-gray-600">{member.user_id}</p>
								<p className="text-gray-600">{member.id}</p>
							</div>
						))}
					</div>
				</div>
			}
		</>
	);
};

export default OrgDashboard;