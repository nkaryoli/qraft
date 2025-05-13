import type { SupabaseClient } from '@supabase/supabase-js';
import type { QRCode, QRCodeInput } from 'supabase/types';

export const QRCodeAPI = (client: SupabaseClient) => ({

	async getQRCode(userId: string): Promise<QRCode[]> {
		const { data, error } = await client
			.from('qrcode')
			.select('*')
			.eq('user_id', userId);

		if (error) throw new Error(`Supabase error: ${error.message}`);

		return data || [];
	},

	async create(input: QRCodeInput): Promise<QRCode> {
		const { data, error } = await client.from('qrcode').insert(input).select().single();

		if (error) throw new Error(`Error creating qrcode: ${error.message}`);

		return data;
	},

	async update(id: number, updates: Partial<QRCodeInput>): Promise<QRCode> {
		const { data, error } = await client
			.from('qrcode')
			.update(updates)
			.eq('id', id)
			.select()
			.single();

		if (error) throw new Error(`Error updating qrcode: ${error.message}`);

		return data;
	},

	async delete(id: number): Promise<void> {
		const { error } = await client.from('qrcode').delete().eq('id', id);
		console.log('aqui')
		if (error) throw new Error(`Error deleting qrcode: ${error.message}`);
	},
});
