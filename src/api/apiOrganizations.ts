import type { SupabaseClient } from '@supabase/supabase-js';
import type { Organization, OrganizationInput } from 'supabase/types';

export const OrganizationsAPI = (client: SupabaseClient) => ({
	
  // Obtener organización por slug (para páginas públicas)
	async getBySlug(slug: string): Promise<Organization | null> {
		const { data, error } = await client
		.from('organizations')
		.select('*')
		.eq('slug', slug)
		.single();

		if (error?.code === 'PGRST116') return null; // No encontrado
		if (error) throw new Error(`Supabase error: ${error.message}`);
		
		return data;
	},

	// Obtener organizaciones de un usuario (para dashboard)
	async getUserOrganizations(userId: string): Promise<Organization[]> {
		const { data, error } = await client
		.from('organizations')
		.select('*')
		.eq('owner_id', userId);

		if (error) throw new Error(`Supabase error: ${error.message}`);
		return data || [];
	},

	// Crear nueva organización (con validación de slug único)
	async create(input: OrganizationInput): Promise<Organization> {
		const { data, error } = await client
		.from('organizations')
		.insert(input)
		.select()
		.single();

		if (error) throw new Error(`Error creating org: ${error.message}`);
		return data;
	},

	// Actualizar organización (solo owner/admin)
	async update(
		id: string, 
		updates: Partial<OrganizationInput>
	): Promise<Organization> {
		const { data, error } = await client
		.from('organizations')
		.update(updates)
		.eq('id', id)
		.select()
		.single();

		if (error) throw new Error(`Error updating org: ${error.message}`);
		return data;
	},

	// Eliminar organización (cuidado con esta operación)
	async delete(id: string): Promise<void> {
		const { error } = await client
		.from('organizations')
		.delete()
		.eq('id', id);

		if (error) throw new Error(`Error deleting org: ${error.message}`);
	},
});